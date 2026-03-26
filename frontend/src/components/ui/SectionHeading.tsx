import { motion } from 'framer-motion'

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl"
    >
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-[var(--muted)] sm:text-lg">{description}</p>
    </motion.div>
  )
}
