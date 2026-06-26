from rest_framework import serializers
from .models import JobPosting, JobApplication

class JobPostingAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobPosting
        fields = '__all__'

class JobApplicationAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobApplication
        fields = '__all__'

    def to_representation(self, instance):
        data = super().to_representation(instance)
        url = data.get('resumeUrl')
        if url and 'amazonaws.com/' in url:
            key = url.split('amazonaws.com/')[-1]
            try:
                import boto3
                from django.conf import settings
                from botocore.client import Config
                s3_client = boto3.client(
                    's3',
                    aws_access_key_id=getattr(settings, 'AWS_ACCESS_KEY_ID', None),
                    aws_secret_access_key=getattr(settings, 'AWS_SECRET_ACCESS_KEY', None),
                    region_name=getattr(settings, 'AWS_S3_REGION_NAME', 'us-east-1'),
                    config=Config(signature_version='s3v4', s3={'addressing_style': 'virtual'})
                )
                presigned = s3_client.generate_presigned_url(
                    'get_object',
                    Params={
                        'Bucket': getattr(settings, 'AWS_STORAGE_BUCKET_NAME', None),
                        'Key': key
                    },
                    ExpiresIn=3600 # 1 hour validity
                )
                data['resumeUrl'] = presigned
            except Exception as e:
                pass # Fallback to original URL if generation fails
        return data
