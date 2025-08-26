#!/usr/bin/env python3
import os
import django

# Configurar Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'init_backend.settings')
django.setup()

from team.models import TeamMember

def check_team_images():
    print("=== Verificando imágenes del equipo ===")
    
    members = TeamMember.objects.all()
    
    if not members.exists():
        print("No hay miembros del equipo en la base de datos")
        return
    
    for member in members:
        print(f"\nMiembro: {member.name}")
        print(f"Posición: {member.position}")
        print(f"Imagen asignada: {member.image}")
        if member.image:
            print(f"URL de imagen: {member.image.url}")
            print(f"Ruta del archivo: {member.image.path}")
            print(f"¿Archivo existe?: {os.path.exists(member.image.path)}")
        else:
            print("❌ No tiene imagen asignada")
    
    print(f"\nTotal de miembros: {members.count()}")

if __name__ == '__main__':
    check_team_images()
