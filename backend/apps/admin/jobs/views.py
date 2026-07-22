from rest_framework import generics
from rest_framework.throttling import ScopedRateThrottle
from django.core.mail import send_mail
from django.db.models import Q
from .models import JobPosting, JobApplication
from .serializers import JobPostingAdminSerializer, JobApplicationAdminSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
import cloudinary
import cloudinary.uploader
import uuid

from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly

class JobPostingListCreateAPIView(generics.ListCreateAPIView):
    queryset = JobPosting.objects.all().order_by('-created_at')
    serializer_class = JobPostingAdminSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class JobPostingDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = JobPosting.objects.all()
    serializer_class = JobPostingAdminSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class JobApplicationListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = JobApplicationAdminSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            return [AllowAny()]
        return [IsAuthenticated()]

    def get_queryset(self):
        queryset = JobApplication.objects.all().order_by('-created_at')
        
        status_filter = self.request.query_params.get('status', None)
        if status_filter:
            queryset = queryset.filter(status=status_filter)
            
        q = self.request.query_params.get('q', None)
        if q:
            queryset = queryset.filter(
                Q(name__icontains=q) | 
                Q(email__icontains=q) |
                Q(position__icontains=q)
            )
            
        return queryset

    def perform_create(self, serializer):
        instance = serializer.save()
        
        # 1. Send Receipt Confirmation Email to Candidate
        try:
            candidate_subject = f"Application Received: {instance.position} - BlackCube Solutions"
            candidate_message = (
                f"Hello {instance.name},\n\n"
                f"Thank you for applying for the position of '{instance.position}' at BlackCube Solutions!\n\n"
                f"We have successfully received your application and resume. Our HR recruitment team is currently reviewing candidate profiles and will update you soon regarding the next steps in our hiring process.\n\n"
                f"Application Summary:\n"
                f"- Candidate Name: {instance.name}\n"
                f"- Applied Position: {instance.position}\n"
                f"- Contact Email: {instance.email}\n\n"
                f"Best of luck!\n\n"
                f"HR & Recruitment Team\n"
                f"BlackCube Solutions\n"
                f"https://blackcube.in"
            )
            send_mail(
                candidate_subject,
                candidate_message,
                settings.DEFAULT_FROM_EMAIL,
                [instance.email],
                fail_silently=True,
            )
        except Exception:
            pass

        # 2. Send Email Notification to HR/Admin
        try:
            subject = f"New Job Application: {instance.name} for {instance.position}"
            message = f"A new candidate has applied for a position on BlackCube:\n\nName: {instance.name}\nEmail: {instance.email}\nPhone: {getattr(instance, 'phone', 'N/A')}\nPosition: {instance.position}\nResume URL: {getattr(instance, 'resumeUrl', 'N/A')}"
            send_mail(
                subject,
                message,
                settings.DEFAULT_FROM_EMAIL,
                [settings.ADMIN_NOTIFICATION_EMAIL],
                fail_silently=True,
            )
        except Exception:
            pass


class JobApplicationDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = JobApplication.objects.all()
    serializer_class = JobApplicationAdminSerializer
    permission_classes = [IsAuthenticated]

from rest_framework.permissions import AllowAny, IsAuthenticated

class UploadResumeAPIView(APIView):
    permission_classes = [AllowAny]
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = 'uploads'

    def post(self, request, *args, **kwargs):
        if 'resume' not in request.FILES:
            return Response({'success': False, 'message': 'No file uploaded'}, status=status.HTTP_400_BAD_REQUEST)
        
        file = request.FILES['resume']
        
        cloudinary_storage = getattr(settings, 'CLOUDINARY_STORAGE', {})
        if not cloudinary_storage.get('CLOUD_NAME'):
            return Response({'success': False, 'message': 'Cloudinary credentials not configured properly'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        ext = file.name.split('.')[-1]
        unique_filename = f"{uuid.uuid4().hex}.{ext}"

        try:
            upload_result = cloudinary.uploader.upload(
                file,
                folder="blackcube/resumes",
                resource_type="raw",
                public_id=unique_filename
            )
            
            file_url = upload_result.get('secure_url')
            
            return Response({
                'success': True,
                'data': {
                    'url': file_url
                }
            })
            
        except Exception as e:
            return Response({
                'success': False,
                'message': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UploadImageAPIView(APIView):
    permission_classes = [AllowAny]
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = 'uploads'

    def post(self, request, *args, **kwargs):
        if 'image' not in request.FILES:
            return Response({'success': False, 'message': 'No file uploaded'}, status=status.HTTP_400_BAD_REQUEST)
        
        file = request.FILES['image']
        
        cloudinary_storage = getattr(settings, 'CLOUDINARY_STORAGE', {})
        if not cloudinary_storage.get('CLOUD_NAME'):
            return Response({'success': False, 'message': 'Cloudinary credentials not configured properly'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        target_folder = request.data.get('folder', 'images').strip().lower()
        project_name = request.data.get('project_name', '').strip()
        
        # Cloudinary Structured Folder Hierarchy
        folder_mapping = {
            'employees': 'blackcube/employeeprofiles',
            'employeeprofiles': 'blackcube/employeeprofiles',
            'projects': 'blackcube/projects',
            'portfolios': 'blackcube/projects',
            'blogs': 'blackcube/blogs',
            'services': 'blackcube/services',
            'testimonials': 'blackcube/testimonials',
        }
        
        cloud_folder = folder_mapping.get(target_folder, f"blackcube/{target_folder}")
        
        # If project_name is provided, nest image inside blackcube/projects/<project_name>/
        if target_folder in ['projects', 'portfolios'] and project_name:
            safe_project_name = "".join([c if c.isalnum() or c in ['-', '_'] else '_' for c in project_name.lower()]).strip('_')
            if safe_project_name:
                cloud_folder = f"blackcube/projects/{safe_project_name}"
            
        try:
            upload_result = cloudinary.uploader.upload(
                file,
                folder=cloud_folder,
                resource_type="auto",
                public_id=uuid.uuid4().hex
            )
            
            file_url = upload_result.get('secure_url')
            
            return Response({
                'success': True,
                'data': {
                    'url': file_url,
                    'folder': cloud_folder
                }
            })
            
        except Exception as e:
            return Response({
                'success': False,
                'message': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


