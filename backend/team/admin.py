from django.contrib import admin
from .models import TeamMember

@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ['name', 'position', 'role', 'order', 'is_active']
    list_filter = ['role', 'is_active']
    search_fields = ['name', 'position', 'bio']
    ordering = ['order', 'name']
    list_editable = ['order', 'is_active']
    
    fieldsets = (
        ('Información Personal', {
            'fields': ('name', 'position', 'role', 'image')
        }),
        ('Información Profesional', {
            'fields': ('bio', 'expertise')
        }),
        ('Contacto', {
            'fields': ('email', 'linkedin')
        }),
        ('Configuración', {
            'fields': ('order', 'is_active')
        }),
    )
