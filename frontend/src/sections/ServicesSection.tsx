import { motion } from 'framer-motion'
import { Blocks, GraduationCap, LayoutDashboard, MonitorCog, ServerCog, Workflow } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { SectionHeading } from '../components/ui/SectionHeading'
import type { ContentSection, Service } from '../types/api'

const icons: Record<string, LucideIcon> = {
  'layout-dashboard': LayoutDashboard,
  'server-cog': ServerCog,
  'monitor-smartphone': MonitorCog,
  'graduation-cap': GraduationCap,
  workflow: Workflow,
  presentation: Blocks,
}

export function ServicesSection({
  services,
  content,
}: {
  services: Service[]
  content?: ContentSection
}) {
  return (
    <section className="section-space">
      <div className="shell">
        <SectionHeading
          eyebrow={content?.eyebrow || 'Services'}
          title={content?.title || 'Professional services positioned for clients, institutions, and founders.'}
          description={
            content?.description ||
            'These offerings are written to support both freelance outreach and full-time positioning.'
          }
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const Icon = icons[service.icon_name] || Blocks

            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: index * 0.06 }}
                className="glass-card rounded-[2rem] p-8"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-[1.5rem] bg-[var(--accent-soft)] text-[var(--accent-strong)]">
                    <Icon size={24} />
                  </div>
                  {service.highlight ? (
                    <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-strong)]">
                      {service.highlight}
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-6 text-2xl font-semibold tracking-tight">{service.title}</h3>
                <p className="mt-4 text-base leading-7 text-[var(--muted)]">{service.short_description}</p>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
