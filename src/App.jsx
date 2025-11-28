import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PermissionsPage from './pages/PermissionsPage'
import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage'
import AuthCallback from './pages/AuthCallback'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/permissions" element={<PermissionsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
      </Routes>
    </Router>
  )
}

export default App
