from __future__ import annotations

from datetime import date

from django.core.management.base import BaseCommand

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


class Command(BaseCommand):
    help = 'Seed the portfolio with realistic demo content.'

    def add_arguments(self, parser):
        parser.add_argument(
            '--reset',
            action='store_true',
            help='Clear existing portfolio seed content before creating fresh demo data.',
        )

    def reset_seed_data(self):
        ProjectImage.objects.all().delete()
        Project.objects.all().delete()
        Service.objects.all().delete()
        Skill.objects.all().delete()
        SkillCategory.objects.all().delete()
        Education.objects.all().delete()
        Experience.objects.all().delete()
        Certificate.objects.all().delete()
        Testimonial.objects.all().delete()
        GalleryImage.objects.all().delete()
        SocialLink.objects.all().delete()
        ResumeFile.objects.all().delete()
        SiteSetting.objects.all().delete()
        ContentSection.objects.all().delete()
        Profile.objects.all().delete()
        ContactMessage.objects.all().delete()

    def handle(self, *args, **options):
        if options.get('reset'):
            self.reset_seed_data()

        profile, _ = Profile.objects.update_or_create(
            is_primary=True,
            defaults={
                'full_name': 'Aleeza Ishfaq',
                'headline': 'Full Stack Developer | MERN Stack | Django | AI Enthusiast',
                'subheadline': 'Building scalable web systems, e-commerce platforms, and AI-integrated solutions.',
                'hero_intro': (
                    'Results-driven full stack developer with strong expertise in MERN Stack, Django, and AI-based '
                    'applications. I focus on building scalable products that solve real-world problems with clean engineering and polished execution.'
                ),
                'professional_summary': (
                    'Results-driven Full Stack Developer with strong expertise in MERN Stack, Django, and AI-based '
                    'applications. Experienced in building scalable web systems, e-commerce platforms, and AI-integrated solutions. '
                    'Passionate about developing high-quality software and solving real-world problems.'
                ),
                'development_journey': (
                    'My development journey grew through university technical assignments, practical labs, internship work, '
                    'and hands-on project building. Along the way I developed e-commerce platforms, medical systems, corporate websites, '
                    'and AI-driven applications while strengthening both backend logic and frontend experience.'
                ),
                'mission': (
                    'My mission is to build practical, scalable, and intelligent software products that create real value for users and businesses.'
                ),
                'strengths': [
                    'Strong problem-solving ability',
                    'Full-stack development expertise across MERN and Django',
                    'Fast learner and adaptable with modern tools and AI workflows',
                    'Built AI-based and real-world applications during studies and internship work',
                ],
                'highlights': [
                    {'label': 'Graduation', 'value': '2025'},
                    {'label': 'CGPA', 'value': '3.54'},
                    {'label': 'Focus', 'value': 'AI + Web'},
                ],
                'years_of_experience': 2,
                'availability_text': 'Open to junior roles, internships, freelance projects, and collaborative opportunities',
                'primary_email': 'alizyishfaq7@gmail.com',
                'secondary_email': '',
                'phone': '0331-5402780',
                'whatsapp_number': '+923315402780',
                'location': 'Sargodha, Pakistan',
                'linkedin_url': '',
                'github_url': 'https://github.com/alizy55/',
                'website_url': '',
                'hero_badge': 'MERN, Django, and AI projects built with real-world focus',
                'profile_image_url': (
                    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80'
                ),
                'profile_image_alt': 'Aleeza Ishfaq professional portrait placeholder',
            },
        )

        SiteSetting.objects.update_or_create(
            site_name='Aleeza Ishfaq Portfolio',
            defaults={
                'site_title': 'Aleeza Ishfaq | Full Stack Developer',
                'meta_description': (
                    'Portfolio of Aleeza Ishfaq, a full stack developer skilled in MERN Stack, Django, '
                    'AI-based applications, e-commerce systems, and scalable web solutions.'
                ),
                'meta_keywords': 'full stack developer, mern stack, django, ai enthusiast, react, pakistan',
                'footer_tagline': 'Building practical web products with MERN, Django, and AI.',
                'contact_email': 'alizyishfaq7@gmail.com',
                'contact_phone': '0331-5402780',
                'contact_location': 'Sargodha, Pakistan',
                'hire_me_email': 'alizyishfaq7@gmail.com',
                'whatsapp_url': 'https://wa.me/923315402780',
                'booking_url': '',
                'office_hours': 'Available for interviews, freelance work, and project discussions',
                'support_dark_mode': True,
                'contact_cta_title': 'Need a modern web product or AI-assisted solution?',
                'contact_cta_text': (
                    'I build scalable MERN and Django applications, e-commerce platforms, business websites, and AI-integrated solutions.'
                ),
                'og_image_url': (
                    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80'
                ),
            },
        )

        section_defaults = [
            {
                'key': 'hero',
                'label': 'Hero Section',
                'eyebrow': 'Featured Roles',
                'title': '',
                'description': '',
                'extra_text': '',
                'items': [
                    'Full Stack Developer',
                    'MERN Stack Builder',
                    'Django and AI Enthusiast',
                ],
                'sort_order': 1,
            },
            {
                'key': 'about',
                'label': 'About Section',
                'eyebrow': 'About Me',
                'title': 'A developer who cares about systems, clarity, and long-term value.',
                'description': (
                    'This portfolio is designed to present a serious engineer who can plan architecture, build the product, '
                    'and communicate the work with confidence.'
                ),
                'extra_text': '',
                'items': [
                    'Full Stack Developer',
                    'MERN Developer',
                    'Django Developer',
                    'AI Enthusiast',
                    'React Builder',
                    'Problem Solver',
                ],
                'sort_order': 2,
            },
            {
                'key': 'skills',
                'label': 'Skills Section',
                'eyebrow': 'Skills',
                'title': 'Technical breadth organised like a real engineering profile.',
                'description': 'Backend, frontend, data, tooling, and system-level knowledge are grouped in a way recruiters and clients can scan quickly.',
                'extra_text': '',
                'items': [],
                'sort_order': 3,
            },
            {
                'key': 'services',
                'label': 'Services Section',
                'eyebrow': 'Services',
                'title': 'Professional services positioned for clients, institutions, and founders.',
                'description': 'These offerings are written to support both freelance outreach and full-time positioning.',
                'extra_text': '',
                'items': [],
                'sort_order': 4,
            },
            {
                'key': 'projects',
                'label': 'Projects Section',
                'eyebrow': 'Projects',
                'title': 'Real portfolio work shown as premium case-style project cards.',
                'description': 'Projects are grouped by category and presented with enough context to look credible to clients, recruiters, and institutions.',
                'extra_text': '',
                'items': [],
                'sort_order': 5,
            },
            {
                'key': 'experience',
                'label': 'Experience and Education Section',
                'eyebrow': 'Experience and Education',
                'title': 'Professional credibility for employers, clients, and academic institutions.',
                'description': 'This combines teaching, real-world development work, degrees, and training in one strong timeline-driven section.',
                'extra_text': '',
                'items': [],
                'sort_order': 6,
            },
            {
                'key': 'certificates',
                'label': 'Achievements Section',
                'eyebrow': 'Achievements',
                'title': 'Achievements, academic milestones, and growth indicators shown in a clean premium format.',
                'description': 'These cards highlight academic progress, project outcomes, and practical work that strengthen the overall portfolio story.',
                'extra_text': '',
                'items': [],
                'sort_order': 7,
            },
            {
                'key': 'testimonials',
                'label': 'Testimonials Section',
                'eyebrow': 'Testimonials',
                'title': 'Feedback that strengthens trust and signals delivery quality.',
                'description': 'This section supports client, student, and institutional testimonials without looking like a cheap template block.',
                'extra_text': '',
                'items': [],
                'sort_order': 8,
            },
            {
                'key': 'gallery',
                'label': 'Gallery Section',
                'eyebrow': 'Gallery',
                'title': 'An elegant visual layer for project, certificate, and teaching imagery.',
                'description': 'The gallery supports uploaded images or external sources without turning the site into a cluttered image dump.',
                'extra_text': '',
                'items': [],
                'sort_order': 9,
            },
            {
                'key': 'contact',
                'label': 'Contact Section',
                'eyebrow': 'Contact',
                'title': 'Need a modern web product or AI-assisted solution?',
                'description': 'I build scalable MERN and Django applications, e-commerce platforms, business websites, and AI-integrated solutions.',
                'extra_text': 'The contact form stores submissions in the backend and works alongside direct email, phone, and WhatsApp links.',
                'items': [
                    '$500 - $1,000',
                    '$1,000 - $3,000',
                    '$3,000 - $5,000',
                    '$5,000+',
                ],
                'sort_order': 10,
            },
        ]
        for section_data in section_defaults:
            ContentSection.objects.update_or_create(
                key=section_data['key'],
                defaults={**section_data, 'is_active': True},
            )

        ResumeFile.objects.update_or_create(
            is_primary=True,
            defaults={
                'title': 'Aleeza Ishfaq CV',
                'description': 'Upload the latest PDF CV from admin to activate the live download button.',
                'file_url': '',
            },
        )

        social_links = [
            ('GitHub', 'GitHub', 'https://github.com/alizy55/', 'github', True, 1),
            ('WhatsApp', 'WhatsApp', 'https://wa.me/923315402780', 'message-circle', True, 2),
            ('Email', 'Email', 'https://mail.google.com/mail/?view=cm&to=alizyishfaq7@gmail.com', 'mail', True, 3),
        ]
        for platform, label, url, icon_name, is_featured, sort_order in social_links:
            SocialLink.objects.update_or_create(
                label=label,
                defaults={
                    'platform': platform,
                    'url': url,
                    'icon_name': icon_name,
                    'is_featured': is_featured,
                    'sort_order': sort_order,
                    'is_active': True,
                },
            )

        skill_map = {
            'Backend': [
                ('Node.js', 86, 'server'),
                ('Express.js', 84, 'server'),
                ('Django', 90, 'server'),
                ('Django REST Framework', 88, 'database-zap'),
                ('FastAPI', 78, 'bolt'),
            ],
            'Frontend': [
                ('React.js', 90, 'monitor'),
                ('Next.js', 80, 'monitor'),
                ('HTML', 96, 'code-2'),
                ('CSS', 92, 'palette'),
                ('JavaScript', 92, 'file-code'),
                ('Redux', 78, 'workflow'),
                ('Responsive Design', 90, 'smartphone'),
            ],
            'Databases': [
                ('MongoDB', 86, 'database'),
                ('MySQL', 82, 'database'),
                ('SQLite', 88, 'database'),
                ('Mongoose', 84, 'database'),
                ('Django ORM', 88, 'database'),
                ('TypeORM', 74, 'database'),
            ],
            'AI & Tools': [
                ('TensorFlow', 72, 'brain'),
                ('PyTorch', 70, 'brain'),
                ('Hugging Face', 74, 'sparkles'),
                ('ChatGPT', 90, 'message-square'),
                ('Cursor AI', 86, 'sparkles'),
                ('Git', 90, 'git-branch'),
                ('GitHub', 90, 'github'),
                ('Postman', 88, 'send'),
            ],
            'Deployment': [
                ('Vercel', 86, 'rocket'),
                ('Render', 80, 'rocket'),
            ],
            'Languages': [
                ('English', 88, 'languages'),
                ('Urdu', 100, 'languages'),
            ],
            'Development Tools': [
                ('VS Code', 92, 'square-terminal'),
                ('REST APIs', 90, 'network'),
            ],
        }

        for order, (category_name, skills) in enumerate(skill_map.items(), start=1):
            category, _ = SkillCategory.objects.update_or_create(
                name=category_name,
                defaults={
                    'description': f"{category_name} capabilities used across Aleeza Ishfaq's projects and hands-on work.",
                    'sort_order': order,
                    'is_active': True,
                },
            )
            for skill_order, (skill_name, proficiency, icon_name) in enumerate(skills, start=1):
                Skill.objects.update_or_create(
                    category=category,
                    name=skill_name,
                    defaults={
                        'proficiency': proficiency,
                        'short_label': skill_name,
                        'icon_name': icon_name,
                        'is_featured': skill_order <= 2,
                        'sort_order': skill_order,
                        'is_active': True,
                    },
                )

        services = [
            ('Full Stack Web Development', 'Complete web applications from database and APIs to responsive user interfaces.', 'layout-dashboard'),
            ('MERN Stack Development', 'Scalable MongoDB, Express, React, and Node.js applications for modern products.', 'monitor-smartphone'),
            ('Django Backend and REST APIs', 'Structured backend systems with Django, DRF, and clean API design.', 'server-cog'),
            ('AI-Integrated Web Applications', 'Smart applications enhanced with chatbot flows, AI APIs, and intelligent features.', 'workflow'),
            ('E-commerce Platform Development', 'Online stores with authentication, product flows, cart handling, and payments.', 'presentation'),
            ('Business and Portfolio Websites', 'Professional websites for companies, startups, and personal branding.', 'graduation-cap'),
        ]
        for order, (title, summary, icon) in enumerate(services, start=1):
            Service.objects.update_or_create(
                title=title,
                defaults={
                    'short_description': summary,
                    'details': summary,
                    'icon_name': icon,
                    'highlight': 'Most Requested' if order == 1 else '',
                    'sort_order': order,
                    'is_active': True,
                },
            )

        projects = [
            {
                'title': 'Glow Guide',
                'category': Project.Category.AI_TOOLS,
                'status': Project.Status.COMPLETED,
                'summary': 'AI-powered skincare platform with chatbot-based consultation and disease-aware guidance.',
                'description': (
                    'Developed an AI-based skincare platform with an intelligent chatbot for skin disease consultation. '
                    'The project combines a conversational experience with disease detection ideas and AI-generated guidance.'
                ),
                'tech_stack': ['Python', 'Django', 'Gemini API', 'HTML', 'CSS', 'JavaScript'],
                'features': ['AI chatbot consultation', 'Gemini API integration', 'Disease detection concept', 'Responsive skincare guidance flow'],
                'tags': ['ai', 'health', 'chatbot'],
                'thumbnail_url': 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80',
                'live_url': '',
                'github_url': 'https://github.com/alizy55/',
                'is_featured': True,
                'sort_order': 1,
            },
            {
                'title': 'E-commerce Website (Django)',
                'category': Project.Category.WEB_APPS,
                'status': Project.Status.COMPLETED,
                'summary': 'A Django-based e-commerce system with cart flow, authentication, and store management.',
                'description': (
                    'Built as a complete online store experience using Django, covering user authentication, '
                    'cart workflows, and structured e-commerce functionality.'
                ),
                'tech_stack': ['Django', 'Python', 'HTML', 'CSS', 'JavaScript', 'SQLite'],
                'features': ['Authentication', 'Cart management', 'Product display', 'Order flow'],
                'tags': ['e-commerce', 'django', 'web-app'],
                'thumbnail_url': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80',
                'live_url': '',
                'github_url': 'https://github.com/alizy55/',
                'is_featured': True,
                'sort_order': 2,
            },
            {
                'title': 'E-commerce Platform (MERN)',
                'category': Project.Category.WEB_APPS,
                'status': Project.Status.COMPLETED,
                'summary': 'A scalable MERN e-commerce platform built for real-world product and payment flows.',
                'description': (
                    'Developed a full-stack e-commerce platform using the MERN stack with scalable structure, '
                    'responsive design, and business-focused product workflows.'
                ),
                'tech_stack': ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
                'features': ['Scalable architecture', 'Product and cart flow', 'Responsive UI', 'Payment-ready structure'],
                'tags': ['mern', 'e-commerce', 'full-stack'],
                'thumbnail_url': 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=1200&q=80',
                'live_url': '',
                'github_url': 'https://github.com/alizy55/',
                'is_featured': True,
                'sort_order': 3,
            },
            {
                'title': 'Online Medical Store (MERN)',
                'category': Project.Category.PHARMACY_SYSTEMS,
                'status': Project.Status.COMPLETED,
                'summary': 'A medical store platform with search, prescription upload, and order tracking.',
                'description': (
                    'Created as a healthcare-focused MERN application with product search, prescription upload, '
                    'and order tracking to improve the online medical buying process.'
                ),
                'tech_stack': ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
                'features': ['Medicine search', 'Prescription upload', 'Order tracking', 'Practical medical store workflow'],
                'tags': ['medical', 'mern', 'store'],
                'thumbnail_url': 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80',
                'live_url': '',
                'github_url': 'https://github.com/alizy55/',
                'is_featured': False,
                'sort_order': 4,
            },
            {
                'title': 'Taamir Enterprise Website',
                'category': Project.Category.PORTFOLIO_BUSINESS_SYSTEMS,
                'status': Project.Status.COMPLETED,
                'summary': 'A professional company website designed for clear business presentation and trust.',
                'description': (
                    'Developed as a polished business website to present company services, brand identity, '
                    'and a more professional online presence.'
                ),
                'tech_stack': ['React.js', 'HTML', 'CSS', 'JavaScript'],
                'features': ['Professional UI', 'Business presentation', 'Responsive layout', 'Brand-focused design'],
                'tags': ['business', 'website', 'portfolio'],
                'thumbnail_url': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
                'live_url': '',
                'github_url': 'https://github.com/alizy55/',
                'is_featured': False,
                'sort_order': 5,
            },
        ]

        for project_data in projects:
            title = project_data['title']
            project, _ = Project.objects.update_or_create(title=title, defaults={**project_data, 'is_active': True})
            ProjectImage.objects.update_or_create(
                project=project,
                title=f'{title} Overview',
                defaults={
                    'caption': f'Primary preview for {title}.',
                    'image_url': project.thumbnail_url,
                    'is_primary': True,
                    'sort_order': 1,
                    'is_active': True,
                },
            )

        education_items = [
            (
                'BS Computer Science',
                'University of Sargodha',
                2021,
                2025,
                'Completed BS Computer Science with strong performance in software development, web technologies, and practical computing work.',
                'CGPA: 3.54',
            ),
            (
                'Technical Assignments and Practical Labs',
                'University of Sargodha',
                2021,
                2025,
                'Actively participated in technical assignments, practical labs, and project-based learning while continuously improving modern development skills.',
                'Project-Based Learning',
            ),
        ]
        for order, (title, institute, start_year, end_year, description, grade) in enumerate(education_items, start=1):
            Education.objects.update_or_create(
                degree_title=title,
                institute_name=institute,
                defaults={
                    'start_year': start_year,
                    'end_year': end_year,
                    'description': description,
                    'grade': grade,
                    'location': 'Sargodha, Pakistan',
                    'is_featured': order == 1,
                    'sort_order': order,
                    'is_active': True,
                },
            )

        experience_items = [
            {
                'role': 'MERN Stack Intern',
                'organization': 'ITSOLERA',
                'start_date': date(2024, 1, 1),
                'end_date': date(2024, 12, 1),
                'is_current': False,
                'location': 'Pakistan',
                'employment_type': 'Internship',
                'summary': 'Worked on real-world full-stack development using the MERN stack, e-commerce systems, and scalable web application workflows.',
                'responsibilities': [
                    'Developed full-stack web applications using the MERN stack',
                    'Built e-commerce systems with authentication and product management',
                    'Designed REST APIs and integrated frontend with backend',
                    'Improved UI and UX using modern frontend practices',
                    'Debugged and optimized application performance',
                    'Collaborated with team members to deliver scalable solutions',
                ],
                'achievements': [
                    'Worked on online medical store systems, e-commerce platforms, and corporate websites',
                    'Strengthened practical full-stack delivery skills through real-world projects',
                ],
                'sort_order': 1,
                'is_active': True,
                'is_featured': True,
            },
            {
                'role': 'Full Stack Project Developer',
                'organization': 'Academic and Personal Projects',
                'start_date': date(2021, 9, 1),
                'end_date': date(2025, 6, 1),
                'is_current': False,
                'location': 'Sargodha, Pakistan',
                'employment_type': 'Project Work',
                'summary': 'Developed AI-based and real-world applications during university studies, practical labs, and independent project work.',
                'responsibilities': [
                    'Built AI-integrated applications, e-commerce systems, and business websites',
                    'Applied MERN, Django, and frontend development skills across multiple projects',
                    'Improved development quality through continuous experimentation and modern tooling',
                ],
                'achievements': [
                    'Successfully completed multiple full-stack development projects',
                    'Actively improved skills in modern technologies and frameworks',
                ],
                'sort_order': 2,
                'is_active': True,
                'is_featured': True,
            },
        ]
        for item in experience_items:
            Experience.objects.update_or_create(
                role=item['role'],
                organization=item['organization'],
                defaults=item,
            )

        certificate_items = [
            (
                'Achievement: AI-Based Application Development',
                'University Projects and Practical Labs',
                date(2025, 5, 1),
                'Developed AI-based and real-world applications during university studies with a focus on practical problem solving.',
            ),
            (
                'Achievement: Multiple Full Stack Project Deliveries',
                'ITSOLERA and Academic Work',
                date(2024, 12, 1),
                'Successfully completed multiple full-stack development projects including e-commerce, medical, and corporate web solutions.',
            ),
            (
                'Achievement: BS Computer Science with 3.54 CGPA',
                'University of Sargodha',
                date(2025, 6, 1),
                'Completed BS Computer Science with strong academic performance and hands-on project work.',
            ),
        ]
        for order, (title, issuer, issue_date, description) in enumerate(certificate_items, start=1):
            Certificate.objects.update_or_create(
                title=title,
                issuer=issuer,
                defaults={
                    'issue_date': issue_date,
                    'description': description,
                    'credential_id': '',
                    'credential_url': '',
                    'image_url': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80'
                    if order == 1
                    else 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80'
                    if order == 2
                    else 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
                    'pdf_url': '',
                    'is_featured': order <= 2,
                    'sort_order': order,
                    'is_active': True,
                },
            )

        gallery_items = [
            ('Professional Portrait', 'profile', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80'),
            ('AI Product Workspace', 'projects', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80'),
            ('E-commerce Development Setup', 'projects', 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=1200&q=80'),
        ]
        for order, (title, category, image_url) in enumerate(gallery_items, start=1):
            GalleryImage.objects.update_or_create(
                title=title,
                defaults={
                    'category': category,
                    'image_url': image_url,
                    'alt_text': title,
                    'caption': f'{title} visual placeholder',
                    'is_featured': order == 1,
                    'sort_order': order,
                    'is_active': True,
                },
            )

        ContactMessage.objects.get_or_create(
            email='recruiter@example.com',
            subject='Interested in your full stack profile',
            defaults={
                'name': 'Hiring Manager',
                'phone': '+923001112233',
                'service_interest': 'Full Stack Web Development',
                'budget_range': 'Entry-Level Role',
                'message': 'We reviewed your projects and would like to discuss a junior full stack opportunity.',
                'source_page': 'homepage',
            },
        )

        self.stdout.write(self.style.SUCCESS(f'Seed completed for profile: {profile.full_name}'))
