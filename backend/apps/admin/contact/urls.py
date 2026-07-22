from django.urls import path
from .views import (
    ContactSubmissionListAPIView, ContactSubmissionDetailAPIView,
    ProjectEstimateListAPIView, ProjectEstimateDetailAPIView
)

urlpatterns = [
    path('', ContactSubmissionListAPIView.as_view(), name='admin-contact-list'),
    path('<int:pk>/', ContactSubmissionDetailAPIView.as_view(), name='admin-contact-detail'),
    path('estimates/', ProjectEstimateListAPIView.as_view(), name='admin-estimate-list'),
    path('estimates/<int:pk>/', ProjectEstimateDetailAPIView.as_view(), name='admin-estimate-detail'),
]
