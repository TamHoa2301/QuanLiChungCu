# Generated by Django 4.2.11 on 2024-06-12 07:10

import ckeditor.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0010_remove_billtype_price_bill_total'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bill',
            name='description',
            field=ckeditor.fields.RichTextField(blank=True, null=True),
        ),
    ]
