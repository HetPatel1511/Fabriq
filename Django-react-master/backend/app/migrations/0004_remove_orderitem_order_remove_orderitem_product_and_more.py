# Generated by Django 4.0 on 2023-09-30 00:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_delete_review'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='orderitem',
            name='order',
        ),
        migrations.RemoveField(
            model_name='orderitem',
            name='product',
        ),
        migrations.RemoveField(
            model_name='shippingaddress',
            name='order',
        ),
        migrations.DeleteModel(
            name='Order',
        ),
        migrations.DeleteModel(
            name='OrderItem',
        ),
        migrations.DeleteModel(
            name='ShippingAddress',
        ),
    ]