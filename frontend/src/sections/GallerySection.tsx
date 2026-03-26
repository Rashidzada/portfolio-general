import { motion } from 'framer-motion'

import { SectionHeading } from '../components/ui/SectionHeading'
import type { ContentSection, GalleryImage } from '../types/api'

export function GallerySection({
  items,
  content,
}: {
  items: GalleryImage[]
  content?: ContentSection
}) {
  if (!items.length) {
    return null
  }

  return (
    <section className="section-space">
      <div className="shell">
        <SectionHeading
          eyebrow={content?.eyebrow || 'Gallery'}
          title={content?.title || 'An elegant visual layer for project, certificate, and teaching imagery.'}
          description={
            content?.description ||
            'The gallery supports uploaded images or external sources without turning the site into a cluttered image dump.'
          }
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => (
            <motion.figure
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: index * 0.04 }}
              className="glass-card overflow-hidden rounded-[2rem]"
            >
              {item.image_source ? (
                <img src={item.image_source} alt={item.alt_text || item.title} className="h-56 w-full object-cover sm:h-72" />
              ) : null}
              <figcaption className="p-6">
                <p className="text-sm uppercase tracking-[0.16em] text-[var(--muted)]">{item.category || 'Gallery'}</p>
                <p className="mt-3 text-xl font-semibold tracking-tight">{item.title}</p>
                {item.caption ? <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{item.caption}</p> : null}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
