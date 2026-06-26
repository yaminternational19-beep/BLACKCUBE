from django.urls import path
from . import views

urlpatterns = [
    path('health/', views.health_check, name='testing-health-check'),
    path('db/', views.db_check, name='testing-db-check'),
]
