# Generated by Django 5.0.4 on 2024-04-22 13:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp1', '0002_comments'),
    ]

    operations = [
        migrations.AddField(
            model_name='comments',
            name='user_name',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='comments',
            name='comments',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='comments',
            name='task_id',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='comments',
            name='user_id',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]