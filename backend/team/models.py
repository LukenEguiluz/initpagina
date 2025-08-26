from django.db import models

# Create your models here.

class TeamMember(models.Model):
    ROLE_CHOICES = [
        ('owner', 'Dueño'),
        ('intern', 'Becario'),
    ]
    
    name = models.CharField(max_length=100, verbose_name="Nombre")
    position = models.CharField(max_length=100, verbose_name="Cargo")
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, verbose_name="Rol")
    bio = models.TextField(verbose_name="Biografía")
    expertise = models.TextField(verbose_name="Especialidades")
    image = models.ImageField(upload_to='team/', verbose_name="Foto", blank=True, null=True)
    linkedin = models.URLField(blank=True, null=True, verbose_name="LinkedIn")
    email = models.EmailField(blank=True, null=True, verbose_name="Email")
    order = models.IntegerField(default=0, verbose_name="Orden de aparición")
    is_active = models.BooleanField(default=True, verbose_name="Activo")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'name']
        verbose_name = "Miembro del equipo"
        verbose_name_plural = "Miembros del equipo"

    def __str__(self):
        return f"{self.name} - {self.position}"
