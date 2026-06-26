from django.contrib import admin
from .models import Blog, BlogCategory

admin.site.register(BlogCategory)
admin.site.register(Blog)
