from django.conf.urls import url
from .views import(
    GenreListApiView,
    GenreDetailApiView,
    TrackListApiView,
    TrackDetailApiView,
)
urlpatterns = [
    url(r'^genres/(?P<id>\d+)/$', GenreDetailApiView.as_view(), name='genre-detail'),
    url(r'^genres/$', GenreListApiView.as_view(), name='genre-list'),
    url(r'^tracks/$', TrackListApiView.as_view(), name='track-list'),
    url(r'^tracks/(?P<id>\d+)/$', TrackDetailApiView.as_view(), name='track-detail'),

]
