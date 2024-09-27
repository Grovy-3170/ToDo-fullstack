from django.db import models

# Create your models here.
class ToDo(models.Model):

    title=models.CharField(max_length=100)
    description=models.TextField(blank=True)
    date=models.DateField()
    completed=models.BooleanField(default=False)

    class Meta:
        verbose_name = ("ToDo")
        verbose_name_plural = ("ToDos")

    def __str__(self):
        return self.title
