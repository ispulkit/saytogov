# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-06-23 21:23
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Genre',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Track',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=150)),
                ('rating', models.FloatField()),
                ('genre', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='frontweb.Genre')),
            ],
        ),
    ]