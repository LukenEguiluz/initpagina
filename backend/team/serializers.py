from rest_framework import serializers
from .models import TeamMember
from django.conf import settings

class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')

class TeamMemberPublicSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = TeamMember
        fields = ['id', 'name', 'position', 'role', 'bio', 'expertise', 'image', 'image_url', 'linkedin', 'email', 'order']
        read_only_fields = ('created_at', 'updated_at')
    
    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None
