from rest_framework.serializers import ModelSerializer, HyperlinkedIdentityField, SerializerMethodField, ValidationError
from frontweb.models import Genre, Track

class GenreModelSerializer(ModelSerializer):
    class Meta:
        model = Genre
        fields = [
            'name',
            'id'
        ]
class GenreCreateModelSerializer(ModelSerializer):
    class Meta:
        model = Genre
        fields = [
            'name'
        ]
class TrackModelSerializer(ModelSerializer):
    genres = SerializerMethodField(read_only=True)
    read_only_fields = ('genres')
    extra_kwargs = {
        'genre': {
            'write_only': True
        }
    }
    class Meta:
        model = Track
        fields = [
            'id',
            'title',
            'rating',
            'genres'
        ]
    def get_genres(self, obj):
        gqs = Genre.objects.filter(track = obj)
        return GenreModelSerializer(gqs, many=True).data
