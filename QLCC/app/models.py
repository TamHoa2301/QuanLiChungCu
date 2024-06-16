# Create your models here.
import cloudinary
from django.db import models
from django.contrib.auth.models import AbstractUser
from ckeditor.fields import RichTextField
from cloudinary.models import CloudinaryField


class Role(models.Model):
    name = models.CharField(max_length=50, null=True)

    def __str__(self):
        return self.name


class Location(models.Model):
    name = models.CharField(max_length=50, null=True)

    def __str__(self):
        return self.name


class Apartment(models.Model):
    location = models.ForeignKey(Location, on_delete=models.SET_NULL, null=True)
    apartmentName = models.CharField(max_length=50, null=False)
    isFull = models.BooleanField(default=False)

    def __str__(self):
        return self.apartmentName


class User(AbstractUser):
    avatar = CloudinaryField(null=True)
    dateofBirth = models.DateTimeField(null=True, blank=True)
    phoneNumber = models.CharField(max_length=10, null=True)
    role = models.ForeignKey(Role, on_delete=models.SET_NULL, null=True, blank=True)
    apartment = models.ForeignKey(Apartment, on_delete=models.SET_NULL, null=True, blank=True)


class BaseModel(models.Model):
    created_date = models.DateTimeField(auto_now_add=True)
    active = models.BooleanField(default=True)

    class Meta:
        abstract = True


class BillType(models.Model):
    name = models.CharField(max_length=100, null=False)

    def __str__(self):
        return self.name


class PaymentType(models.Model):
    name = models.CharField(max_length=100, null=False)

    def __str__(self):
        return self.name


class Bill(BaseModel):
    payment_date = models.DateTimeField(auto_now=True)
    # payment_type = models.ForeignKey(PaymentType, on_delete=models.PROTECT, null=True, blank=True)
    description = RichTextField(null=True, blank=True)
    total = models.DecimalField(decimal_places=2, max_digits=10, null=True)
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    billType = models.ForeignKey(BillType, on_delete=models.PROTECT, null=True)
    is_paid = models.BooleanField(default=False)

# Cần chuyển về PROTECT sau (do bill vẫn sẽ tồn tại dù user hay billType có bij xoas)


class ApartmentCard(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class ApartmentCardRequest(BaseModel):
    title = models.CharField(max_length=100, null=True)
    content = RichTextField(null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class Storage(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    isEmpty = models.BooleanField(default=True)

    # def __str__(self):
    #     return 'Storage of ' + self.user.value_to_string()


class Item(BaseModel):
    name = models.CharField(max_length=50, null=False)
    image = CloudinaryField(null=True)
    storage = models.ForeignKey(Storage, on_delete=models.CASCADE)
    isReceive = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class Report(BaseModel):
    title = models.CharField(max_length=100, null=True)
    content = RichTextField(null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class Survey(BaseModel):
    name = models.CharField(max_length=255, null=True)
    link = models.CharField(max_length=255, null=True)

    def __str__(self):
        return self.name

