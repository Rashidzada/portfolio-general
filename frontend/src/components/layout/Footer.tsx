import { ArrowUpRight } from 'lucide-react'

import type { SiteSettings, SocialLink } from '../../types/api'

export function Footer({
  siteSettings,
  socialLinks,
}: {
  siteSettings: SiteSettings | null
  socialLinks: SocialLink[]
}) {
  return (
    <footer className="border-t border-[var(--line)] py-10">
      <div className="shell flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-lg font-semibold">{siteSettings?.site_name || 'Developer Portfolio'}</p>
          <p className="mt-2 max-w-xl text-sm text-[var(--muted)]">
            {siteSettings?.footer_tagline || 'Production-ready software systems with a clean user experience.'}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {socialLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-4 py-2 text-sm"
            >
              {link.label}
              <ArrowUpRight size={14} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
