#!/usr/bin/env python3
import os
import django

# Configurar Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'init_backend.settings')
django.setup()

from django.contrib.auth.models import User

def create_test_user():
    # Verificar si el usuario ya existe
    if User.objects.filter(username='admin').exists():
        print("El usuario 'admin' ya existe")
        return
    
    # Crear usuario de prueba
    user = User.objects.create_user(
        username='admin',
        email='admin@init.com',
        password='admin123',
        first_name='Admin',
        last_name='User'
    )
    
    print(f"Usuario creado exitosamente:")
    print(f"Username: {user.username}")
    print(f"Email: {user.email}")
    print(f"Password: admin123")

if __name__ == '__main__':
    create_test_user()
