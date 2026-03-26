from django.contrib import admin
from django.conf import settings

from .models import ContentSection, Profile, ResumeFile, SiteSetting, SocialLink


@admin.register(ContentSection)
class ContentSectionAdmin(admin.ModelAdmin):
    list_display = ('label', 'key', 'is_active', 'sort_order', 'updated_at')
    list_filter = ('is_active',)
    search_fields = ('label', 'key', 'title', 'description')
    ordering = ('sort_order', 'id')


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'headline', 'primary_email', 'location', 'is_primary', 'updated_at')
    list_filter = ('is_primary',)
    search_fields = ('full_name', 'headline', 'primary_email', 'location')


@admin.register(SocialLink)
class SocialLinkAdmin(admin.ModelAdmin):
    list_display = ('label', 'platform', 'url', 'is_featured', 'is_active', 'sort_order')
    list_filter = ('platform', 'is_featured', 'is_active')
    search_fields = ('label', 'platform', 'url')
    ordering = ('sort_order', 'id')


@admin.register(ResumeFile)
class ResumeFileAdmin(admin.ModelAdmin):
    list_display = ('title', 'is_primary', 'updated_at')
    list_filter = ('is_primary',)
    search_fields = ('title', 'description')


@admin.register(SiteSetting)
class SiteSettingAdmin(admin.ModelAdmin):
    list_display = ('site_name', 'contact_email', 'contact_phone', 'updated_at')
    search_fields = ('site_name', 'contact_email', 'contact_phone')


admin.site.site_header = 'Portfolio CMS'
admin.site.site_title = 'Portfolio Admin'
admin.site.index_title = 'Content Management'
admin.site.site_url = settings.FRONTEND_SITE_URL

# Register your models here.
