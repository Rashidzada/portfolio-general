import { MessageCircleMore } from 'lucide-react'

import type { Profile, SiteSettings } from '../../types/api'
import { buildWhatsAppLabel, buildWhatsAppLink } from '../../utils/contact'

export function FloatingWhatsAppButton({
  profile,
  siteSettings,
}: {
  profile: Profile | null
  siteSettings: SiteSettings | null
}) {
  const whatsappLink = buildWhatsAppLink(profile, siteSettings)

  if (!whatsappLink) {
    return null
  }

  const label = buildWhatsAppLabel(profile)

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noreferrer"
      aria-label="Contact on WhatsApp"
      className="fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6"
    >
      <div className="group flex items-center gap-3 rounded-full border border-white/20 bg-[linear-gradient(135deg,#1da851,#0d7b43)] px-3 py-3 text-white shadow-[0_20px_45px_rgba(18,96,53,0.35)] transition-transform hover:-translate-y-1">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/14">
          <MessageCircleMore size={24} />
        </div>
        <div className="hidden pr-3 text-left sm:block">
          <p className="text-sm font-semibold leading-5">{label.title}</p>
          <p className="text-xs leading-4 text-white/80">{label.subtitle}</p>
        </div>
      </div>
    </a>
  )
}
