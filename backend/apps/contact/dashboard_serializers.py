from rest_framework import serializers

from .models import ContactMessage


class DashboardContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = (
            'id',
            'name',
            'email',
            'phone',
            'subject',
            'service_interest',
            'budget_range',
            'message',
            'source_page',
            'ip_address',
            'user_agent',
            'created_at',
            'updated_at',
            'is_read',
            'is_replied',
        )
        read_only_fields = ('ip_address', 'user_agent', 'created_at', 'updated_at')
