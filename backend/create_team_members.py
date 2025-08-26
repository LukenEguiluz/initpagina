#!/usr/bin/env python3
import os
import django

# Configurar Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'init_backend.settings')
django.setup()

from team.models import TeamMember

def create_team_members():
    print("=== Creando miembros del equipo ===")
    
    # Datos de los miembros del equipo
    team_data = [
        {
            'name': 'Enrique Jiménez Guevara',
            'position': 'CEO & Fundador',
            'role': 'owner',
            'bio': 'Experto en estrategia empresarial y desarrollo de software con más de 10 años de experiencia en la industria tecnológica.',
            'expertise': 'Liderazgo estratégico, Desarrollo Full-Stack, Arquitectura de Software',
            'email': 'enrique@init.com.mx',
            'linkedin': 'https://linkedin.com/in/enrique-jimenez',
            'image': 'team/enrique.jpg',
            'order': 1,
        },
        {
            'name': 'Iñaki Guerrero Negrete',
            'position': 'CTO & Fundador',
            'role': 'owner',
            'bio': 'Especialista en tecnologías emergentes y transformación digital con amplia experiencia en consultoría tecnológica.',
            'expertise': 'Inteligencia Artificial, Cloud Computing, DevOps',
            'email': 'inaki@init.com.mx',
            'linkedin': 'https://linkedin.com/in/inaki-guerrero',
            'image': 'team/inaki.jpg',
            'order': 2,
        },
        {
            'name': 'Luken Eguiluz del Angel',
            'position': 'COO & Fundador',
            'role': 'owner',
            'bio': 'Project Manager certificado con experiencia en gestión de equipos y entrega de proyectos de alta complejidad.',
            'expertise': 'Gestión de Proyectos, Metodologías Ágiles, Análisis de Negocios',
            'email': 'luken@init.com.mx',
            'linkedin': 'https://linkedin.com/in/luken-eguiluz',
            'image': 'team/luken.jpg',
            'order': 3,
        },
        {
            'name': 'Carolina Martínez Valades',
            'position': 'CEPA',
            'role': 'owner',
            'bio': 'Diseñadora UX/UI con pasión por crear experiencias digitales excepcionales y centradas en el usuario.',
            'expertise': 'Diseño UX/UI, Investigación de Usuarios, Prototipado',
            'email': 'carolina@init.com.mx',
            'linkedin': 'https://linkedin.com/in/carolina-martinez',
            'image': 'team/carolina.jpg',
            'order': 4,
        },
        {
            'name': 'Xoan Pablo',
            'position': 'Becario',
            'role': 'intern',
            'bio': 'Becario talentoso con gran potencial en desarrollo web y móvil, siempre dispuesto a aprender nuevas tecnologías.',
            'expertise': 'React, Node.js, Desarrollo Móvil',
            'email': 'xoan@init.com.mx',
            'linkedin': 'https://linkedin.com/in/xoan-pablo',
            'image': 'team/xoan.jpg',
            'order': 5,
        },
    ]
    
    for member_data in team_data:
        # Verificar si el miembro ya existe
        if TeamMember.objects.filter(name=member_data['name']).exists():
            print(f"✅ {member_data['name']} ya existe")
            continue
        
        # Verificar si la imagen existe
        image_path = os.path.join('media', member_data['image'])
        if not os.path.exists(image_path):
            print(f"❌ Imagen no encontrada para {member_data['name']}: {image_path}")
            member_data['image'] = ''  # Sin imagen si no existe
        
        # Crear el miembro del equipo
        member = TeamMember.objects.create(**member_data)
        print(f"✅ Creado: {member.name} - {member.position}")
    
    print(f"\n=== Total de miembros: {TeamMember.objects.count()} ===")
    for member in TeamMember.objects.all():
        print(f"- {member.name}: {member.image or 'Sin imagen'}")

if __name__ == '__main__':
    create_team_members()
