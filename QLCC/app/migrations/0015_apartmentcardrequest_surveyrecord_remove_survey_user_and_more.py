# Generated by Django 4.2.11 on 2024-06-16 03:25

import ckeditor.fields
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0014_report_title'),
    ]

    operations = [
        migrations.CreateModel(
            name='ApartmentCardRequest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('active', models.BooleanField(default=True)),
                ('title', models.CharField(max_length=100, null=True)),
                ('content', ckeditor.fields.RichTextField(blank=True, null=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='SurveyRecord',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_submit', models.BooleanField(default=False)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.RemoveField(
            model_name='survey',
            name='user',
        ),
        migrations.AddField(
            model_name='bill',
            name='is_paid',
            field=models.BooleanField(default=False),
        ),
        migrations.DeleteModel(
            name='Question',
        ),
        migrations.AddField(
            model_name='surveyrecord',
            name='survey',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='app.survey'),
        ),
        migrations.AddField(
            model_name='surveyrecord',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
