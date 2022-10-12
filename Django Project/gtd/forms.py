import datetime
from django.forms import Form, ModelForm, DateField, ChoiceField
from django.forms.models import ModelChoiceField
from bootstrap_datepicker_plus import DateTimePickerInput, MonthPickerInput, DatePickerInput
from .models import Task, Project, TimeEntry
from django.core.exceptions import ValidationError


def get_current_week():
    today = datetime.date.today()
    sun = today - datetime.timedelta((today.weekday() + 1) % 7)
    return sun


class ProjectForm(ModelForm):
    class Meta:
        model = Project
        fields = ["name"]


class TaskForm(ModelForm):
    class Meta:
        model = Task
        fields = ["project", "name", "description", "completed"]


class TimeEntryForm(ModelForm):
    class Meta:
        model = TimeEntry
        fields = ["task", "start", "end"]
        widgets = {
            "start": DateTimePickerInput(
                options={
                    "format": "MM/DD/YYYY HH:mm:ss",
                }
            ),
            "end": DateTimePickerInput(
                options={
                    "format": "MM/DD/YYYY HH:mm:ss",
                }
            ),
        }


def validate_week(week):
    print('validate_week', week, type(week), week.weekday)
    if not week:
        print('will raise')
        raise ValidationError('Choose a week')
    if week.weekday() != 6:
        print('will raise')
        raise ValidationError('Invalid week, choose a sunday')
    return week


class TimeTaskManagerForm(Form):
    month = DateField(widget=MonthPickerInput(options={
            "format": "MM/YYYY",
        }),
        required=True,
        initial=datetime.date.today,
        input_formats=['%m/%Y'],
    )
    week = DateField(widget=DatePickerInput(options={
            "format": "\W\e\e\k \of MM/DD/YYYY",
            "daysOfWeekDisabled": list(range(1,7)),
            "keepInvalid": True,
        }),
        required=True,
        initial=get_current_week,
        input_formats=['Week of %m/%d/%Y'],
        validators=[validate_week],
    )