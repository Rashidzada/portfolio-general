import { motion } from 'framer-motion'
import { ArrowUpRight, Github } from 'lucide-react'
import { useState } from 'react'

import { SectionHeading } from '../components/ui/SectionHeading'
import { StatusBadge } from '../components/ui/StatusBadge'
import type { ContentSection, Project } from '../types/api'

export function ProjectsSection({
  projects,
  content,
}: {
  projects: Project[]
  content?: ContentSection
}) {
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = ['all', ...new Set(projects.map((project) => project.category))]

  const filteredProjects = projects.filter((project) =>
    activeCategory === 'all' ? true : project.category === activeCategory,
  )

  return (
    <section id="projects" className="section-space">
      <div className="shell">
        <SectionHeading
          eyebrow={content?.eyebrow || 'Projects'}
          title={content?.title || 'Real portfolio work shown as premium case-style project cards.'}
          description={
            content?.description ||
            'Projects are grouped by category and presented with enough context to look credible to clients, recruiters, and institutions.'
          }
        />

        <div className="mt-10 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeCategory === category
                  ? 'bg-[var(--foreground)] text-[var(--background)]'
                  : 'border border-[var(--line)] text-[var(--muted)]'
              }`}
            >
              {category === 'all' ? 'All Projects' : category.replaceAll('-', ' ')}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-6 xl:grid-cols-2">
          {filteredProjects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: index * 0.05 }}
              className="glass-card overflow-hidden rounded-[2rem]"
            >
              {project.thumbnail_source ? (
                <img src={project.thumbnail_source} alt={project.title} className="h-56 w-full object-cover sm:h-72" />
              ) : null}

              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm uppercase tracking-[0.18em] text-[var(--muted)]">{project.category_display}</p>
                  <StatusBadge label={project.status_display} />
                </div>

                <h3 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">{project.title}</h3>
                <p className="mt-4 text-base leading-7 text-[var(--muted)]">{project.summary}</p>
                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{project.description}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tech_stack.map((item) => (
                    <span key={item} className="rounded-full border border-[var(--line)] px-3 py-1 text-xs uppercase tracking-[0.14em] text-[var(--muted)]">
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-6 grid gap-3">
                  {project.features.map((feature) => (
                    <div key={feature} className="rounded-2xl bg-[var(--background-soft)] px-4 py-3 text-sm text-[var(--muted)]">
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  {project.live_url ? (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-semibold text-[var(--background)]"
                    >
                      Live Preview
                      <ArrowUpRight size={16} />
                    </a>
                  ) : null}
                  {project.github_url ? (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-5 py-3 text-sm font-semibold"
                    >
                      GitHub
                      <Github size={16} />
                    </a>
                  ) : null}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
