from django.urls import path
from .views import db_connectivity_view

urlpatterns = [
    path('', db_connectivity_view, name='db-connectivity-test'),
]
