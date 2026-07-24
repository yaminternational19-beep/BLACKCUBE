from django.urls import path
from .views import (
    JobPostingListCreateAPIView,
    JobPostingDetailAPIView,
    JobApplicationListCreateAPIView,
    JobApplicationDetailAPIView,
    UploadResumeAPIView,
    UploadImageAPIView,
    UploadImagesAPIView,
)

urlpatterns = [
    # Careers / Jobs
    path('careers/', JobPostingListCreateAPIView.as_view(), name='admin-job-list'),
    path('careers/<int:pk>/', JobPostingDetailAPIView.as_view(), name='admin-job-detail'),
    
    # Job Applications
    path('job-applications/', JobApplicationListCreateAPIView.as_view(), name='admin-jobapplication-list'),
    path('job-applications/<int:pk>/', JobApplicationDetailAPIView.as_view(), name='admin-jobapplication-detail'),
    
    # Uploads
    path('upload/resume/', UploadResumeAPIView.as_view(), name='upload-resume'),
    path('upload/resume', UploadResumeAPIView.as_view()),
    path('upload/image/', UploadImageAPIView.as_view(), name='upload-image'),
    path('upload/image', UploadImageAPIView.as_view()),
    path('upload/images/', UploadImagesAPIView.as_view(), name='upload-images'),
    path('upload/images', UploadImagesAPIView.as_view()),
]
