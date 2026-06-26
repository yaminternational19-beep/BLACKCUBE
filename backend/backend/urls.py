"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    # path('admin/', admin.site.urls), # Django's built-in admin, disabled if not needed
    path('api/auth/', include('apps.authentication.urls')),
    
    # Admin APIs
    path('api/pages/', include('apps.admin.pages.urls')),
    path('api/admin/blogs/', include('apps.admin.blogs.urls')),
    path('api/admin/contact-submissions/', include('apps.admin.contact.urls')),
    path('api/', include('apps.admin.jobs.urls')),
    path('api/portfolio/', include('apps.admin.portfolio.urls')),
    path('api/services/', include('apps.admin.services.urls')),
    
    # Website APIs
    path('api/website/blogs/', include('apps.website.blogs.urls')),
    path('api/contact-submissions/', include('apps.website.contact.urls')),

    # Testing APIs removed for production
]
