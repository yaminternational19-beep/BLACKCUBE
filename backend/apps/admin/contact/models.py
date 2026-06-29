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
