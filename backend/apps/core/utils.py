from __future__ import annotations

from urllib.parse import parse_qs, urlparse

from django.conf import settings
from django.db.models import FileField
from django.utils.text import slugify


def normalize_google_drive_url(url: str, download: bool = False) -> str:
    if not url:
        return url

    parsed = urlparse(url)
    if 'drive.google.com' not in parsed.netloc and 'docs.google.com' not in parsed.netloc:
        return url

    path_parts = [part for part in parsed.path.split('/') if part]
    file_id = None

    if 'd' in path_parts:
        marker_index = path_parts.index('d')
        if marker_index + 1 < len(path_parts):
            file_id = path_parts[marker_index + 1]

    if not file_id:
        query_id = parse_qs(parsed.query).get('id')
        if query_id:
            file_id = query_id[0]

    if not file_id:
        return url

    export = 'download' if download else 'view'
    return f'https://drive.google.com/uc?export={export}&id={file_id}'


def build_media_url(file_field: FileField | None, external_url: str | None, download: bool = False) -> str:
    if file_field:
        file_url = str(file_field.url)
        if file_url.startswith(('http://', 'https://')):
            return file_url
        return f"{settings.BACKEND_PUBLIC_URL}{file_url}"
    if external_url:
        normalized_url = normalize_google_drive_url(external_url, download=download)
        if normalized_url.startswith(('http://', 'https://')):
            return normalized_url
        if normalized_url.startswith('/'):
            return f"{settings.BACKEND_PUBLIC_URL}{normalized_url}"
        return normalized_url
    return ''


def unique_slug(instance, source_value: str, slug_field: str = 'slug') -> str:
    base_slug = slugify(source_value) or instance.__class__.__name__.lower()
    candidate = base_slug
    counter = 2
    model = instance.__class__

    while model.objects.filter(**{slug_field: candidate}).exclude(pk=instance.pk).exists():
        candidate = f'{base_slug}-{counter}'
        counter += 1

    return candidate
