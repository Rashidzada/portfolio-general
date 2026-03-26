from __future__ import annotations

from rest_framework import permissions, response, status, views

from .models import ContactMessage
from .serializers import ContactMessageSerializer
from apps.core.permissions import IsStaffUser


class ContactMessageCreateAPIView(views.APIView):
    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        contact_message = serializer.save(
            ip_address=request.META.get('REMOTE_ADDR'),
            user_agent=request.META.get('HTTP_USER_AGENT', ''),
        )
        return response.Response(
            ContactMessageSerializer(contact_message).data,
            status=status.HTTP_201_CREATED,
        )


class DashboardMessageListAPIView(views.APIView):
    permission_classes = (IsStaffUser,)

    def get(self, request):
        queryset = ContactMessage.objects.all()[:20]
        return response.Response(ContactMessageSerializer(queryset, many=True).data)

# Create your views here.
