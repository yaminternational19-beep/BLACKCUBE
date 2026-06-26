from django.contrib import admin
from .models import Page, PageField

class PageFieldInline(admin.TabularInline):
    model = PageField
    extra = 1

class PageAdmin(admin.ModelAdmin):
    inlines = [PageFieldInline]

admin.site.register(Page, PageAdmin)
