import { motion } from 'framer-motion'
import { ArrowRight, BriefcaseBusiness, Download, Mail } from 'lucide-react'

import type { ContentSection, Profile, ResumeFile, SiteSettings, SocialLink } from '../types/api'

export function HeroSection({
  profile,
  resume,
  siteSettings,
  socialLinks,
  content,
}: {
  profile: Profile | null
  resume: ResumeFile | null
  siteSettings: SiteSettings | null
  socialLinks: SocialLink[]
  content?: ContentSection
}) {
  const featuredLinks = socialLinks.filter((link) => link.is_featured)
  const focusedRoles = content?.items?.length
    ? content.items
    : ['Full Stack Developer', 'MERN Stack Builder', 'Django and AI Enthusiast']

  return (
    <section id="top" className="section-space overflow-hidden">
      <div className="shell">
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow">{profile?.hero_badge || 'Modern software systems with clear business value'}</span>
            <h1 className="mt-8 max-w-4xl text-5xl font-semibold tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              {profile?.headline || 'Full Stack Developer and Educator'}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)] sm:text-xl">
              {profile?.hero_intro ||
                'I build polished, dependable products with Django and React for businesses, schools, and teams that need serious software.'}
            </p>
            <p className="mt-5 max-w-3xl text-base leading-7 text-[var(--muted)]">
              {profile?.subheadline || siteSettings?.footer_tagline || 'Backend architecture, front-end craft, and meaningful software delivery.'}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--foreground)] px-6 py-3 text-sm font-semibold text-[var(--background)]"
              >
                Hire Me
                <BriefcaseBusiness size={16} />
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-6 py-3 text-sm font-semibold"
              >
                View Projects
                <ArrowRight size={16} />
              </a>
              {resume?.download_source ? (
                <a
                  href={resume.download_source}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-6 py-3 text-sm font-semibold"
                >
                  Download CV
                  <Download size={16} />
                </a>
              ) : null}
              <a
                href={`mailto:${siteSettings?.hire_me_email || profile?.primary_email || 'hello@example.com'}`}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-6 py-3 text-sm font-semibold"
              >
                Contact Me
                <Mail size={16} />
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              {featuredLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-[var(--line)] px-4 py-2 text-sm text-[var(--muted)] transition hover:text-[var(--foreground)]"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {profile?.highlights?.length ? (
              <div className="mt-12 grid gap-4 sm:grid-cols-3">
                {profile.highlights.map((item) => (
                  <div key={item.label} className="glass-card rounded-[1.5rem] p-5">
                    <p className="text-3xl font-semibold tracking-tight">{item.value}</p>
                    <p className="mt-2 text-sm uppercase tracking-[0.16em] text-[var(--muted)]">{item.label}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative mx-auto w-full max-w-xl"
          >
            <div className="absolute -left-8 top-6 h-28 w-28 rounded-full bg-[var(--accent-soft)] blur-3xl" />
            <div className="absolute -right-10 bottom-12 h-32 w-32 rounded-full bg-[color:var(--accent-strong)]/20 blur-3xl" />
            <div className="glass-card relative overflow-hidden rounded-[2.75rem] p-4">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.34),transparent_58%)]" />
              {profile?.profile_image_source ? (
                <img
                  src={profile.profile_image_source}
                  alt={profile.profile_image_alt || profile.full_name}
                  className="relative h-[500px] w-full rounded-[2.2rem] object-cover"
                />
              ) : (
                <div className="relative flex h-[500px] items-center justify-center rounded-[2.2rem] bg-[linear-gradient(135deg,var(--accent-soft),rgba(13,107,99,0.2))] p-10 text-center">
                  <div>
                    <p className="font-display text-4xl font-semibold tracking-tight">{profile?.full_name || 'Your Full Name'}</p>
                    <p className="mt-3 text-[var(--muted)]">{profile?.availability_text || 'Available for meaningful projects'}</p>
                  </div>
                </div>
              )}
              <div className="glass-card absolute bottom-6 left-6 rounded-[1.75rem] px-5 py-4">
                <p className="text-sm uppercase tracking-[0.2em] text-[var(--muted)]">
                  {content?.eyebrow || 'Focused Roles'}
                </p>
                <div className="mt-2 text-sm font-medium">
                  {focusedRoles.map((role) => (
                    <span key={role} className="block">
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
