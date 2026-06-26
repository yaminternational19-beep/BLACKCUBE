from django.urls import path
from . import views

urlpatterns = [
    path('', views.admin_blogs, name='admin-blogs-list'),
    path('<int:pk>/', views.admin_blogs_detail, name='admin-blogs-detail'),
]
