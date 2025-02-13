import { Route, Routes } from 'react-router'
import AuthRoutes from '../auth/routes/AuthRoutes'
import JournalRoutes from '../journal/routes/JournalRoutes'

function AppRouter() {
  return (
    <Routes>
      {/* Login y Registro */}
      <Route
        path='/auth/*'
        element={<AuthRoutes />}
      />

      {/* JournalApp */}
      <Route
        path='/*'
        element={<JournalRoutes />}
      />
    </Routes>
  )
}

export default AppRouter
