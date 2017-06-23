from django.shortcuts import render
from django.db.models import Q
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateAPIView
from frontweb.models import Genre, Track
from .serializers import GenreModelSerializer, GenreCreateModelSerializer, TrackModelSerializer
from .pagination import CusPageNumberPagination
from rest_framework.filters import (
    SearchFilter,
)
class GenreListApiView(ListCreateAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreModelSerializer
    pagination_class = CusPageNumberPagination

class GenreDetailApiView(RetrieveUpdateAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreCreateModelSerializer
    lookup_field = 'id'
    lookup_url_kwarg = 'id'

class TrackListApiView(ListCreateAPIView):
    serializer_class = TrackModelSerializer
    pagination_class = CusPageNumberPagination
    filter_backends = [SearchFilter]
    search_fields = ['tracks']
    def get_queryset(self, *args, **kwargs):
        queryset_list = Track.objects.all()
        query = self.request.GET.get("tracks")
        if query:
            queryset_list = queryset_list.filter(
                Q(title__icontains=query)
                ).distinct()
        return queryset_list


class TrackDetailApiView(RetrieveUpdateAPIView):
    queryset = Track.objects.all()
    serializer_class = TrackModelSerializer
    lookup_field = 'id'
    lookup_url_kwarg = 'id'
