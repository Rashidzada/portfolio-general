import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

import { SectionHeading } from '../components/ui/SectionHeading'
import type { ContentSection, Testimonial } from '../types/api'

export function TestimonialsSection({
  testimonials,
  content,
}: {
  testimonials: Testimonial[]
  content?: ContentSection
}) {
  if (!testimonials.length) {
    return null
  }

  return (
    <section className="section-space">
      <div className="shell">
        <SectionHeading
          eyebrow={content?.eyebrow || 'Testimonials'}
          title={content?.title || 'Feedback that strengthens trust and signals delivery quality.'}
          description={
            content?.description ||
            'This section supports client, student, and institutional testimonials without looking like a cheap template block.'
          }
        />

        <div className="mt-12 grid gap-6 xl:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: index * 0.05 }}
              className="glass-card rounded-[2rem] p-8"
            >
              <div className="flex items-center gap-4">
                {testimonial.photo_source ? (
                  <img src={testimonial.photo_source} alt={testimonial.name} className="h-16 w-16 rounded-2xl object-cover" />
                ) : null}
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">{testimonial.name}</h3>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    {testimonial.role}
                    {testimonial.organization ? `, ${testimonial.organization}` : ''}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex gap-1 text-[var(--accent)]">
                {Array.from({ length: testimonial.rating }).map((_, position) => (
                  <Star key={position} size={16} fill="currentColor" />
                ))}
              </div>

              <p className="mt-5 text-base leading-8 text-[var(--muted)]">"{testimonial.feedback}"</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
