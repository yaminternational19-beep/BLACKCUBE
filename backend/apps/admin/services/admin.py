from django.contrib import admin
from .models import Service, ServiceCategory, ServiceFeature

class ServiceFeatureInline(admin.TabularInline):
    model = ServiceFeature
    extra = 1

class ServiceAdmin(admin.ModelAdmin):
    inlines = [ServiceFeatureInline]

admin.site.register(ServiceCategory)
admin.site.register(Service, ServiceAdmin)
