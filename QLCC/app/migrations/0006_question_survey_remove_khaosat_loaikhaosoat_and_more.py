# Generated by Django 4.2.11 on 2024-06-05 19:47

import ckeditor.fields
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0005_rename_roles_role_user_dateofbirth'),
    ]

    operations = [
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Survey',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('active', models.BooleanField(default=True)),
                ('name', models.CharField(max_length=255)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.RemoveField(
            model_name='khaosat',
            name='loaikhaosoat',
        ),
        migrations.RemoveField(
            model_name='khaosat',
            name='user',
        ),
        migrations.AlterField(
            model_name='bill',
            name='description',
            field=ckeditor.fields.RichTextField(null=True),
        ),
        migrations.AlterField(
            model_name='report',
            name='content',
            field=ckeditor.fields.RichTextField(blank=True, null=True),
        ),
        migrations.RenameModel(
            old_name='LoaiKhaoSoat',
            new_name='SurveyType',
        ),
        migrations.DeleteModel(
            name='CauHoi',
        ),
        migrations.DeleteModel(
            name='KhaoSat',
        ),
        migrations.AddField(
            model_name='survey',
            name='type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.surveytype'),
        ),
        migrations.AddField(
            model_name='survey',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='question',
            name='khaosat',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='app.survey'),
        ),
    ]
