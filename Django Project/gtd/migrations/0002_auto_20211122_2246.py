# Generated by Django 2.2.20 on 2021-11-22 22:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gtd', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='description',
            field=models.TextField(blank=True),
        ),
    ]
