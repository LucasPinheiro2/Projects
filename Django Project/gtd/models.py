from django.db import models
from django.utils.timezone import get_current_timezone

class Project(models.Model):
    name = models.CharField(max_length=100)

    class Meta:
        verbose_name = 'project'
        verbose_name_plural = 'projects'

    def __str__(self):
        return self.name

    def meta(self):
        return self._meta


class Task(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    completed = models.BooleanField()

    class Meta:
        verbose_name = 'task'
        verbose_name_plural = 'tasks'

    def __str__(self):
        return self.name

    def meta(self):
        return self._meta


class TimeEntry(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    start = models.DateTimeField()
    end = models.DateTimeField()

    class Meta:
        verbose_name = 'time entry'
        verbose_name_plural = 'time entries'

    def __str__(self):
        format = '%Y-%m-%d %H:%M:%S'
        tz = get_current_timezone()
        duration_str = str(self.duration()).split('.')[0]
        start_str = self.start.astimezone(tz).strftime(format)
        end_str = self.end.astimezone(tz).strftime(format)
        return f'{duration_str} from {start_str} to {end_str}'

    def meta(self):
        return self._meta

    def duration(self):
        return self.end - self.start

