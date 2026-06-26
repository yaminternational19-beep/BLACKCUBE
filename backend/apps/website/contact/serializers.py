from rest_framework import serializers
from apps.admin.contact.models import ContactSubmission

class ContactSubmissionCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSubmission
        fields = ['name', 'email', 'phone', 'subject', 'company', 'message', 'service']
