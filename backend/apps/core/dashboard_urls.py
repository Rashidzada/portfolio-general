from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .dashboard_views import (
    CertificateViewSet,
    ContentSectionViewSet,
    ContactMessageViewSet,
    EducationViewSet,
    ExperienceViewSet,
    GalleryImageViewSet,
    ProfileViewSet,
    ProjectImageViewSet,
    ProjectViewSet,
    ResumeFileViewSet,
    ServiceViewSet,
    SiteSettingViewSet,
    SkillCategoryViewSet,
    SkillViewSet,
    SocialLinkViewSet,
    TestimonialViewSet,
)

router = DefaultRouter()
router.register('dashboard/profiles', ProfileViewSet, basename='dashboard-profiles')
router.register('dashboard/content-sections', ContentSectionViewSet, basename='dashboard-content-sections')
router.register('dashboard/site-settings', SiteSettingViewSet, basename='dashboard-site-settings')
router.register('dashboard/social-links', SocialLinkViewSet, basename='dashboard-social-links')
router.register('dashboard/resumes', ResumeFileViewSet, basename='dashboard-resumes')
router.register('dashboard/skill-categories', SkillCategoryViewSet, basename='dashboard-skill-categories')
router.register('dashboard/skills', SkillViewSet, basename='dashboard-skills')
router.register('dashboard/services', ServiceViewSet, basename='dashboard-services')
router.register('dashboard/projects', ProjectViewSet, basename='dashboard-projects')
router.register('dashboard/project-images', ProjectImageViewSet, basename='dashboard-project-images')
router.register('dashboard/education', EducationViewSet, basename='dashboard-education')
router.register('dashboard/experience', ExperienceViewSet, basename='dashboard-experience')
router.register('dashboard/certificates', CertificateViewSet, basename='dashboard-certificates')
router.register('dashboard/testimonials', TestimonialViewSet, basename='dashboard-testimonials')
router.register('dashboard/gallery-images', GalleryImageViewSet, basename='dashboard-gallery-images')
router.register('dashboard/contact-messages', ContactMessageViewSet, basename='dashboard-contact-messages')

urlpatterns = [
    path('', include(router.urls)),
]
