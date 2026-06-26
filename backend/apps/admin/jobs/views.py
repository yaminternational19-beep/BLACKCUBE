from rest_framework import generics
from django.db.models import Q
from .models import JobPosting, JobApplication
from .serializers import JobPostingAdminSerializer, JobApplicationAdminSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
import boto3
import uuid

class JobPostingListCreateAPIView(generics.ListCreateAPIView):
    queryset = JobPosting.objects.all().order_by('-created_at')
    serializer_class = JobPostingAdminSerializer

class JobPostingDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = JobPosting.objects.all()
    serializer_class = JobPostingAdminSerializer

class JobApplicationListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = JobApplicationAdminSerializer

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


class JobApplicationDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = JobApplication.objects.all()
    serializer_class = JobApplicationAdminSerializer

class UploadResumeAPIView(APIView):
    def post(self, request, *args, **kwargs):
        if 'resume' not in request.FILES:
            return Response({'success': False, 'message': 'No file uploaded'}, status=status.HTTP_400_BAD_REQUEST)
        
        file = request.FILES['resume']
        
        aws_access_key = getattr(settings, 'AWS_ACCESS_KEY_ID', None)
        aws_secret_key = getattr(settings, 'AWS_SECRET_ACCESS_KEY', None)
        bucket_name = getattr(settings, 'AWS_STORAGE_BUCKET_NAME', None)
        region_name = getattr(settings, 'AWS_S3_REGION_NAME', 'us-east-1')

        if not all([aws_access_key, aws_secret_key, bucket_name]):
            return Response({'success': False, 'message': 'S3 credentials not configured properly'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        s3_client = boto3.client(
            's3',
            aws_access_key_id=aws_access_key,
            aws_secret_access_key=aws_secret_key,
            region_name=region_name
        )
        
        # Generate unique filename
        ext = file.name.split('.')[-1]
        unique_filename = f"resumes/{uuid.uuid4().hex}.{ext}"

        try:
            s3_client.upload_fileobj(
                file,
                bucket_name,
                unique_filename,
                ExtraArgs={
                    "ContentType": file.content_type,
                    # Remove ACL if your bucket does not have ACLs enabled, but typically needed for public-read unless bucket policy allows it
                    # "ACL": "public-read" 
                }
            )
            
            # Construct public URL
            file_url = f"https://{bucket_name}.s3.{region_name}.amazonaws.com/{unique_filename}"
            
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
    def post(self, request, *args, **kwargs):
        if 'image' not in request.FILES:
            return Response({'success': False, 'message': 'No file uploaded'}, status=status.HTTP_400_BAD_REQUEST)
        
        file = request.FILES['image']
        
        aws_access_key = getattr(settings, 'AWS_ACCESS_KEY_ID', None)
        aws_secret_key = getattr(settings, 'AWS_SECRET_ACCESS_KEY', None)
        bucket_name = getattr(settings, 'AWS_STORAGE_BUCKET_NAME', None)
        region_name = getattr(settings, 'AWS_S3_REGION_NAME', 'us-east-1')

        if not all([aws_access_key, aws_secret_key, bucket_name]):
            return Response({'success': False, 'message': 'S3 credentials not configured properly'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        s3_client = boto3.client(
            's3',
            aws_access_key_id=aws_access_key,
            aws_secret_access_key=aws_secret_key,
            region_name=region_name,
            config=boto3.session.Config(signature_version='s3v4')
        )
        
        # Get target folder from request (default to 'images')
        target_folder = request.data.get('folder', 'images')
        
        # Sanitize folder to only allow specific ones for security
        allowed_folders = ['images', 'employees', 'testimonials', 'blogs', 'portfolios']
        if target_folder not in allowed_folders:
            target_folder = 'images'
            
        # Generate unique filename
        ext = file.name.split('.')[-1]
        unique_filename = f"{target_folder}/{uuid.uuid4().hex}.{ext}"

        try:
            s3_client.upload_fileobj(
                file,
                bucket_name,
                unique_filename,
                ExtraArgs={
                    "ContentType": file.content_type,
                }
            )
            
            # Construct public URL using virtual addressing style to avoid signature mismatch
            file_url = f"https://{bucket_name}.s3.{region_name}.amazonaws.com/{unique_filename}"
            
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

