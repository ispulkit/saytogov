# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-06-23 21:45
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('frontweb', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='track',
            name='genre',
        ),
        migrations.AddField(
            model_name='track',
            name='genre',
            field=models.ManyToManyField(blank=True, to='frontweb.Genre'),
        ),
    ]
