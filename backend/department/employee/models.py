from django.db import models


# Create your models here.
class Teacher(models.Model):
    # Основная информация
    last_name = models.CharField(max_length=50)
    first_name = models.CharField(max_length=50)
    patronymic = models.CharField(max_length=50, blank=True, null=True)

    # Степень, звание, должность
    degree = models.CharField(max_length=100, blank=True, null=True)
    rank = models.CharField(max_length=100, blank=True, null=True)
    position = models.CharField(max_length=100)

    # Общая информация
    bio = models.TextField(blank=True, null=True)


    def get_last_job(self):
        return self.hashtagscanjob_set.order_by('-created_at').first()