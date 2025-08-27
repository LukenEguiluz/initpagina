#!/usr/bin/env python
"""
Script para crear datos de prueba del equipo
"""
import os
import sys
import django

# Configurar Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'init_backend.settings')
django.setup()

from team.models import TeamMember

def create_test_team():
    """Crear miembros del equipo de prueba"""
    
    # Limpiar datos existentes
    TeamMember.objects.all().delete()
    
    # Crear miembros del equipo
    team_members = [
        {
            'name': 'Luken Eguiluz del Angel',
            'role': 'owner',
            'position': 'CEO & Co-Founder',
            'description': 'Experto en desarrollo de software y estrategia digital',
            'email': 'luken@init.com.mx',
            'linkedin': 'https://linkedin.com/in/luken-eguiluz',
            'order': 1,
            'is_active': True
        },
        {
            'name': 'Carolina Martínez Valades',
            'role': 'owner',
            'position': 'CTO & Co-Founder',
            'description': 'Especialista en arquitectura de software y tecnologías emergentes',
            'email': 'carolina@init.com.mx',
            'linkedin': 'https://linkedin.com/in/carolina-martinez',
            'order': 2,
            'is_active': True
        },
        {
            'name': 'Xoan Pablo',
            'role': 'owner',
            'position': 'COO & Co-Founder',
            'description': 'Experto en operaciones y gestión de proyectos digitales',
            'email': 'xoan@init.com.mx',
            'linkedin': 'https://linkedin.com/in/xoan-pablo',
            'order': 3,
            'is_active': True
        },
        {
            'name': 'Carlos Rodríguez',
            'role': 'owner',
            'position': 'CFO & Co-Founder',
            'description': 'Especialista en finanzas y estrategia empresarial',
            'email': 'carlos@init.com.mx',
            'linkedin': 'https://linkedin.com/in/carlos-rodriguez',
            'order': 4,
            'is_active': True
        },
        {
            'name': 'Ana García',
            'role': 'intern',
            'position': 'Desarrolladora Frontend',
            'description': 'Becaria especializada en React y tecnologías web modernas',
            'email': 'ana@init.com.mx',
            'linkedin': 'https://linkedin.com/in/ana-garcia',
            'order': 5,
            'is_active': True
        }
    ]
    
    for member_data in team_members:
        member = TeamMember.objects.create(**member_data)
        print(f"✅ Creado: {member.name} - {member.position}")
    
    print(f"\n🎉 Se crearon {len(team_members)} miembros del equipo")
    print("📋 Miembros creados:")
    for member in TeamMember.objects.all().order_by('order'):
        print(f"  - {member.name} ({member.role})")

if __name__ == '__main__':
    create_test_team()
