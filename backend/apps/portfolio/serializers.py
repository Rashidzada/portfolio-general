from __future__ import annotations

from rest_framework import serializers

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


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = (
            'id',
            'category',
            'name',
            'proficiency',
            'short_label',
            'icon_name',
            'is_featured',
            'is_active',
            'sort_order',
            'created_at',
            'updated_at',
        )


class SkillCategorySerializer(serializers.ModelSerializer):
    skills = serializers.SerializerMethodField()

    class Meta:
        model = SkillCategory
        fields = (
            'id',
            'name',
            'slug',
            'description',
            'accent_color',
            'is_active',
            'sort_order',
            'skills',
            'created_at',
            'updated_at',
        )

    def get_skills(self, obj):
        return SkillSerializer(obj.skills.filter(is_active=True), many=True).data


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = (
            'id',
            'title',
            'slug',
            'short_description',
            'details',
            'icon_name',
            'highlight',
            'is_active',
            'sort_order',
            'created_at',
            'updated_at',
        )


class ProjectImageSerializer(serializers.ModelSerializer):
    image_source = serializers.ReadOnlyField()

    class Meta:
        model = ProjectImage
        fields = (
            'id',
            'project',
            'title',
            'image',
            'image_url',
            'image_source',
            'caption',
            'is_primary',
            'is_active',
            'sort_order',
            'created_at',
            'updated_at',
        )


class ProjectSerializer(serializers.ModelSerializer):
    thumbnail_source = serializers.ReadOnlyField()
    category_display = serializers.CharField(source='get_category_display', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    images = ProjectImageSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = (
            'id',
            'title',
            'slug',
            'summary',
            'description',
            'category',
            'category_display',
            'status',
            'status_display',
            'tech_stack',
            'features',
            'tags',
            'thumbnail',
            'thumbnail_url',
            'thumbnail_source',
            'live_url',
            'github_url',
            'case_study_url',
            'is_featured',
            'client_name',
            'duration_text',
            'is_active',
            'sort_order',
            'images',
            'created_at',
            'updated_at',
        )


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = (
            'id',
            'degree_title',
            'institute_name',
            'start_year',
            'end_year',
            'description',
            'grade',
            'location',
            'credential_url',
            'is_featured',
            'is_active',
            'sort_order',
            'created_at',
            'updated_at',
        )


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = (
            'id',
            'role',
            'organization',
            'start_date',
            'end_date',
            'is_current',
            'location',
            'employment_type',
            'summary',
            'responsibilities',
            'achievements',
            'is_featured',
            'is_active',
            'sort_order',
            'created_at',
            'updated_at',
        )


class CertificateSerializer(serializers.ModelSerializer):
    image_source = serializers.ReadOnlyField()
    pdf_source = serializers.ReadOnlyField()

    class Meta:
        model = Certificate
        fields = (
            'id',
            'title',
            'issuer',
            'issue_date',
            'description',
            'credential_id',
            'credential_url',
            'image',
            'image_url',
            'image_source',
            'pdf_file',
            'pdf_url',
            'pdf_source',
            'is_featured',
            'is_active',
            'sort_order',
            'created_at',
            'updated_at',
        )


class TestimonialSerializer(serializers.ModelSerializer):
    photo_source = serializers.ReadOnlyField()

    class Meta:
        model = Testimonial
        fields = (
            'id',
            'name',
            'role',
            'organization',
            'feedback',
            'photo',
            'photo_url',
            'photo_source',
            'rating',
            'is_featured',
            'is_active',
            'sort_order',
            'created_at',
            'updated_at',
        )


class GalleryImageSerializer(serializers.ModelSerializer):
    image_source = serializers.ReadOnlyField()

    class Meta:
        model = GalleryImage
        fields = (
            'id',
            'title',
            'category',
            'image',
            'image_url',
            'image_source',
            'alt_text',
            'caption',
            'is_featured',
            'is_active',
            'sort_order',
            'created_at',
            'updated_at',
        )
