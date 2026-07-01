from django.db import models

class Footer(models.Model):
    company_name = models.CharField(max_length=255, blank=True, null=True)
    email = models.CharField(max_length=255, blank=True, null=True)
    phone = models.CharField(max_length=50, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    social_links = models.JSONField(default=dict, blank=True)
    
    copyright_text = models.CharField(max_length=255, blank=True, null=True, default="@2026 BLACK CUBE SOLUTIONS LLC. All Rights Reserved")
    privacy_policy_text = models.TextField(blank=True, null=True)
    terms_conditions_text = models.TextField(blank=True, null=True)
    cookie_policy_text = models.TextField(blank=True, null=True)
    custom_links = models.JSONField(default=list, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "Website Footer Configuration"

    class Meta:
        verbose_name_plural = "Footer"
