# Generated by Django 2.2.14 on 2021-04-26 05:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0004_product_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, default='', null=True, upload_to=''),
        ),
    ]
