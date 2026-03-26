from __future__ import annotations

from rest_framework import serializers

from .models import ContactMessage


class ContactMessageSerializer(serializers.ModelSerializer):
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
            'created_at',
            'is_read',
            'is_replied',
        )
        read_only_fields = ('created_at', 'is_read', 'is_replied')
