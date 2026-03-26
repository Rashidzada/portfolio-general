from __future__ import annotations

from django.conf import settings
from django.contrib.auth import login
from django.contrib.auth import get_user_model
from rest_framework import permissions, response, views

from apps.contact.models import ContactMessage
from apps.contact.serializers import ContactMessageSerializer
from apps.portfolio.models import (
    Certificate,
    Education,
    Experience,
    GalleryImage,
    Project,
    Service,
    Skill,
    SkillCategory,
    Testimonial,
)
from apps.portfolio.serializers import (
    CertificateSerializer,
    EducationSerializer,
    ExperienceSerializer,
    GalleryImageSerializer,
    ProjectSerializer,
    ServiceSerializer,
    SkillCategorySerializer,
    TestimonialSerializer,
)

from .models import ContentSection, Profile, ResumeFile, SiteSetting, SocialLink
from .permissions import IsStaffUser
from .serializers import (
    ContentSectionSerializer,
    CurrentUserSerializer,
    ProfileSerializer,
    ResumeFileSerializer,
    SiteSettingSerializer,
    SocialLinkSerializer,
)


class ProfileDetailAPIView(views.APIView):
    def get(self, request):
        profile = Profile.objects.filter(is_primary=True).first() or Profile.objects.first()
        return response.Response(ProfileSerializer(profile).data if profile else None)


class SocialLinkListAPIView(views.APIView):
    def get(self, request):
        queryset = SocialLink.objects.filter(is_active=True)
        return response.Response(SocialLinkSerializer(queryset, many=True).data)


class SiteSettingDetailAPIView(views.APIView):
    def get(self, request):
        setting = SiteSetting.objects.first()
        return response.Response(SiteSettingSerializer(setting).data if setting else None)


class ResumeDetailAPIView(views.APIView):
    def get(self, request):
        resume = ResumeFile.objects.filter(is_primary=True).first() or ResumeFile.objects.first()
        return response.Response(ResumeFileSerializer(resume).data if resume else None)


class LandingPageAPIView(views.APIView):
    def get(self, request):
        profile = Profile.objects.filter(is_primary=True).first() or Profile.objects.first()
        site_setting = SiteSetting.objects.first()
        resume = ResumeFile.objects.filter(is_primary=True).first() or ResumeFile.objects.first()

        payload = {
            'profile': ProfileSerializer(profile).data if profile else None,
            'site_settings': SiteSettingSerializer(site_setting).data if site_setting else None,
            'content_sections': ContentSectionSerializer(
                ContentSection.objects.filter(is_active=True),
                many=True,
            ).data,
            'social_links': SocialLinkSerializer(SocialLink.objects.filter(is_active=True), many=True).data,
            'skills': SkillCategorySerializer(SkillCategory.objects.filter(is_active=True), many=True).data,
            'services': ServiceSerializer(Service.objects.filter(is_active=True), many=True).data,
            'projects': ProjectSerializer(Project.objects.filter(is_active=True), many=True).data,
            'featured_projects': ProjectSerializer(
                Project.objects.filter(is_active=True, is_featured=True),
                many=True,
            ).data,
            'education': EducationSerializer(Education.objects.filter(is_active=True), many=True).data,
            'experience': ExperienceSerializer(Experience.objects.filter(is_active=True), many=True).data,
            'certificates': CertificateSerializer(Certificate.objects.filter(is_active=True), many=True).data,
            'testimonials': TestimonialSerializer(Testimonial.objects.filter(is_active=True), many=True).data,
            'gallery': GalleryImageSerializer(GalleryImage.objects.filter(is_active=True), many=True).data,
            'resume': ResumeFileSerializer(resume).data if resume else None,
        }
        return response.Response(payload)


class CurrentUserAPIView(views.APIView):
    permission_classes = (IsStaffUser,)

    def get(self, request):
        return response.Response(CurrentUserSerializer(request.user).data)


class AdminSessionBridgeAPIView(views.APIView):
    permission_classes = (IsStaffUser,)

    def post(self, request):
        backend = getattr(
            request.user,
            'backend',
            settings.AUTHENTICATION_BACKENDS[0],
        )
        login(request, request.user, backend=backend)
        return response.Response({'admin_url': '/admin/'})


class DashboardOverviewAPIView(views.APIView):
    permission_classes = (IsStaffUser,)

    def get(self, request):
        User = get_user_model()
        recent_messages = ContactMessage.objects.order_by('-created_at')[:6]
        payload = {
            'counts': {
                'projects': Project.objects.count(),
                'skills': Skill.objects.count(),
                'experience': Experience.objects.count(),
                'education': Education.objects.count(),
                'certificates': Certificate.objects.count(),
                'services': Service.objects.count(),
                'testimonials': Testimonial.objects.count(),
                'gallery': GalleryImage.objects.count(),
                'content_sections': ContentSection.objects.count(),
                'messages': ContactMessage.objects.count(),
                'admins': User.objects.filter(is_staff=True).count(),
            },
            'profile': ProfileSerializer(Profile.objects.filter(is_primary=True).first() or Profile.objects.first()).data
            if Profile.objects.exists()
            else None,
            'recent_messages': ContactMessageSerializer(recent_messages, many=True).data,
            'admin_url': '/admin/',
        }
        return response.Response(payload)


class HealthCheckAPIView(views.APIView):
    def get(self, request):
        return response.Response({'status': 'ok'})
