from django.urls import path

from . import views

urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    path('task-manager/', views.TaskManagerView.as_view(), name='task-manager'),
    path('time-manager/', views.TimeManagerView.as_view(), name='time-manager'),
    path('project/create/', views.ProjectCreateView.as_view(), name='create-project'),
    path('project/<int:project_id>/delete/', views.ProjectDeleteView.as_view(), name='delete-project'),
    path('project/<int:project_id>/update/', views.ProjectUpdateView.as_view(), name='update-project'),
    path('project/<int:project_id>/task/create/', views.TaskCreateView.as_view(), name='create-task'),
    path('project/<int:project_id>/task/<int:task_id>/delete/', views.TaskDeleteView.as_view(), name='delete-task'),
    path('project/<int:project_id>/task/<int:task_id>/update/', views.TaskUpdateView.as_view(), name='update-task'),
    path('project/<int:project_id>/task/<int:task_id>/time-entry/create', views.TimeEntryCreateView.as_view(), name='create-time-entry'),
    path('project/<int:project_id>/task/<int:task_id>/time-entry/<int:time_entry_id>/delete', views.TimeEntryDeleteView.as_view(), name='delete-time-entry'),
    path('project/<int:project_id>/task/<int:task_id>/time-entry/<int:time_entry_id>/update', views.TimeEntryUpdateView.as_view(), name='update-time-entry'),
]
