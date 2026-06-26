from django.contrib import admin
from .models import PortfolioItem, PortfolioCategory, Technology, TeamRole, TeamMember, PortfolioMethod

class TeamMemberInline(admin.TabularInline):
    model = TeamMember
    extra = 1

class PortfolioMethodInline(admin.TabularInline):
    model = PortfolioMethod
    extra = 1

class PortfolioItemAdmin(admin.ModelAdmin):
    inlines = [TeamMemberInline, PortfolioMethodInline]
    filter_horizontal = ('technologies',)

admin.site.register(PortfolioCategory)
admin.site.register(Technology)
admin.site.register(TeamRole)
admin.site.register(PortfolioItem, PortfolioItemAdmin)
