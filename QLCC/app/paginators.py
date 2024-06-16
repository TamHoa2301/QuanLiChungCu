from rest_framework import pagination


class ApartmentPaginator(pagination.PageNumberPagination):
    page_size = 10
