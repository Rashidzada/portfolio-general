import { motion } from 'framer-motion'

import { SectionHeading } from '../components/ui/SectionHeading'
import type { ContentSection, Education, Experience } from '../types/api'
import { formatRange } from '../utils/date'

export function ExperienceEducationSection({
  experience,
  education,
  content,
}: {
  experience: Experience[]
  education: Education[]
  content?: ContentSection
}) {
  return (
    <section id="experience" className="section-space">
      <div className="shell">
        <SectionHeading
          eyebrow={content?.eyebrow || 'Experience and Education'}
          title={content?.title || 'Professional credibility for employers, clients, and academic institutions.'}
          description={
            content?.description ||
            'This combines teaching, real-world development work, degrees, and training in one strong timeline-driven section.'
          }
        />

        <div className="mt-12 grid gap-6 xl:grid-cols-2">
          <div className="grid gap-6">
            {experience.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: index * 0.05 }}
                className="glass-card rounded-[2rem] p-6 sm:p-8"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm uppercase tracking-[0.16em] text-[var(--muted)]">{item.organization}</p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-tight">{item.role}</h3>
                  </div>
                  <span className="rounded-full bg-[var(--accent-soft)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-strong)]">
                    {formatRange(item.start_date, item.end_date, item.is_current)}
                  </span>
                </div>

                <p className="mt-5 text-sm leading-7 text-[var(--muted)]">{item.summary}</p>
                <div className="mt-6 grid gap-3">
                  {item.responsibilities.map((responsibility) => (
                    <div key={responsibility} className="rounded-2xl border border-[var(--line)] px-4 py-3 text-sm text-[var(--muted)]">
                      {responsibility}
                    </div>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>

          <div className="grid gap-6">
            {education.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: index * 0.05 }}
                className="glass-card rounded-[2rem] p-6 sm:p-8"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm uppercase tracking-[0.16em] text-[var(--muted)]">{item.institute_name}</p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-tight">{item.degree_title}</h3>
                  </div>
                  <span className="rounded-full border border-[var(--line)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                    {item.start_year} - {item.end_year || 'Present'}
                  </span>
                </div>

                <p className="mt-5 text-sm leading-7 text-[var(--muted)]">{item.description}</p>
                <div className="mt-6 flex flex-wrap gap-3 text-sm text-[var(--muted)]">
                  {item.grade ? <span className="rounded-full bg-[var(--accent-soft)] px-4 py-2">{item.grade}</span> : null}
                  {item.location ? <span className="rounded-full border border-[var(--line)] px-4 py-2">{item.location}</span> : null}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
