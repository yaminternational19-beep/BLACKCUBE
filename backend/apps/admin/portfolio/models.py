from django.db import models
from django.conf import settings

class PortfolioCategory(models.Model):
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True, default='')
    
    def __str__(self):
        return self.name

class Technology(models.Model):
    name = models.CharField(max_length=100, unique=True)
    icon = models.CharField(max_length=255, blank=True, default='')

    def __str__(self):
        return self.name

class TeamRole(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class PortfolioItem(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, default='')
    category = models.ForeignKey(PortfolioCategory, on_delete=models.SET_NULL, null=True, blank=True, related_name='portfolio_items')
    
    technologies = models.ManyToManyField(Technology, blank=True, related_name='portfolio_items')
    
    client = models.CharField(max_length=255, blank=True, default='')
    link = models.CharField(max_length=500, blank=True, default='')
    image = models.CharField(max_length=500, blank=True, default='')
    featured = models.BooleanField(default=False)
    coverImage = models.CharField(max_length=500, blank=True, default='')
    timeTaken = models.CharField(max_length=255, blank=True, default='')
    startDate = models.CharField(max_length=100, blank=True, default='')
    completedDate = models.CharField(max_length=100, blank=True, default='')
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class PortfolioMethod(models.Model):
    portfolio_item = models.ForeignKey(PortfolioItem, on_delete=models.CASCADE, related_name='methods')
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class TeamMember(models.Model):
    portfolio_item = models.ForeignKey(PortfolioItem, on_delete=models.CASCADE, related_name='team_members')
    role = models.ForeignKey(TeamRole, on_delete=models.SET_NULL, null=True, blank=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    name = models.CharField(max_length=255, blank=True, default='') # Fallback if not registered user

    def __str__(self):
        return f"{self.name or self.user} - {self.role}"
