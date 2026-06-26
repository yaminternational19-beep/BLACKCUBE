from django.db import models

class Page(models.Model):
    page_id = models.CharField(max_length=255, unique=True)
    title = models.CharField(max_length=255)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class PageField(models.Model):
    page = models.ForeignKey(Page, on_delete=models.CASCADE, related_name='fields')
    field_id = models.CharField(max_length=255)
    label = models.CharField(max_length=255)
    field_type = models.CharField(max_length=100)
    value = models.JSONField(blank=True, null=True) # Allows storing simple strings or complex nested structures
    nested_fields = models.JSONField(default=list, blank=True)

    def __str__(self):
        return f"{self.page.title} - {self.label}"
