# Generated by Django 4.2.5 on 2024-04-06 15:11

from django.db import migrations
import imagekit.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_alter_user_avatar'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='avatar',
            field=imagekit.models.fields.ProcessedImageField(blank=True, default=None, null=True, upload_to='photos/avatars/%Y/%m/%d', verbose_name='Аватар пользователя'),
        ),
    ]
