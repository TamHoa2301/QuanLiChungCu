from ckeditor_uploader.widgets import CKEditorUploadingWidget
from django.contrib import admin
from django.db.models import Count
from django.template.response import TemplateResponse
from django.utils.html import mark_safe
from app.models import PaymentType, ApartmentCardRequest, Location, Role, Apartment, ApartmentCard, User, Storage, Item, BillType, Bill, Report
from django.urls import path
from django import forms


# Register your models here.

class MyAdminSite(admin.AdminSite):
    site_header = 'MyApartment'

    def get_urls(self):
        return [path('apartment-stats/', self.apartment_stats)] + super().get_urls()

    def apartment_stats(self, request):
        apartment_count = Apartment.objects.annotate(counter=Count('id')).values('id', 'apartmentName', 'counter')
        return TemplateResponse(request, 'admin/apartment-stats.html', {
            'apartment_count': apartment_count
        })


admin_site = MyAdminSite(name='MyApartmentApp')


class ApartmentAdmin(admin.ModelAdmin):
    list_display = ['id', 'apartmentName', 'location', 'isFull']
    search_fields = ['apartmentName', 'location']
    list_filter = ['location']


class ReportForm(forms.ModelForm):
    description = forms.CharField(widget=CKEditorUploadingWidget)

    class Meta:
        model = Report
        fields = '__all__'


class BillAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'billType', 'total', 'payment_date', 'is_paid']
    search_fields = ['id', 'user', 'billType', 'payment_date']
    list_filter = ['billType', 'is_paid']


class ReportAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'content', 'user']
    search_fields = ['title', 'user']
    form = ReportForm


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
admin.site.register(ApartmentCardRequest)
admin.site.register(User)
admin.site.register(Storage)
admin.site.register(Item)
admin.site.register(PaymentType)
admin.site.register(BillType)
admin.site.register(Bill, BillAdmin)
admin.site.register(Report)

# admin_site.register(Location)
# admin_site.register(Role)
# admin_site.register(Apartment, ApartmentAdmin)
# admin_site.register(ApartmentCard)
# admin_site.register(User)
# admin_site.register(Storage)
# admin_site.register(Item)
# admin_site.register(PaymentType)
# admin_site.register(BillType)
# admin_site.register(Bill, BillAdmin)
# admin_site.register(Report)
