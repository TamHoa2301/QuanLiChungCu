from rest_framework import permissions


class UserOwner(permissions.IsAuthenticated):
    def has_object_permission(self, request, view, user):
        return super().has_permission(request, view) and request.user == user.user


class ReportOwner(permissions.IsAuthenticated):
    def has_object_permission(self, request, view, report):
        return super().has_permission(request, view) and request.user == report.user
