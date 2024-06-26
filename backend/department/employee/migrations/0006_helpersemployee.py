# Generated by Django 4.2.5 on 2024-05-06 22:59

from django.db import migrations, models
import imagekit.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('employee', '0005_teacher_avatar'),
    ]

    operations = [
        migrations.CreateModel(
            name='HelpersEmployee',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('avatar', imagekit.models.fields.ProcessedImageField(blank=True, default=None, null=True, upload_to='avatars/%Y/%m/%d')),
                ('last_name', models.CharField(max_length=50)),
                ('first_name', models.CharField(max_length=50)),
                ('patronymic', models.CharField(blank=True, max_length=50, null=True)),
                ('position', models.CharField(max_length=100)),
            ],
        ),
    ]
