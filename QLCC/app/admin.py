from django.contrib import admin
from django.utils.html import mark_safe
from app.models import PaymentType, Location, Role, Apartment, ApartmentCard, User, Storage, Item, BillType, Bill, Report


# Register your models here.

class ApartmentAdmin(admin.ModelAdmin):
    list_display = ['id', 'apartmentName', 'location', 'isFull']
    search_fields = ['apartmentName', 'location']
    list_filter = ['location']


class BillAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'billType', 'total', 'payment_type', 'payment_date']
    search_fields = ['id', 'user', 'billType', 'payment_type', 'payment_date']
    list_filter = ['billType', 'payment_type']


# class UserAdmin(admin.ModelAdmin):
#     list_display = ['id', 'first_name', 'last_name', 'username', 'avatar']
#     search_fields = ['id', 'first_name', 'last_name']
#
#     def my_image(self, user):
#         if user.image:
#             return mark_safe(f"<img width='200' src='{user.avatar.url}' />")


admin.site.register(Location)
admin.site.register(Role)
admin.site.register(Apartment, ApartmentAdmin)
admin.site.register(ApartmentCard)
admin.site.register(User)
admin.site.register(Storage)
admin.site.register(Item)
admin.site.register(PaymentType)
admin.site.register(BillType)
admin.site.register(Bill, BillAdmin)
admin.site.register(Report)
