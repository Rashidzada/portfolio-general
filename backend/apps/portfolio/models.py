from __future__ import annotations

from django.db import models

from apps.core.models import OrderedActiveModel, TimestampedModel
from apps.core.utils import build_media_url, unique_slug


class SkillCategory(OrderedActiveModel):
    name = models.CharField(max_length=80)
    slug = models.SlugField(max_length=100, unique=True, blank=True)
    description = models.TextField(blank=True)
    accent_color = models.CharField(max_length=20, default='#C48A3A')

    def __str__(self) -> str:
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = unique_slug(self, self.name)
        super().save(*args, **kwargs)


class Skill(OrderedActiveModel):
    category = models.ForeignKey(SkillCategory, on_delete=models.CASCADE, related_name='skills')
    name = models.CharField(max_length=80)
    proficiency = models.PositiveIntegerField(default=80)
    short_label = models.CharField(max_length=80, blank=True)
    icon_name = models.CharField(max_length=50, blank=True)
    is_featured = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.name


class Service(OrderedActiveModel):
    title = models.CharField(max_length=120)
    slug = models.SlugField(max_length=140, unique=True, blank=True)
    short_description = models.CharField(max_length=220)
    details = models.TextField(blank=True)
    icon_name = models.CharField(max_length=50, blank=True)
    highlight = models.CharField(max_length=120, blank=True)

    def __str__(self) -> str:
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = unique_slug(self, self.title)
        super().save(*args, **kwargs)


class Project(OrderedActiveModel):
    class Category(models.TextChoices):
        WEB_APPS = 'web-apps', 'Web Apps'
        SCHOOL_SYSTEMS = 'school-systems', 'School Systems'
        PHARMACY_SYSTEMS = 'pharmacy-systems', 'Pharmacy Systems'
        BLOG_PLATFORMS = 'blog-platforms', 'Blog Platforms'
        AI_TOOLS = 'ai-tools', 'AI Tools'
        PORTFOLIO_BUSINESS_SYSTEMS = 'portfolio-business-systems', 'Portfolio / Business Systems'

    class Status(models.TextChoices):
        COMPLETED = 'completed', 'Completed'
        ONGOING = 'ongoing', 'Ongoing'
        MVP = 'mvp', 'MVP'

    title = models.CharField(max_length=160)
    slug = models.SlugField(max_length=180, unique=True, blank=True)
    summary = models.CharField(max_length=240)
    description = models.TextField()
    category = models.CharField(max_length=40, choices=Category.choices)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.COMPLETED)
    tech_stack = models.JSONField(default=list, blank=True)
    features = models.JSONField(default=list, blank=True)
    tags = models.JSONField(default=list, blank=True)
    thumbnail = models.ImageField(upload_to='projects/', blank=True, null=True)
    thumbnail_url = models.URLField(blank=True)
    live_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    case_study_url = models.URLField(blank=True)
    is_featured = models.BooleanField(default=False)
    client_name = models.CharField(max_length=120, blank=True)
    duration_text = models.CharField(max_length=120, blank=True)

    class Meta:
        ordering = ('sort_order', 'id')

    def __str__(self) -> str:
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = unique_slug(self, self.title)
        super().save(*args, **kwargs)

    @property
    def thumbnail_source(self) -> str:
        return build_media_url(self.thumbnail, self.thumbnail_url)


class ProjectImage(OrderedActiveModel):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='images')
    title = models.CharField(max_length=120, blank=True)
    image = models.ImageField(upload_to='projects/gallery/', blank=True, null=True)
    image_url = models.URLField(blank=True)
    caption = models.CharField(max_length=200, blank=True)
    is_primary = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.title or f'{self.project.title} image'

    @property
    def image_source(self) -> str:
        return build_media_url(self.image, self.image_url)


class Education(OrderedActiveModel):
    degree_title = models.CharField(max_length=160)
    institute_name = models.CharField(max_length=160)
    start_year = models.PositiveIntegerField()
    end_year = models.PositiveIntegerField(null=True, blank=True)
    description = models.TextField(blank=True)
    grade = models.CharField(max_length=80, blank=True)
    location = models.CharField(max_length=120, blank=True)
    credential_url = models.URLField(blank=True)
    is_featured = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f'{self.degree_title} - {self.institute_name}'


class Experience(OrderedActiveModel):
    role = models.CharField(max_length=160)
    organization = models.CharField(max_length=160)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    is_current = models.BooleanField(default=False)
    location = models.CharField(max_length=120, blank=True)
    employment_type = models.CharField(max_length=80, blank=True)
    summary = models.TextField(blank=True)
    responsibilities = models.JSONField(default=list, blank=True)
    achievements = models.JSONField(default=list, blank=True)
    is_featured = models.BooleanField(default=False)

    class Meta:
        ordering = ('sort_order', '-start_date', 'id')

    def __str__(self) -> str:
        return f'{self.role} - {self.organization}'


class Certificate(OrderedActiveModel):
    title = models.CharField(max_length=160)
    issuer = models.CharField(max_length=160)
    issue_date = models.DateField()
    description = models.TextField(blank=True)
    credential_id = models.CharField(max_length=120, blank=True)
    credential_url = models.URLField(blank=True)
    image = models.ImageField(upload_to='certificates/', blank=True, null=True)
    image_url = models.URLField(blank=True)
    pdf_file = models.FileField(upload_to='certificates/pdf/', blank=True, null=True)
    pdf_url = models.URLField(blank=True)
    is_featured = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.title

    @property
    def image_source(self) -> str:
        return build_media_url(self.image, self.image_url)

    @property
    def pdf_source(self) -> str:
        return build_media_url(self.pdf_file, self.pdf_url, download=True)


class Testimonial(OrderedActiveModel):
    name = models.CharField(max_length=120)
    role = models.CharField(max_length=120)
    organization = models.CharField(max_length=120, blank=True)
    feedback = models.TextField()
    photo = models.ImageField(upload_to='testimonials/', blank=True, null=True)
    photo_url = models.URLField(blank=True)
    rating = models.PositiveIntegerField(default=5)
    is_featured = models.BooleanField(default=True)

    def __str__(self) -> str:
        return self.name

    @property
    def photo_source(self) -> str:
        return build_media_url(self.photo, self.photo_url)


class GalleryImage(OrderedActiveModel):
    title = models.CharField(max_length=160)
    category = models.CharField(max_length=80, blank=True)
    image = models.ImageField(upload_to='gallery/', blank=True, null=True)
    image_url = models.URLField(blank=True)
    alt_text = models.CharField(max_length=160, blank=True)
    caption = models.CharField(max_length=220, blank=True)
    is_featured = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.title

    @property
    def image_source(self) -> str:
        return build_media_url(self.image, self.image_url)

# Create your models here.
