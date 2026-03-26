from __future__ import annotations

from django.db import models

from .utils import build_media_url


class TimestampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class OrderedActiveModel(TimestampedModel):
    sort_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        abstract = True
        ordering = ('sort_order', 'id')


class ContentSection(OrderedActiveModel):
    key = models.SlugField(max_length=80, unique=True)
    label = models.CharField(max_length=120)
    eyebrow = models.CharField(max_length=120, blank=True)
    title = models.CharField(max_length=220, blank=True)
    description = models.TextField(blank=True)
    extra_text = models.TextField(blank=True)
    items = models.JSONField(default=list, blank=True)

    def __str__(self) -> str:
        return self.label


class Profile(TimestampedModel):
    full_name = models.CharField(max_length=150)
    headline = models.CharField(max_length=160)
    subheadline = models.CharField(max_length=180, blank=True)
    hero_intro = models.TextField()
    professional_summary = models.TextField()
    development_journey = models.TextField(blank=True)
    mission = models.TextField(blank=True)
    strengths = models.JSONField(default=list, blank=True)
    highlights = models.JSONField(default=list, blank=True)
    years_of_experience = models.PositiveIntegerField(default=3)
    availability_text = models.CharField(max_length=120, default='Available for freelance and full-time roles')
    primary_email = models.EmailField()
    secondary_email = models.EmailField(blank=True)
    phone = models.CharField(max_length=50, blank=True)
    whatsapp_number = models.CharField(max_length=50, blank=True)
    location = models.CharField(max_length=120, blank=True)
    linkedin_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    website_url = models.URLField(blank=True)
    hero_badge = models.CharField(max_length=120, blank=True)
    profile_image = models.ImageField(upload_to='profile/', blank=True, null=True)
    profile_image_url = models.URLField(blank=True)
    profile_image_alt = models.CharField(max_length=160, blank=True)
    is_primary = models.BooleanField(default=True)

    class Meta:
        ordering = ('-is_primary', '-updated_at')

    def __str__(self) -> str:
        return self.full_name

    @property
    def profile_image_source(self) -> str:
        return build_media_url(self.profile_image, self.profile_image_url)


class SocialLink(OrderedActiveModel):
    platform = models.CharField(max_length=50)
    label = models.CharField(max_length=80)
    url = models.URLField()
    icon_name = models.CharField(max_length=50, blank=True)
    is_featured = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.label


class ResumeFile(TimestampedModel):
    title = models.CharField(max_length=120)
    description = models.CharField(max_length=220, blank=True)
    file = models.FileField(upload_to='resume/', blank=True, null=True)
    file_url = models.URLField(blank=True)
    is_primary = models.BooleanField(default=True)

    class Meta:
        ordering = ('-is_primary', '-updated_at')

    def __str__(self) -> str:
        return self.title

    @property
    def file_source(self) -> str:
        return build_media_url(self.file, self.file_url)

    @property
    def download_source(self) -> str:
        return build_media_url(self.file, self.file_url, download=True)


class SiteSetting(TimestampedModel):
    site_name = models.CharField(max_length=120, default='Developer Portfolio')
    site_title = models.CharField(max_length=180, default='Premium Full Stack Developer Portfolio')
    meta_description = models.TextField()
    meta_keywords = models.CharField(max_length=255, blank=True)
    footer_tagline = models.CharField(max_length=200, blank=True)
    contact_email = models.EmailField()
    contact_phone = models.CharField(max_length=50, blank=True)
    contact_location = models.CharField(max_length=120, blank=True)
    hire_me_email = models.EmailField(blank=True)
    whatsapp_url = models.URLField(blank=True)
    booking_url = models.URLField(blank=True)
    office_hours = models.CharField(max_length=120, blank=True)
    support_dark_mode = models.BooleanField(default=True)
    contact_cta_title = models.CharField(max_length=140, default='Let us build something worthwhile')
    contact_cta_text = models.TextField(blank=True)
    og_image = models.ImageField(upload_to='site/', blank=True, null=True)
    og_image_url = models.URLField(blank=True)

    class Meta:
        ordering = ('-updated_at',)

    def __str__(self) -> str:
        return self.site_name

    @property
    def og_image_source(self) -> str:
        return build_media_url(self.og_image, self.og_image_url)

# Create your models here.
