from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ContentSection',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('sort_order', models.PositiveIntegerField(default=0)),
                ('is_active', models.BooleanField(default=True)),
                ('key', models.SlugField(max_length=80, unique=True)),
                ('label', models.CharField(max_length=120)),
                ('eyebrow', models.CharField(blank=True, max_length=120)),
                ('title', models.CharField(blank=True, max_length=220)),
                ('description', models.TextField(blank=True)),
                ('extra_text', models.TextField(blank=True)),
                ('items', models.JSONField(blank=True, default=list)),
            ],
            options={
                'ordering': ('sort_order', 'id'),
            },
        ),
    ]
