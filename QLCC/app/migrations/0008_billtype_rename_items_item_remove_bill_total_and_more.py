# Generated by Django 4.2.11 on 2024-06-12 05:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0007_location_alter_apartment_location'),
    ]

    operations = [
        migrations.CreateModel(
            name='BillType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10, null=True)),
            ],
        ),
        migrations.RenameModel(
            old_name='Items',
            new_name='Item',
        ),
        migrations.RemoveField(
            model_name='bill',
            name='total',
        ),
        migrations.AddField(
            model_name='bill',
            name='billType',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='app.billtype'),
        ),
    ]
