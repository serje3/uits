# Generated by Django 4.2.5 on 2024-05-08 20:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('editable_pages', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='editablepage',
            name='page',
            field=models.CharField(max_length=100),
        ),
    ]
