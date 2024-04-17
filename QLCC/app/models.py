
# Create your models here.
from django.db import models
from django.contrib.auth.models import AbstractUser
from ckeditor.fields import RichTextField
from cloudinary.models import CloudinaryField


class User(AbstractUser):
    avatar = CloudinaryField(null=True)
    phoneNumber =models.CharField(max_length=10)


class BaseModel(models.Model):
    created_date = models.DateTimeField(auto_now_add=True)
    active = models.BooleanField(default=True)

    class Meta:
        abstract = True


class Bill(BaseModel):
    payment_date = models.DateTimeField(auto_now_add=True)
    payment_type = models.CharField(max_length=50)
    description = models.CharField(max_length=100)
    total = models.DecimalField(decimal_places=2, max_digits=10)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class Storage(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class Items(BaseModel):
    name = models.CharField(max_length=50)
    received_date = models.DateTimeField(auto_now_add=True)
    storage = models.ForeignKey(Storage, on_delete=models.CASCADE)


class Report(BaseModel):
    content = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


