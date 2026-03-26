import type { Profile, SiteSettings } from '../types/api'

function normalizePhoneNumber(value: string) {
  return value.replace(/[^\d]/g, '')
}

function firstNameFromProfile(profile: Profile | null) {
  if (!profile?.full_name) {
    return 'there'
  }

  return profile.full_name.split(' ')[0]
}

export function buildWhatsAppLink(profile: Profile | null, siteSettings: SiteSettings | null) {
  const firstName = firstNameFromProfile(profile)
  const message = `Hi ${firstName}, I'm interested in your profile and would like to connect with you.`

  if (siteSettings?.whatsapp_url) {
    const separator = siteSettings.whatsapp_url.includes('?') ? '&' : '?'
    return `${siteSettings.whatsapp_url}${separator}text=${encodeURIComponent(message)}`
  }

  if (profile?.whatsapp_number) {
    const phone = normalizePhoneNumber(profile.whatsapp_number)
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
  }

  return ''
}

export function buildWhatsAppLabel(profile: Profile | null) {
  const firstName = firstNameFromProfile(profile)

  return {
    title: `Hi ${firstName}`,
    subtitle: "I'm interested in your profile",
  }
}
