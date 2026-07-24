import os
import uuid
import logging
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

logger = logging.getLogger(__name__)

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
        ext = file.name.split('.')[-1] if '.' in file.name else 'pdf'
        unique_filename = f"{uuid.uuid4().hex}.{ext}"

        cloudinary_storage = getattr(settings, 'CLOUDINARY_STORAGE', {})
        if cloudinary_storage.get('CLOUD_NAME') and cloudinary_storage.get('API_KEY'):
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
                logger.error(f"Cloudinary upload failed: {e}. Falling back to local media storage.")

        # Fallback to Local Media Storage
        try:
            relative_path = os.path.join("blackcube/resumes", unique_filename).replace('\\', '/')
            save_path = os.path.join(settings.MEDIA_ROOT, relative_path)
            
            os.makedirs(os.path.dirname(save_path), exist_ok=True)
            with open(save_path, 'wb+') as destination:
                for chunk in file.chunks():
                    destination.write(chunk)
            
            media_url = settings.MEDIA_URL.rstrip('/')
            file_url = request.build_absolute_uri(f"{media_url}/{relative_path}")
            
            return Response({
                'success': True,
                'data': {
                    'url': file_url
                }
            })
        except Exception as e:
            return Response({
                'success': False,
                'message': f"Upload failed: {str(e)}"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UploadImageAPIView(APIView):
    permission_classes = [AllowAny]
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = 'uploads'

    def post(self, request, *args, **kwargs):
        if 'image' not in request.FILES:
            return Response({'success': False, 'message': 'No file uploaded'}, status=status.HTTP_400_BAD_REQUEST)
        
        file = request.FILES['image']
        
        target_folder = request.data.get('folder', 'images').strip().lower()
        project_name = request.data.get('project_name', '').strip()
        
        folder_mapping = {
            'employees': 'blackcube/employeeprofiles',
            'employeeprofiles': 'blackcube/employeeprofiles',
            'projects': 'blackcube/projects',
            'portfolios': 'blackcube/projects',
            'blogs': 'blackcube/blogs',
            'services': 'blackcube/services',
            'testimonials': 'blackcube/testimonials',
            'clientlogos': 'blackcube/clientlogos',
            'clients': 'blackcube/clientlogos',
        }
        
        cloud_folder = folder_mapping.get(target_folder, f"blackcube/{target_folder}")
        
        if target_folder in ['projects', 'portfolios'] and project_name:
            safe_project_name = "".join([c if c.isalnum() or c in ['-', '_'] else '_' for c in project_name.lower()]).strip('_')
            if safe_project_name:
                cloud_folder = f"blackcube/projects/{safe_project_name}"
            
        cloudinary_storage = getattr(settings, 'CLOUDINARY_STORAGE', {})
        if cloudinary_storage.get('CLOUD_NAME') and cloudinary_storage.get('API_KEY'):
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
                logger.error(f"Cloudinary upload failed: {e}. Falling back to local media storage.")

        # Fallback to Local Media Storage
        try:
            ext = file.name.split('.')[-1] if '.' in file.name else 'png'
            filename = f"{uuid.uuid4().hex}.{ext}"
            relative_path = os.path.join(cloud_folder, filename).replace('\\', '/')
            save_path = os.path.join(settings.MEDIA_ROOT, relative_path)
            
            os.makedirs(os.path.dirname(save_path), exist_ok=True)
            with open(save_path, 'wb+') as destination:
                for chunk in file.chunks():
                    destination.write(chunk)
            
            media_url = settings.MEDIA_URL.rstrip('/')
            file_url = request.build_absolute_uri(f"{media_url}/{relative_path}")
            
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
                'message': f"Upload failed: {str(e)}"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UploadImagesAPIView(APIView):
    permission_classes = [AllowAny]
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = 'uploads'

    def post(self, request, *args, **kwargs):
        files = request.FILES.getlist('images') or request.FILES.getlist('image')
        if not files and 'image' in request.FILES:
            files = [request.FILES['image']]
        
        if not files:
            return Response({'success': False, 'message': 'No files uploaded'}, status=status.HTTP_400_BAD_REQUEST)
        
        target_folder = request.data.get('folder', 'images').strip().lower()
        project_name = request.data.get('project_name', '').strip()
        
        folder_mapping = {
            'employees': 'blackcube/employeeprofiles',
            'employeeprofiles': 'blackcube/employeeprofiles',
            'projects': 'blackcube/projects',
            'portfolios': 'blackcube/projects',
            'blogs': 'blackcube/blogs',
            'services': 'blackcube/services',
            'testimonials': 'blackcube/testimonials',
            'clientlogos': 'blackcube/clientlogos',
            'clients': 'blackcube/clientlogos',
        }
        
        cloud_folder = folder_mapping.get(target_folder, f"blackcube/{target_folder}")
        
        if target_folder in ['projects', 'portfolios'] and project_name:
            safe_project_name = "".join([c if c.isalnum() or c in ['-', '_'] else '_' for c in project_name.lower()]).strip('_')
            if safe_project_name:
                cloud_folder = f"blackcube/projects/{safe_project_name}"
            
        cloudinary_storage = getattr(settings, 'CLOUDINARY_STORAGE', {})
        use_cloudinary = bool(cloudinary_storage.get('CLOUD_NAME') and cloudinary_storage.get('API_KEY'))
        
        uploaded_results = []
        for file in files:
            file_url = None
            if use_cloudinary:
                try:
                    upload_result = cloudinary.uploader.upload(
                        file,
                        folder=cloud_folder,
                        resource_type="auto",
                        public_id=uuid.uuid4().hex
                    )
                    file_url = upload_result.get('secure_url')
                except Exception as e:
                    logger.error(f"Cloudinary upload failed for {file.name}: {e}. Falling back to local media storage.")

            if not file_url:
                try:
                    ext = file.name.split('.')[-1] if '.' in file.name else 'png'
                    filename = f"{uuid.uuid4().hex}.{ext}"
                    relative_path = os.path.join(cloud_folder, filename).replace('\\', '/')
                    save_path = os.path.join(settings.MEDIA_ROOT, relative_path)
                    
                    os.makedirs(os.path.dirname(save_path), exist_ok=True)
                    with open(save_path, 'wb+') as destination:
                        for chunk in file.chunks():
                            destination.write(chunk)
                    
                    media_url = settings.MEDIA_URL.rstrip('/')
                    file_url = request.build_absolute_uri(f"{media_url}/{relative_path}")
                except Exception as e:
                    logger.error(f"Local storage save failed for {file.name}: {e}")

            if file_url:
                uploaded_results.append({
                    'url': file_url,
                    'filename': file.name,
                    'folder': cloud_folder
                })

        return Response({
            'success': True,
            'data': uploaded_results
        })


