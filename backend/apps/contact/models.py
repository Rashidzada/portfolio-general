from __future__ import annotations

from django.db import models

from apps.core.models import TimestampedModel


class ContactMessage(TimestampedModel):
    name = models.CharField(max_length=120)
    email = models.EmailField()
    phone = models.CharField(max_length=50, blank=True)
    subject = models.CharField(max_length=160)
    service_interest = models.CharField(max_length=120, blank=True)
    budget_range = models.CharField(max_length=80, blank=True)
    message = models.TextField()
    source_page = models.CharField(max_length=120, blank=True)
    ip_address = models.GenericIPAddressField(blank=True, null=True)
    user_agent = models.TextField(blank=True)
    is_read = models.BooleanField(default=False)
    is_replied = models.BooleanField(default=False)

    class Meta:
        ordering = ('-created_at',)

    def __str__(self) -> str:
        return f'{self.name} - {self.subject}'

# Create your models here.
