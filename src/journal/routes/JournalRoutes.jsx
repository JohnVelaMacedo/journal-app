import { Navigate, Route, Routes } from 'react-router'
import JournalPage from '../pages/JournalPage'

function JournalRoutes() {
  return (
    <Routes>
      <Route
        path='/'
        element={<JournalPage />}
      />

      <Route
        path='/*'
        element={<Navigate to='/' />}
      />
    </Routes>
  )
}

export default JournalRoutes
