import { ArrowUpRight, Send } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'

import { submitContactForm } from '../api/portfolio'
import { SectionHeading } from '../components/ui/SectionHeading'
import type { ContactFormPayload, ContentSection, Profile, Service, SiteSettings } from '../types/api'
import { buildWhatsAppLink } from '../utils/contact'

const initialState: ContactFormPayload = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  service_interest: '',
  budget_range: '',
  message: '',
  source_page: 'homepage',
}

export function ContactSection({
  profile,
  siteSettings,
  services,
  content,
}: {
  profile: Profile | null
  siteSettings: SiteSettings | null
  services: Service[]
  content?: ContentSection
}) {
  const [formData, setFormData] = useState<ContactFormPayload>(initialState)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const whatsappLink = buildWhatsAppLink(profile, siteSettings)
  const budgetOptions = content?.items?.length
    ? content.items
    : ['$500 - $1,000', '$1,000 - $3,000', '$3,000 - $5,000', '$5,000+']

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')

    try {
      await submitContactForm(formData)
      setFormData(initialState)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section-space">
      <div className="shell">
        <SectionHeading
          eyebrow={content?.eyebrow || 'Contact'}
          title={content?.title || siteSettings?.contact_cta_title || 'Let us build something meaningful together.'}
          description={
            content?.description ||
            siteSettings?.contact_cta_text ||
            'The contact form stores submissions in the backend and works alongside direct email, phone, and WhatsApp links.'
          }
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="grid gap-6">
            <div className="glass-card rounded-[2rem] p-8">
              <p className="text-sm uppercase tracking-[0.18em] text-[var(--muted)]">Direct Contact</p>
              <div className="mt-6 grid gap-4 text-sm text-[var(--muted)]">
                <p>Email: {siteSettings?.contact_email || profile?.primary_email || 'hello@example.com'}</p>
                <p>Phone: {siteSettings?.contact_phone || profile?.phone || 'Add your number'}</p>
                <p>Location: {siteSettings?.contact_location || profile?.location || 'Add your location'}</p>
                <p>Hours: {siteSettings?.office_hours || 'Mon to Sat'}</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {whatsappLink ? (
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-5 py-3 text-sm font-semibold"
                  >
                    WhatsApp
                    <ArrowUpRight size={16} />
                  </a>
                ) : null}
                {siteSettings?.booking_url ? (
                  <a
                    href={siteSettings.booking_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-5 py-3 text-sm font-semibold"
                  >
                    Book a Call
                    <ArrowUpRight size={16} />
                  </a>
                ) : null}
              </div>
            </div>

            <div className="glass-card rounded-[2rem] p-8">
              <p className="text-sm uppercase tracking-[0.18em] text-[var(--muted)]">Upload or Link Support</p>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                {content?.extra_text ||
                  'The backend accepts uploaded media files and external URLs. Google Drive share links are normalized by the API so your image and document links can still work cleanly after deployment.'}
              </p>
            </div>
          </aside>

          <form onSubmit={handleSubmit} className="glass-card rounded-[2rem] p-8">
            <div className="grid gap-5 md:grid-cols-2">
              <input
                value={formData.name}
                onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                placeholder="Your name"
                required
                className="rounded-2xl border border-[var(--line)] bg-transparent px-4 py-3 outline-none"
              />
              <input
                value={formData.email}
                onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                placeholder="Your email"
                type="email"
                required
                className="rounded-2xl border border-[var(--line)] bg-transparent px-4 py-3 outline-none"
              />
              <input
                value={formData.phone}
                onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
                placeholder="Phone / WhatsApp"
                className="rounded-2xl border border-[var(--line)] bg-transparent px-4 py-3 outline-none"
              />
              <input
                value={formData.subject}
                onChange={(event) => setFormData({ ...formData, subject: event.target.value })}
                placeholder="Subject"
                required
                className="rounded-2xl border border-[var(--line)] bg-transparent px-4 py-3 outline-none"
              />
              <select
                value={formData.service_interest}
                onChange={(event) => setFormData({ ...formData, service_interest: event.target.value })}
                className="rounded-2xl border border-[var(--line)] bg-transparent px-4 py-3 outline-none"
              >
                <option value="">Select service</option>
                {services.map((service) => (
                  <option key={service.id} value={service.title}>
                    {service.title}
                  </option>
                ))}
              </select>
              <select
                value={formData.budget_range}
                onChange={(event) => setFormData({ ...formData, budget_range: event.target.value })}
                className="rounded-2xl border border-[var(--line)] bg-transparent px-4 py-3 outline-none"
              >
                <option value="">Budget range</option>
                {budgetOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <textarea
              value={formData.message}
              onChange={(event) => setFormData({ ...formData, message: event.target.value })}
              placeholder="Tell me about your project or requirement"
              required
              rows={6}
              className="mt-5 w-full rounded-[1.5rem] border border-[var(--line)] bg-transparent px-4 py-3 outline-none"
            />

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--foreground)] px-6 py-3 text-sm font-semibold text-[var(--background)] disabled:opacity-70"
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
                <Send size={16} />
              </button>

              {status === 'success' ? (
                <p className="text-sm text-[var(--accent-strong)]">Message stored successfully. I will review it soon.</p>
              ) : null}
              {status === 'error' ? (
                <p className="text-sm text-red-500">Submission failed. Check the backend and try again.</p>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
