# Generated by Django 4.2.11 on 2024-06-12 05:59

import cloudinary.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0008_billtype_rename_items_item_remove_bill_total_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='image',
            field=cloudinary.models.CloudinaryField(max_length=255, null=True),
        ),
    ]
