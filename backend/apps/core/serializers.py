from __future__ import annotations

from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import ContentSection, Profile, ResumeFile, SiteSetting, SocialLink


class ContentSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContentSection
        fields = (
            'id',
            'key',
            'label',
            'eyebrow',
            'title',
            'description',
            'extra_text',
            'items',
            'is_active',
            'sort_order',
            'created_at',
            'updated_at',
        )


class ProfileSerializer(serializers.ModelSerializer):
    profile_image_source = serializers.ReadOnlyField()

    class Meta:
        model = Profile
        fields = (
            'id',
            'full_name',
            'headline',
            'subheadline',
            'hero_intro',
            'professional_summary',
            'development_journey',
            'mission',
            'strengths',
            'highlights',
            'years_of_experience',
            'availability_text',
            'primary_email',
            'secondary_email',
            'phone',
            'whatsapp_number',
            'location',
            'linkedin_url',
            'github_url',
            'website_url',
            'hero_badge',
            'profile_image',
            'profile_image_url',
            'profile_image_source',
            'profile_image_alt',
            'is_primary',
            'created_at',
            'updated_at',
        )


class SocialLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialLink
        fields = (
            'id',
            'platform',
            'label',
            'url',
            'icon_name',
            'is_featured',
            'is_active',
            'sort_order',
            'created_at',
            'updated_at',
        )


class ResumeFileSerializer(serializers.ModelSerializer):
    file_source = serializers.ReadOnlyField()
    download_source = serializers.ReadOnlyField()

    class Meta:
        model = ResumeFile
        fields = (
            'id',
            'title',
            'description',
            'file',
            'file_url',
            'file_source',
            'download_source',
            'is_primary',
            'created_at',
            'updated_at',
        )


class SiteSettingSerializer(serializers.ModelSerializer):
    og_image_source = serializers.ReadOnlyField()

    class Meta:
        model = SiteSetting
        fields = (
            'id',
            'site_name',
            'site_title',
            'meta_description',
            'meta_keywords',
            'footer_tagline',
            'contact_email',
            'contact_phone',
            'contact_location',
            'hire_me_email',
            'whatsapp_url',
            'booking_url',
            'office_hours',
            'support_dark_mode',
            'contact_cta_title',
            'contact_cta_text',
            'og_image',
            'og_image_url',
            'og_image_source',
            'created_at',
            'updated_at',
        )


class CurrentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id', 'username', 'email', 'is_staff', 'is_superuser')
