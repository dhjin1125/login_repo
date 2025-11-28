import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/LoginPage.css'

function LoginPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Instagram OAuth 설정
  // Meta Developer Console에서 App ID와 Redirect URI를 설정해야 합니다
  const INSTAGRAM_APP_ID = 'YOUR_INSTAGRAM_APP_ID'
  const REDIRECT_URI = 'http://localhost:5173/auth/callback'
  const SCOPES = 'user_profile,user_media'

  const handleInstagramLogin = () => {
    setLoading(true)
    setError('')

    // Instagram OAuth 로그인 URL 생성
    const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${INSTAGRAM_APP_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${SCOPES}&response_type=code`

    // 실제 구현에서는 위 URL로 리다이렉트됩니다
    // window.location.href = authUrl

    // 데모용: 로컬 스토리지에 토큰 저장하고 메인 페이지로 이동
    const demoToken = {
      accessToken: 'demo_access_token_' + Date.now(),
      user: {
        id: '12345',
        username: 'demo_user',
        name: 'Demo User',
        profile_picture_url: 'https://via.placeholder.com/150'
      }
    }

    // 실제 구현에서는 백엔드에서 authorization code를 받아서 토큰을 교환합니다
    localStorage.setItem('instagramAuth', JSON.stringify(demoToken))
    
    // 메인 페이지로 이동
    setTimeout(() => {
      navigate('/')
    }, 500)
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1>Threads</h1>
          <p>Instagram 계정으로 로그인</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button
          className="instagram-login-btn"
          onClick={handleInstagramLogin}
          disabled={loading}
        >
          {loading ? '로그인 중...' : 'Instagram으로 로그인'}
        </button>

        <div className="login-info">
          <p>🔐 안전한 Instagram 인증을 통해 로그인합니다</p>
          <p>귀하의 계정 정보는 보호됩니다</p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
