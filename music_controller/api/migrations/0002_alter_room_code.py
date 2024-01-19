# Generated by Django 5.0.1 on 2024-01-19 11:08

import api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='room',
            name='code',
            field=models.CharField(default=api.models.generate_unqiue_code, max_length=8, unique=True),
        ),
    ]
