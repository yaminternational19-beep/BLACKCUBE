from django.contrib import admin
from .models import JobPosting, JobApplication, JobDepartment, JobLocation, JobType, JobRequirement, JobBenefit

class JobRequirementInline(admin.TabularInline):
    model = JobRequirement
    extra = 1

class JobBenefitInline(admin.TabularInline):
    model = JobBenefit
    extra = 1

class JobPostingAdmin(admin.ModelAdmin):
    inlines = [JobRequirementInline, JobBenefitInline]

admin.site.register(JobDepartment)
admin.site.register(JobLocation)
admin.site.register(JobType)
admin.site.register(JobPosting, JobPostingAdmin)
admin.site.register(JobApplication)
