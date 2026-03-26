from rest_framework import parsers, viewsets

from apps.contact.dashboard_serializers import DashboardContactMessageSerializer
from apps.contact.models import ContactMessage
from apps.core.models import ContentSection, Profile, ResumeFile, SiteSetting, SocialLink
from apps.portfolio.models import (
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
from apps.portfolio.serializers import (
    CertificateSerializer,
    EducationSerializer,
    ExperienceSerializer,
    GalleryImageSerializer,
    ProjectImageSerializer,
    ProjectSerializer,
    ServiceSerializer,
    SkillCategorySerializer,
    SkillSerializer,
    TestimonialSerializer,
)

from .permissions import IsStaffUser
from .serializers import (
    ContentSectionSerializer,
    ProfileSerializer,
    ResumeFileSerializer,
    SiteSettingSerializer,
    SocialLinkSerializer,
)


class DashboardModelViewSet(viewsets.ModelViewSet):
    permission_classes = (IsStaffUser,)
    parser_classes = (
        parsers.JSONParser,
        parsers.FormParser,
        parsers.MultiPartParser,
    )


class ProfileViewSet(DashboardModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class ContentSectionViewSet(DashboardModelViewSet):
    queryset = ContentSection.objects.all()
    serializer_class = ContentSectionSerializer


class SiteSettingViewSet(DashboardModelViewSet):
    queryset = SiteSetting.objects.all()
    serializer_class = SiteSettingSerializer


class SocialLinkViewSet(DashboardModelViewSet):
    queryset = SocialLink.objects.all()
    serializer_class = SocialLinkSerializer


class ResumeFileViewSet(DashboardModelViewSet):
    queryset = ResumeFile.objects.all()
    serializer_class = ResumeFileSerializer


class SkillCategoryViewSet(DashboardModelViewSet):
    queryset = SkillCategory.objects.all()
    serializer_class = SkillCategorySerializer


class SkillViewSet(DashboardModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer


class ServiceViewSet(DashboardModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer


class ProjectViewSet(DashboardModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class ProjectImageViewSet(DashboardModelViewSet):
    queryset = ProjectImage.objects.all()
    serializer_class = ProjectImageSerializer


class EducationViewSet(DashboardModelViewSet):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer


class ExperienceViewSet(DashboardModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer


class CertificateViewSet(DashboardModelViewSet):
    queryset = Certificate.objects.all()
    serializer_class = CertificateSerializer


class TestimonialViewSet(DashboardModelViewSet):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer


class GalleryImageViewSet(DashboardModelViewSet):
    queryset = GalleryImage.objects.all()
    serializer_class = GalleryImageSerializer


class ContactMessageViewSet(DashboardModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = DashboardContactMessageSerializer
