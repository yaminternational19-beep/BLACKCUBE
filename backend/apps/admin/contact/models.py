from django.db import models
from apps.admin.services.models import Service

class ContactSubmission(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=50, blank=True, default='')
    subject = models.CharField(max_length=255, blank=True, default='')
    service = models.CharField(max_length=255, blank=True, null=True)
    company = models.CharField(max_length=255, blank=True, default='')
    message = models.TextField(blank=True, default='')
    is_read = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - {self.subject}"


PURPOSE_CHOICES = (
    ('PROJECT_COLLABORATION', 'Project Collaboration'),
    ('COLLABORATION_ENERGY', 'Collaboration / Energy'),
    ('JOB_REQUIREMENT', 'Job Requirement'),
    ('JUST_BROWSING', 'Just Browsing / Exploring'),
)

class CookieConsent(models.Model):
    ip_address = models.GenericIPAddressField(blank=True, null=True)
    user_agent = models.TextField(blank=True, default='')
    accepted_all = models.BooleanField(default=True)
    analytics_accepted = models.BooleanField(default=True)
    marketing_accepted = models.BooleanField(default=True)
    email = models.EmailField(blank=True, null=True)
    purpose_of_visit = models.CharField(max_length=100, choices=PURPOSE_CHOICES, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        email_str = f" ({self.email})" if self.email else ""
        return f"Consent from {self.ip_address}{email_str}"


class ProjectEstimate(models.Model):
    project_type = models.CharField(max_length=255)
    scope = models.CharField(max_length=255, blank=True, default='')
    budget_range = models.CharField(max_length=255, blank=True, default='')
    timeline = models.CharField(max_length=255, blank=True, default='')
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=50, blank=True, default='')
    company = models.CharField(max_length=255, blank=True, default='')
    description = models.TextField(blank=True, default='')
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Estimate Lead: {self.name} ({self.project_type})"


