import datetime
import dateutil.relativedelta
from collections import defaultdict
from django.urls import reverse_lazy
from django.views.generic.edit import FormView, DeleteView, UpdateView
from django.views.generic.list import ListView
from django.views.generic import CreateView

from .models import Task, Project, TimeEntry
from .forms import (
    ProjectForm,
    TaskForm,
    TimeEntryForm,
    TimeTaskManagerForm,
    get_current_week,
)


class IndexView(ListView):
    template_name = "gtd/index.html"
    context_object_name = "project_and_tasks_list"

    def get_queryset(self):
        queryset = dict()
        for project in Project.objects.all().iterator():
            queryset[project.id] = (project, [], [])
        for task in Task.objects.all().iterator():
            queryset[task.project.id][1].append(task)
            queryset[task.project.id][2].append(
                list(TimeEntry.objects.filter(task__id=task.id))
            )
        return [
            (project, list(zip(tasks, time_entries)))
            for (project, tasks, time_entries) in queryset.values()
        ]


class TaskManagerView(FormView):
    template_name = "gtd/task_management.html"
    context_object_name = "task_management_list"
    form_class = TimeTaskManagerForm

    def get(self, request, *args, **kwargs):
        month = None
        week = None

        form_class = self.get_form_class()
        form = form_class(self.request.GET)
        if form.is_valid():
            data = form.cleaned_data
            month = data["month"]
            week = data["week"]
        else:
            form = self.get_form()
            month = datetime.date.today().replace(day=1)
            week = get_current_week()

        counts = dict()

        month_entries = TimeEntry.objects.filter(
            start__gte=month,
            start__lte=month + dateutil.relativedelta.relativedelta(months=1),
        ).iterator()
        for entry in month_entries:
            if entry.task.id not in counts:
                counts[entry.task.id] = [
                    entry.task,
                    datetime.timedelta(0),
                    datetime.timedelta(0),
                ]
            counts[entry.task.id][1] += entry.duration()

        week_entries = TimeEntry.objects.filter(
            start__gte=week,
            start__lte=week + dateutil.relativedelta.relativedelta(weeks=1),
        ).iterator()
        for entry in week_entries:
            if entry.task.id not in counts:
                counts[entry.task.id] = [
                    entry.task,
                    datetime.timedelta(0),
                    datetime.timedelta(0),
                ]
            counts[entry.task.id][2] += entry.duration()

        total_count = Task.objects.all().count()

        task_month_average = datetime.timedelta(seconds=sum(month_count.total_seconds() for (_task, month_count, _week_count) in counts.values())/total_count)
        task_week_average = datetime.timedelta(seconds=sum(week_count.total_seconds() for (_task, _month_count, week_count) in counts.values())/total_count)

        context = self.get_context_data(
            form=form,
            month=month.strftime("%m/%Y"),
            week=week.strftime("%m/%d/%Y"),
            task_month_average=task_month_average,
            task_week_average=task_week_average,
        )
        return self.render_to_response(context)


class TimeManagerView(FormView):
    template_name = "gtd/time_management.html"
    context_object_name = "time_management_list"
    form_class = TimeTaskManagerForm

    def get(self, request, *args, **kwargs):
        month = None
        week = None

        form_class = self.get_form_class()
        form = form_class(self.request.GET)
        if form.is_valid():
            data = form.cleaned_data
            month = data["month"]
            week = data["week"]
        else:
            form = self.get_form()
            month = datetime.date.today().replace(day=1)
            week = get_current_week()

        counts = dict()

        month_entries = TimeEntry.objects.filter(
            start__gte=month,
            start__lte=month + dateutil.relativedelta.relativedelta(months=1),
        ).iterator()
        for entry in month_entries:
            if entry.task.project.id not in counts:
                counts[entry.task.project.id] = [
                    entry.task.project,
                    dict(),
                    datetime.timedelta(0),
                    datetime.timedelta(0),
                ]
            counts[entry.task.project.id][2] += entry.duration()
            if entry.task.id not in counts[entry.task.project.id][1]:
                counts[entry.task.project.id][1][entry.task.id] = [
                    entry.task,
                    datetime.timedelta(0),
                    datetime.timedelta(0),
                ]
            counts[entry.task.project.id][1][entry.task.id][1] += entry.duration()

        week_entries = TimeEntry.objects.filter(
            start__gte=week,
            start__lte=week + dateutil.relativedelta.relativedelta(weeks=1),
        ).iterator()
        for entry in week_entries:
            if entry.task.project.id not in counts:
                counts[entry.task.project.id] = [
                    entry.task.project,
                    dict(),
                    datetime.timedelta(0),
                    datetime.timedelta(0),
                ]
            counts[entry.task.project.id][3] += entry.duration()
            if entry.task.id not in counts[entry.task.project.id][1]:
                counts[entry.task.project.id][1][entry.task.id] = [
                    entry.task,
                    datetime.timedelta(0),
                    datetime.timedelta(0),
                ]
            counts[entry.task.project.id][1][entry.task.id][2] += entry.duration()

        time_management_list = [
            (project, list(task_counts.values()), month_count, week_count)
            for (project, task_counts, month_count, week_count) in counts.values()
        ]

        context = self.get_context_data(
            form=form,
            month=month.strftime("%m/%Y"),
            week=week.strftime("%m/%d/%Y"),
            time_management_list=time_management_list,
            zero_timedelta=datetime.timedelta(0),
        )
        return self.render_to_response(context)


class ProjectCreateView(CreateView):
    template_name = "gtd/create.html"
    model = Project
    form_class = ProjectForm
    success_url = reverse_lazy("index")


class ProjectDeleteView(DeleteView):
    template_name = "gtd/delete.html"
    model = Project
    success_url = reverse_lazy("index")
    pk_url_kwarg = "project_id"


class ProjectUpdateView(UpdateView):
    template_name = "gtd/update.html"
    model = Project
    form_class = ProjectForm
    success_url = reverse_lazy("index")
    pk_url_kwarg = "project_id"


class TaskCreateView(CreateView):
    template_name = "gtd/create.html"
    model = Task
    form_class = TaskForm
    success_url = reverse_lazy("index")

    def get_initial(self):
        project = Project.objects.get(pk=self.kwargs["project_id"])
        return {"project": project}


class TaskDeleteView(DeleteView):
    template_name = "gtd/delete.html"
    model = Task
    success_url = reverse_lazy("index")
    pk_url_kwarg = "task_id"


class TaskUpdateView(UpdateView):
    template_name = "gtd/update.html"
    model = Task
    success_url = reverse_lazy("index")
    form_class = TaskForm
    pk_url_kwarg = "task_id"


class TimeEntryCreateView(CreateView):
    template_name = "gtd/time.html"
    model = TimeEntry
    form_class = TimeEntryForm
    success_url = reverse_lazy("index")

    def get_initial(self):
        task = Task.objects.get(pk=self.kwargs["task_id"])
        now = datetime.datetime.now()
        return {
            "task": task,
            "start": now,
            "end": now,
        }


class TimeEntryDeleteView(DeleteView):
    template_name = "gtd/delete.html"
    model = TimeEntry
    success_url = reverse_lazy("index")
    pk_url_kwarg = "time_entry_id"


class TimeEntryUpdateView(UpdateView):
    template_name = "gtd/update.html"
    model = TimeEntry
    success_url = reverse_lazy("index")
    form_class = TimeEntryForm
    pk_url_kwarg = "time_entry_id"
