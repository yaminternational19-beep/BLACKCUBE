from django.db import models

class JobPosting(models.Model):
    title = models.CharField(max_length=255)
    department = models.CharField(max_length=255, blank=True, default='')
    location = models.CharField(max_length=255, blank=True, default='')
    type = models.CharField(max_length=100, blank=True, default='')
    
    description = models.TextField(blank=True, default='')
    salary = models.CharField(max_length=255, blank=True, default='')
    experience = models.CharField(max_length=255, blank=True, default='')
    postedDate = models.CharField(max_length=100, blank=True, default='')
    deadline = models.CharField(max_length=100, blank=True, default='')

    # Store arrays of strings as JSON
    requirements = models.JSONField(default=list, blank=True)
    benefits = models.JSONField(default=list, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class JobApplication(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('reviewed', 'Reviewed'),
        ('shortlisted', 'Shortlisted'),
        ('rejected', 'Rejected'),
    ]

    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=50, blank=True, default='')
    position = models.CharField(max_length=255)
    experience = models.CharField(max_length=255, blank=True, default='')
    coverLetter = models.TextField(blank=True, default='')
    resumeUrl = models.CharField(max_length=500, blank=True, default='')
    appliedDate = models.CharField(max_length=100, blank=True, default='')
    is_read = models.BooleanField(default=False)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='pending')
    
    jobId = models.CharField(max_length=255, blank=True, null=True)
    jobTitle = models.CharField(max_length=255, blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - {self.position}"
