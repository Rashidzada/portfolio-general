from django.urls import path

from .views import (
    CertificateListAPIView,
    EducationListAPIView,
    ExperienceListAPIView,
    FeaturedProjectListAPIView,
    GalleryImageListAPIView,
    ProjectListAPIView,
    ServiceListAPIView,
    SkillCategoryListAPIView,
    TestimonialListAPIView,
)

urlpatterns = [
    path('skills/', SkillCategoryListAPIView.as_view(), name='skill-category-list'),
    path('services/', ServiceListAPIView.as_view(), name='service-list'),
    path('projects/', ProjectListAPIView.as_view(), name='project-list'),
    path('projects/featured/', FeaturedProjectListAPIView.as_view(), name='featured-project-list'),
    path('education/', EducationListAPIView.as_view(), name='education-list'),
    path('experience/', ExperienceListAPIView.as_view(), name='experience-list'),
    path('certificates/', CertificateListAPIView.as_view(), name='certificate-list'),
    path('testimonials/', TestimonialListAPIView.as_view(), name='testimonial-list'),
    path('gallery/', GalleryImageListAPIView.as_view(), name='gallery-list'),
]
