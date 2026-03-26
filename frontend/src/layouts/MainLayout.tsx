import type { ReactNode } from 'react'

import { Footer } from '../components/layout/Footer'
import { Navbar } from '../components/layout/Navbar'
import { FloatingWhatsAppButton } from '../components/ui/FloatingWhatsAppButton'
import { useTheme } from '../hooks/useTheme'
import type { Profile, ResumeFile, SiteSettings, SocialLink } from '../types/api'

export function MainLayout({
  children,
  profile,
  resume,
  siteSettings,
  socialLinks,
}: {
  children: ReactNode
  profile: Profile | null
  resume: ResumeFile | null
  siteSettings: SiteSettings | null
  socialLinks: SocialLink[]
}) {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="relative min-h-screen">
      <Navbar profile={profile} resume={resume} theme={theme} onToggleTheme={toggleTheme} />
      <main>{children}</main>
      <Footer siteSettings={siteSettings} socialLinks={socialLinks} />
      <FloatingWhatsAppButton profile={profile} siteSettings={siteSettings} />
    </div>
  )
}
