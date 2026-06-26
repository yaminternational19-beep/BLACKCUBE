from django.urls import path
from .views import ContactSubmissionListAPIView, ContactSubmissionDetailAPIView

urlpatterns = [
    path('', ContactSubmissionListAPIView.as_view(), name='admin-contact-list'),
    path('<int:pk>/', ContactSubmissionDetailAPIView.as_view(), name='admin-contact-detail'),
]
