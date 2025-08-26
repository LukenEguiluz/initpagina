#!/usr/bin/env python3
import os
import django

# Configurar Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'init_backend.settings')
django.setup()

from team.models import TeamMember

def assign_team_images():
    print("=== Asignando imágenes al equipo ===")
    
    # Mapeo de nombres a archivos de imagen
    image_mapping = {
        'enrique': 'team/enrique.jpg',
        'Enrique': 'team/enrique.jpg',
        'Enrique Jiménez Guevara': 'team/enrique.jpg',
        
        'inaki': 'team/inaki.jpg',
        'Iñaki': 'team/inaki.jpg',
        'Iñaki Guerrero Negrete': 'team/inaki.jpg',
        
        'luken': 'team/luken.jpg',
        'Luken': 'team/luken.jpg',
        'Luken Eguiluz del Angel': 'team/luken.jpg',
        
        'carolina': 'team/carolina.jpg',
        'Carolina': 'team/carolina.jpg',
        'Carolina Martínez Valades': 'team/carolina.jpg',
        
        'xoan': 'team/xoan.jpg',
        'Xoan': 'team/xoan.jpg',
        'Xoan Pablo': 'team/xoan.jpg',
    }
    
    members = TeamMember.objects.all()
    
    if not members.exists():
        print("No hay miembros del equipo en la base de datos")
        return
    
    for member in members:
        print(f"\nProcesando: {member.name}")
        
        # Buscar imagen por nombre
        assigned_image = None
        for name_key, image_path in image_mapping.items():
            if name_key.lower() in member.name.lower():
                assigned_image = image_path
                break
        
        if assigned_image:
            # Verificar si el archivo existe
            full_path = os.path.join('media', assigned_image)
            if os.path.exists(full_path):
                member.image = assigned_image
                member.save()
                print(f"✅ Imagen asignada: {assigned_image}")
            else:
                print(f"❌ Archivo no encontrado: {full_path}")
        else:
            print(f"❌ No se encontró imagen para: {member.name}")
    
    print(f"\n=== Verificación final ===")
    for member in members:
        print(f"{member.name}: {member.image or 'Sin imagen'}")

if __name__ == '__main__':
    assign_team_images()
