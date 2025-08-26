from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import TeamMember
from .serializers import TeamMemberSerializer, TeamMemberPublicSerializer

# Create your views here.

class TeamMemberViewSet(viewsets.ModelViewSet):
    queryset = TeamMember.objects.filter(is_active=True)
    serializer_class = TeamMemberSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.action == 'list' or self.action == 'retrieve':
            return TeamMemberPublicSerializer
        return TeamMemberSerializer

    @action(detail=False, methods=['get'], permission_classes=[permissions.AllowAny])
    def public(self, request):
        """Endpoint público para mostrar el equipo"""
        members = TeamMember.objects.filter(is_active=True).order_by('order', 'name')
        serializer = TeamMemberPublicSerializer(members, many=True, context={'request': request})
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def owners(self, request):
        """Obtener solo los dueños"""
        owners = TeamMember.objects.filter(is_active=True, role='owner').order_by('order', 'name')
        serializer = TeamMemberPublicSerializer(owners, many=True, context={'request': request})
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def interns(self, request):
        """Obtener solo los becarios"""
        interns = TeamMember.objects.filter(is_active=True, role='intern').order_by('order', 'name')
        serializer = TeamMemberPublicSerializer(interns, many=True, context={'request': request})
        return Response(serializer.data)
