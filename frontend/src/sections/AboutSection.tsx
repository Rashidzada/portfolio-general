import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

import { SectionHeading } from '../components/ui/SectionHeading'
import type { ContentSection, Profile } from '../types/api'

export function AboutSection({
  profile,
  content,
}: {
  profile: Profile | null
  content?: ContentSection
}) {
  if (!profile) {
    return null
  }

  const positioningItems = content?.items?.length
    ? content.items
    : [
        'Full Stack Developer',
        'MERN Developer',
        'Django Developer',
        'AI Enthusiast',
        'React Builder',
        'Problem Solver',
      ]

  return (
    <section id="about" className="section-space">
      <div className="shell">
        <SectionHeading
          eyebrow={content?.eyebrow || 'About Me'}
          title={content?.title || 'A developer who cares about systems, clarity, and long-term value.'}
          description={
            content?.description ||
            'This portfolio is designed to present a serious engineer who can plan architecture, build the product, and communicate the work with confidence.'
          }
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="glass-card rounded-[2rem] p-8"
          >
            <p className="text-lg leading-8 text-[var(--muted)]">{profile.professional_summary}</p>
            <p className="mt-6 text-base leading-8 text-[var(--muted)]">{profile.development_journey}</p>
            <p className="mt-6 text-base leading-8 text-[var(--muted)]">{profile.mission}</p>
          </motion.article>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.1 }}
            className="grid gap-6"
          >
            <div className="glass-card rounded-[2rem] p-8">
              <p className="text-sm uppercase tracking-[0.2em] text-[var(--muted)]">Core Strengths</p>
              <div className="mt-6 grid gap-4">
                {profile.strengths.map((strength) => (
                  <div key={strength} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="mt-1 shrink-0 text-[var(--accent-strong)]" />
                    <p className="text-sm leading-7 text-[var(--muted)]">{strength}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-[2rem] p-8">
              <p className="text-sm uppercase tracking-[0.2em] text-[var(--muted)]">Positioning</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {positioningItems.map((item) => (
                  <span key={item} className="rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm text-[var(--accent-strong)]">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  )
}
