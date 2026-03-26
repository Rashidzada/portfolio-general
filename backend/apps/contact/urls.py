from django.urls import path

from .views import ContactMessageCreateAPIView, DashboardMessageListAPIView

urlpatterns = [
    path('contact/', ContactMessageCreateAPIView.as_view(), name='contact-create'),
    path('dashboard/messages/', DashboardMessageListAPIView.as_view(), name='dashboard-message-list'),
]
