from django.contrib import admin
from django.urls import path, re_path, include
from rest_framework import routers
from app import views

r = routers.DefaultRouter()
r.register('apartments', views.ApartmentViewset, basename='apartments')
r.register('locations', views.LocationViewset, basename='locations')
r.register('storages', views.StorageViewset, basename='storages')
r.register('items', views.ItemViewset, basename='items')
r.register('bills', views.BillViewset, basename='bills')
r.register('users', views.UserViewset, basename='users')
r.register('reports', views.ReportViewset, basename='reports')
r.register('cards', views.CardViewset, basename='cards')
r.register('cardsrequests', views.CardRequestViewset, basename='cardsrequests')
r.register('surveys', views.SurveyViewset, basename='surveys')


urlpatterns = [
    path('', include(r.urls)),
]