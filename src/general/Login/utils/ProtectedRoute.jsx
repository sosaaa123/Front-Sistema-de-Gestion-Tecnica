import { jwtDecode } from "jwt-decode"
function ProtectedRoute({ element, area = null }) {
  const token = localStorage.getItem("token")

  if (!token) {
    return <Navigate to="/login" replace />
  }

  try {
    const decoded = jwtDecode(token)
    if (area && !decoded.areas.includes(area)) {
      return <Navigate to="/login" replace />
    }
    return element
  } catch (error) {
    return <Navigate to="/login" replace />
  }
}
export default ProtectedRoute
