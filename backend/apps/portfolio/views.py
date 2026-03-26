from __future__ import annotations

from rest_framework import response, views

from .models import (
    Certificate,
    Education,
    Experience,
    GalleryImage,
    Project,
    Service,
    SkillCategory,
    Testimonial,
)
from .serializers import (
    CertificateSerializer,
    EducationSerializer,
    ExperienceSerializer,
    GalleryImageSerializer,
    ProjectSerializer,
    ServiceSerializer,
    SkillCategorySerializer,
    TestimonialSerializer,
)


class SkillCategoryListAPIView(views.APIView):
    def get(self, request):
        queryset = SkillCategory.objects.filter(is_active=True)
        return response.Response(SkillCategorySerializer(queryset, many=True).data)


class ServiceListAPIView(views.APIView):
    def get(self, request):
        queryset = Service.objects.filter(is_active=True)
        return response.Response(ServiceSerializer(queryset, many=True).data)


class ProjectListAPIView(views.APIView):
    def get(self, request):
        queryset = Project.objects.filter(is_active=True)
        category = request.query_params.get('category')
        featured = request.query_params.get('featured')

        if category:
            queryset = queryset.filter(category=category)
        if featured and featured.lower() in {'1', 'true', 'yes'}:
            queryset = queryset.filter(is_featured=True)

        return response.Response(ProjectSerializer(queryset, many=True).data)


class FeaturedProjectListAPIView(views.APIView):
    def get(self, request):
        queryset = Project.objects.filter(is_active=True, is_featured=True)
        return response.Response(ProjectSerializer(queryset, many=True).data)


class EducationListAPIView(views.APIView):
    def get(self, request):
        queryset = Education.objects.filter(is_active=True)
        return response.Response(EducationSerializer(queryset, many=True).data)


class ExperienceListAPIView(views.APIView):
    def get(self, request):
        queryset = Experience.objects.filter(is_active=True)
        return response.Response(ExperienceSerializer(queryset, many=True).data)


class CertificateListAPIView(views.APIView):
    def get(self, request):
        queryset = Certificate.objects.filter(is_active=True)
        return response.Response(CertificateSerializer(queryset, many=True).data)


class TestimonialListAPIView(views.APIView):
    def get(self, request):
        queryset = Testimonial.objects.filter(is_active=True)
        return response.Response(TestimonialSerializer(queryset, many=True).data)


class GalleryImageListAPIView(views.APIView):
    def get(self, request):
        queryset = GalleryImage.objects.filter(is_active=True)
        return response.Response(GalleryImageSerializer(queryset, many=True).data)

# Create your views here.
