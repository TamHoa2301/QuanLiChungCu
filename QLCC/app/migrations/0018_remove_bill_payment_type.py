# Generated by Django 4.2.11 on 2024-06-16 07:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0017_remove_survey_type_survey_link_alter_survey_name_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='bill',
            name='payment_type',
        ),
    ]