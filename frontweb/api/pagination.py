from rest_framework.pagination import (
    PageNumberPagination
)

class CusPageNumberPagination(PageNumberPagination):
    page_size = 20
