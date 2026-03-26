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
      className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left"
    >
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="mt-6 text-2xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      <p className="mt-4 text-sm leading-7 text-[var(--muted)] sm:text-lg">{description}</p>
    </motion.div>
  )
}
