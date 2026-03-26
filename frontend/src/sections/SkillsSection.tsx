import { motion } from 'framer-motion'

import { SectionHeading } from '../components/ui/SectionHeading'
import type { ContentSection, SkillCategory } from '../types/api'

export function SkillsSection({
  categories,
  content,
}: {
  categories: SkillCategory[]
  content?: ContentSection
}) {
  return (
    <section id="skills" className="section-space">
      <div className="shell">
        <SectionHeading
          eyebrow={content?.eyebrow || 'Skills'}
          title={content?.title || 'Technical breadth organised like a real engineering profile.'}
          description={
            content?.description ||
            'Backend, frontend, data, tooling, and system-level knowledge are grouped in a way recruiters and clients can scan quickly.'
          }
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {categories.map((category, index) => (
            <motion.article
              key={category.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: index * 0.06 }}
              className="glass-card rounded-[2rem] p-6 sm:p-8"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight">{category.name}</h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{category.description}</p>
                </div>
                <div
                  className="hidden h-16 w-16 rounded-[1.75rem] lg:block"
                  style={{ background: `linear-gradient(135deg, ${category.accent_color}, transparent)` }}
                />
              </div>

              <div className="mt-8 grid gap-5">
                {category.skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-[var(--muted)]">{skill.proficiency}%</span>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-[var(--accent-soft)]">
                      <div
                        className="h-2 rounded-full bg-[linear-gradient(90deg,var(--accent),var(--accent-strong))]"
                        style={{ width: `${skill.proficiency}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
