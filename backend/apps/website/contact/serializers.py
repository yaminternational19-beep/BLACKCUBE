from rest_framework import serializers
from apps.admin.contact.models import ContactSubmission, CookieConsent, ProjectEstimate

class ContactSubmissionCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSubmission
        fields = ['name', 'email', 'phone', 'subject', 'company', 'message', 'service']

class CookieConsentSerializer(serializers.ModelSerializer):
    class Meta:
        model = CookieConsent
        fields = ['id', 'accepted_all', 'analytics_accepted', 'marketing_accepted', 'email', 'purpose_of_visit', 'created_at']

class ProjectEstimateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectEstimate
        fields = '__all__'


