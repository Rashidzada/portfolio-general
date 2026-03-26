export interface HighlightStat {
  label: string
  value: string
}

export interface Profile {
  id: number
  full_name: string
  headline: string
  subheadline: string
  hero_intro: string
  professional_summary: string
  development_journey: string
  mission: string
  strengths: string[]
  highlights: HighlightStat[]
  years_of_experience: number
  availability_text: string
  primary_email: string
  secondary_email: string
  phone: string
  whatsapp_number: string
  location: string
  linkedin_url: string
  github_url: string
  website_url: string
  hero_badge: string
  profile_image_source: string
  profile_image_alt: string
}

export interface SiteSettings {
  id: number
  site_name: string
  site_title: string
  meta_description: string
  meta_keywords: string
  footer_tagline: string
  contact_email: string
  contact_phone: string
  contact_location: string
  hire_me_email: string
  whatsapp_url: string
  booking_url: string
  office_hours: string
  support_dark_mode: boolean
  contact_cta_title: string
  contact_cta_text: string
  og_image_source: string
}

export interface ContentSection {
  id: number
  key: string
  label: string
  eyebrow: string
  title: string
  description: string
  extra_text: string
  items: string[]
  is_active: boolean
  sort_order: number
}

export interface SocialLink {
  id: number
  platform: string
  label: string
  url: string
  icon_name: string
  is_featured: boolean
  sort_order: number
}

export interface ResumeFile {
  id: number
  title: string
  description: string
  file_source: string
  download_source: string
}

export interface Skill {
  id: number
  name: string
  proficiency: number
  short_label: string
  icon_name: string
  is_featured: boolean
  sort_order: number
}

export interface SkillCategory {
  id: number
  name: string
  slug: string
  description: string
  accent_color: string
  sort_order: number
  skills: Skill[]
}

export interface Service {
  id: number
  title: string
  slug: string
  short_description: string
  details: string
  icon_name: string
  highlight: string
  sort_order: number
}

export interface ProjectImage {
  id: number
  title: string
  image_source: string
  caption: string
  is_primary: boolean
  sort_order: number
}

export interface Project {
  id: number
  title: string
  slug: string
  summary: string
  description: string
  category: string
  category_display: string
  status: string
  status_display: string
  tech_stack: string[]
  features: string[]
  tags: string[]
  thumbnail_source: string
  live_url: string
  github_url: string
  case_study_url: string
  is_featured: boolean
  client_name: string
  duration_text: string
  sort_order: number
  images: ProjectImage[]
}

export interface Education {
  id: number
  degree_title: string
  institute_name: string
  start_year: number
  end_year: number | null
  description: string
  grade: string
  location: string
  credential_url: string
  is_featured: boolean
  sort_order: number
}

export interface Experience {
  id: number
  role: string
  organization: string
  start_date: string
  end_date: string | null
  is_current: boolean
  location: string
  employment_type: string
  summary: string
  responsibilities: string[]
  achievements: string[]
  is_featured: boolean
  sort_order: number
}

export interface Certificate {
  id: number
  title: string
  issuer: string
  issue_date: string
  description: string
  credential_id: string
  credential_url: string
  image_source: string
  pdf_source: string
  is_featured: boolean
  sort_order: number
}

export interface Testimonial {
  id: number
  name: string
  role: string
  organization: string
  feedback: string
  photo_source: string
  rating: number
  is_featured: boolean
  sort_order: number
}

export interface GalleryImage {
  id: number
  title: string
  category: string
  image_source: string
  alt_text: string
  caption: string
  is_featured: boolean
  sort_order: number
}

export interface ContactMessage {
  id: number
  name: string
  email: string
  phone: string
  subject: string
  service_interest: string
  budget_range: string
  message: string
  source_page: string
  created_at: string
  is_read: boolean
  is_replied: boolean
}

export interface LandingPayload {
  profile: Profile | null
  site_settings: SiteSettings | null
  content_sections: ContentSection[]
  social_links: SocialLink[]
  skills: SkillCategory[]
  services: Service[]
  projects: Project[]
  featured_projects: Project[]
  education: Education[]
  experience: Experience[]
  certificates: Certificate[]
  testimonials: Testimonial[]
  gallery: GalleryImage[]
  resume: ResumeFile | null
}

export interface DashboardOverview {
  counts: Record<string, number>
  profile: Profile | null
  recent_messages: ContactMessage[]
  admin_url: string
}

export interface AuthTokens {
  access: string
  refresh: string
}

export interface CurrentUser {
  id: number
  username: string
  email: string
  is_staff: boolean
  is_superuser: boolean
}

export interface ContactFormPayload {
  name: string
  email: string
  phone: string
  subject: string
  service_interest: string
  budget_range: string
  message: string
  source_page: string
}

export type DashboardItem = Record<string, unknown> & {
  id?: number
}
