import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { getAccessToken } from '../../utils/storage'

export function ProtectedRoute() {
  const location = useLocation()

  if (!getAccessToken()) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />
  }

  return <Outlet />
}
