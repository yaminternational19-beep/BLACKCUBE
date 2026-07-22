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

