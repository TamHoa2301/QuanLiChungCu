# Generated by Django 4.2.11 on 2024-06-12 06:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0009_item_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='billtype',
            name='price',
        ),
        migrations.AddField(
            model_name='bill',
            name='total',
            field=models.DecimalField(decimal_places=2, max_digits=10, null=True),
        ),
    ]