from django.urls import include, path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import (
    AdminSessionBridgeAPIView,
    CurrentUserAPIView,
    DashboardOverviewAPIView,
    HealthCheckAPIView,
    LandingPageAPIView,
    ProfileDetailAPIView,
    ResumeDetailAPIView,
    SiteSettingDetailAPIView,
    SocialLinkListAPIView,
)

urlpatterns = [
    path('', include('apps.core.dashboard_urls')),
    path('health/', HealthCheckAPIView.as_view(), name='health-check'),
    path('profile/', ProfileDetailAPIView.as_view(), name='profile-detail'),
    path('social-links/', SocialLinkListAPIView.as_view(), name='social-link-list'),
    path('site-settings/', SiteSettingDetailAPIView.as_view(), name='site-setting-detail'),
    path('resume/', ResumeDetailAPIView.as_view(), name='resume-detail'),
    path('landing/', LandingPageAPIView.as_view(), name='landing-page'),
    path('auth/token/', TokenObtainPairView.as_view(), name='token-obtain-pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    path('auth/me/', CurrentUserAPIView.as_view(), name='current-user'),
    path('auth/admin-session/', AdminSessionBridgeAPIView.as_view(), name='admin-session-bridge'),
    path('dashboard/overview/', DashboardOverviewAPIView.as_view(), name='dashboard-overview'),
]
