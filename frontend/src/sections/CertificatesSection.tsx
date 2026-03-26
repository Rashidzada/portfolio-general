import { motion } from 'framer-motion'
import { ArrowUpRight, FileText } from 'lucide-react'

import { SectionHeading } from '../components/ui/SectionHeading'
import type { Certificate, ContentSection } from '../types/api'
import { formatMonthYear } from '../utils/date'

export function CertificatesSection({
  certificates,
  content,
}: {
  certificates: Certificate[]
  content?: ContentSection
}) {
  return (
    <section className="section-space">
      <div className="shell">
        <SectionHeading
          eyebrow={content?.eyebrow || 'Achievements'}
          title={content?.title || 'Achievements, academic milestones, and growth indicators shown in a clean premium format.'}
          description={
            content?.description ||
            'These cards highlight academic progress, project outcomes, and practical work that strengthen the overall portfolio story.'
          }
        />

        <div className="mt-12 grid gap-6 xl:grid-cols-2">
          {certificates.map((certificate, index) => (
            <motion.article
              key={certificate.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: index * 0.05 }}
              className="glass-card overflow-hidden rounded-[2rem]"
            >
              {certificate.image_source ? (
                <img src={certificate.image_source} alt={certificate.title} className="h-56 w-full object-cover sm:h-64" />
              ) : null}

              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm uppercase tracking-[0.16em] text-[var(--muted)]">{certificate.issuer}</p>
                  <span className="rounded-full border border-[var(--line)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                    {formatMonthYear(certificate.issue_date)}
                  </span>
                </div>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight">{certificate.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{certificate.description}</p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {certificate.pdf_source ? (
                    <a
                      href={certificate.pdf_source}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-semibold text-[var(--background)]"
                    >
                      View PDF
                      <FileText size={16} />
                    </a>
                  ) : null}
                  {certificate.credential_url ? (
                    <a
                      href={certificate.credential_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-5 py-3 text-sm font-semibold"
                    >
                      Credential Link
                      <ArrowUpRight size={16} />
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
