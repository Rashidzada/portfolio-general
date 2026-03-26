from django.contrib import admin

from .models import (
    Certificate,
    Education,
    Experience,
    GalleryImage,
    Project,
    ProjectImage,
    Service,
    Skill,
    SkillCategory,
    Testimonial,
)


class SkillInline(admin.TabularInline):
    model = Skill
    extra = 0


@admin.register(SkillCategory)
class SkillCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'accent_color', 'is_active', 'sort_order')
    list_filter = ('is_active',)
    search_fields = ('name', 'description')
    prepopulated_fields = {'slug': ('name',)}
    inlines = [SkillInline]


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'proficiency', 'is_featured', 'is_active', 'sort_order')
    list_filter = ('category', 'is_featured', 'is_active')
    search_fields = ('name', 'short_label')


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'highlight', 'is_active', 'sort_order')
    list_filter = ('is_active',)
    search_fields = ('title', 'short_description', 'details')
    prepopulated_fields = {'slug': ('title',)}


class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 0


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'status', 'is_featured', 'is_active', 'sort_order')
    list_filter = ('category', 'status', 'is_featured', 'is_active')
    search_fields = ('title', 'summary', 'description')
    prepopulated_fields = {'slug': ('title',)}
    inlines = [ProjectImageInline]


@admin.register(ProjectImage)
class ProjectImageAdmin(admin.ModelAdmin):
    list_display = ('project', 'title', 'is_primary', 'is_active', 'sort_order')
    list_filter = ('is_primary', 'is_active')
    search_fields = ('project__title', 'title', 'caption')


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ('degree_title', 'institute_name', 'start_year', 'end_year', 'is_featured', 'is_active')
    list_filter = ('is_featured', 'is_active')
    search_fields = ('degree_title', 'institute_name', 'location')


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('role', 'organization', 'start_date', 'end_date', 'is_current', 'is_active')
    list_filter = ('is_current', 'is_featured', 'is_active')
    search_fields = ('role', 'organization', 'location')


@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
    list_display = ('title', 'issuer', 'issue_date', 'is_featured', 'is_active')
    list_filter = ('issuer', 'is_featured', 'is_active')
    search_fields = ('title', 'issuer', 'credential_id')


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'organization', 'rating', 'is_featured', 'is_active')
    list_filter = ('is_featured', 'is_active', 'rating')
    search_fields = ('name', 'role', 'organization', 'feedback')


@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'is_featured', 'is_active', 'sort_order')
    list_filter = ('category', 'is_featured', 'is_active')
    search_fields = ('title', 'caption', 'alt_text')

# Register your models here.
