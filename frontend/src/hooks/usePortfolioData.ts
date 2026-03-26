import { useEffect, useState } from 'react'

import { fetchLandingData } from '../api/portfolio'
import type { LandingPayload } from '../types/api'

export function usePortfolioData() {
  const [data, setData] = useState<LandingPayload | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    async function loadData() {
      try {
        const payload = await fetchLandingData()
        if (mounted) {
          setData(payload)
        }
      } catch {
        if (mounted) {
          setError('The portfolio API is not reachable. Start the backend or update VITE_API_BASE_URL.')
        }
      } finally {
        if (mounted) {
          setIsLoading(false)
        }
      }
    }

    void loadData()

    return () => {
      mounted = false
    }
  }, [])

  return { data, isLoading, error }
}
