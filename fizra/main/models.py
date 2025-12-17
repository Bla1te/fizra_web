from django.db import models


# Create your models here.


class schedule_template(models.Model):
    telegram_id = models.PositiveIntegerField()
    weekday = models.PositiveIntegerField()
    time = models.CharField(max_length=10)

    class Meta:
        db_table = 'schedule_template'

    def __str__(self):
       return str(self.telegram_id)    
    
          


class attendance(models.Model):
    STATUS_CHOICES = [
        ('present', 'Присутствовал'),
        ('absent', 'Отсутствовал'),
        ('excused', 'Отсутствует по уважительной причине'),
    ]
    telegram_id = models.PositiveIntegerField()
    date = models.CharField(max_length=10)
    time = models.CharField(max_length=10)
    status = models.CharField(choices=STATUS_CHOICES)
    class Meta:
        db_table = 'attendance'
    def __str__(self):
       return str(self.telegram_id)    
    

class balls(models.Model):
    STATUS_CHOICES = [
        ('present', 'Присутствовал'),
        ('absent', 'Отсутствовал'),
        ('excused', 'Отсутствует по уважительной причине'),
    ]
    
    telegram_id = models.PositiveIntegerField()
    dop_balls = models.PositiveIntegerField()
    
    class Meta:
        db_table = 'balls'
    def __str__(self):
       return str(self.telegram_id)    

