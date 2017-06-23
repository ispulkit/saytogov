from django.db import models

class Genre(models.Model):
    name = models.CharField(max_length = 50)

    def __str__(self):
        return self.name

class Track(models.Model):
    title = models.CharField(max_length = 150, blank = False)
    rating = models.FloatField()
    genre = models.ManyToManyField(Genre, blank=True)

    def __str__(self):
        return self.title
