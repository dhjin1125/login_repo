import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage'
import AuthCallback from './pages/AuthCallback'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Router>
  )
}

export default App
