from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateAPIView
from frontweb.models import Genre, Track
from .serializers import GenreModelSerializer, GenreCreateModelSerializer, TrackModelSerializer

class GenreListApiView(ListCreateAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreModelSerializer

class GenreDetailApiView(RetrieveUpdateAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreCreateModelSerializer
    lookup_field = 'id'
    lookup_url_kwarg = 'id'

class TrackListApiView(ListCreateAPIView):
    queryset = Track.objects.all()
    serializer_class = TrackModelSerializer

class TrackDetailApiView(RetrieveUpdateAPIView):
    queryset = Track.objects.all()
    serializer_class = TrackModelSerializer
    lookup_field = 'id'
    lookup_url_kwarg = 'id'
