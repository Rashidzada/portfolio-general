import { useEffect } from 'react'

import { MainLayout } from '../layouts/MainLayout'
import { usePortfolioData } from '../hooks/usePortfolioData'
import { Loader } from '../components/ui/Loader'
import { AboutSection } from '../sections/AboutSection'
import { CertificatesSection } from '../sections/CertificatesSection'
import { ContactSection } from '../sections/ContactSection'
import { ExperienceEducationSection } from '../sections/ExperienceEducationSection'
import { GallerySection } from '../sections/GallerySection'
import { HeroSection } from '../sections/HeroSection'
import { ProjectsSection } from '../sections/ProjectsSection'
import { ServicesSection } from '../sections/ServicesSection'
import { SkillsSection } from '../sections/SkillsSection'
import { TestimonialsSection } from '../sections/TestimonialsSection'
import type { ContentSection } from '../types/api'

export function HomePage() {
  const { data, isLoading, error } = usePortfolioData()

  useEffect(() => {
    if (!data) {
      document.title = 'Premium Developer Portfolio'
      return
    }

    document.title = data.site_settings?.site_title || 'Premium Developer Portfolio'

    const description =
      data.site_settings?.meta_description ||
      'Modern software developer portfolio built with Django, React, and TypeScript.'

    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.setAttribute('name', 'description')
      document.head.appendChild(metaDescription)
    }
    metaDescription.setAttribute('content', description)
  }, [data])

  if (isLoading) {
    return <Loader />
  }

  if (!data) {
    return (
      <div className="shell flex min-h-screen items-center justify-center">
        <div className="glass-card max-w-2xl rounded-[2rem] p-10 text-center">
          <h1 className="text-4xl font-semibold tracking-tight">Backend connection required</h1>
          <p className="mt-4 text-base leading-7 text-[var(--muted)]">
            {error || 'Start the Django API and seed the data to render the full portfolio experience.'}
          </p>
        </div>
      </div>
    )
  }

  const sectionContent = data.content_sections.reduce<Record<string, ContentSection>>((map, section) => {
    map[section.key] = section
    return map
  }, {})

  return (
    <MainLayout
      profile={data.profile}
      resume={data.resume}
      siteSettings={data.site_settings}
      socialLinks={data.social_links}
    >
      <HeroSection
        profile={data.profile}
        resume={data.resume}
        siteSettings={data.site_settings}
        socialLinks={data.social_links}
        content={sectionContent.hero}
      />
      <AboutSection profile={data.profile} content={sectionContent.about} />
      <SkillsSection categories={data.skills} content={sectionContent.skills} />
      <ServicesSection services={data.services} content={sectionContent.services} />
      <ProjectsSection projects={data.projects} content={sectionContent.projects} />
      <ExperienceEducationSection
        experience={data.experience}
        education={data.education}
        content={sectionContent.experience}
      />
      <CertificatesSection certificates={data.certificates} content={sectionContent.certificates} />
      <TestimonialsSection testimonials={data.testimonials} content={sectionContent.testimonials} />
      <GallerySection items={data.gallery} content={sectionContent.gallery} />
      <ContactSection
        profile={data.profile}
        siteSettings={data.site_settings}
        services={data.services}
        content={sectionContent.contact}
      />
    </MainLayout>
  )
}
