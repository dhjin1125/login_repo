import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { INSTAGRAM_CONFIG } from '../config/instagram.config'
import '../styles/LoginPage.css'

function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // 권한 요청 페이지에서 전달받은 권한 정보
  const selectedPermissions = location.state?.selectedPermissions || INSTAGRAM_CONFIG.SCOPES

  const handleInstagramLogin = () => {
    setLoading(true)
    setError('')

    // Instagram OAuth 로그인 URL 생성 (선택된 권한 사용)
    const scopesString = selectedPermissions.join(',')
    const authUrl = `${INSTAGRAM_CONFIG.AUTH_ENDPOINT}?client_id=${INSTAGRAM_CONFIG.APP_ID}&redirect_uri=${encodeURIComponent(INSTAGRAM_CONFIG.REDIRECT_URI)}&scope=${scopesString}&response_type=code`

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
      },
      grantedPermissions: selectedPermissions,
      timestamp: new Date().toISOString()
    }

    // 실제 구현에서는 백엔드에서 authorization code를 받아서 토큰을 교환합니다
    localStorage.setItem('instagramAuth', JSON.stringify(demoToken))
    
    // 메인 페이지로 이동
    setTimeout(() => {
      navigate('/')
    }, 500)
  }

  const handlePermissionsClick = () => {
    navigate('/permissions')
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1>Threads</h1>
          <p>Instagram 계정으로 로그인</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        {/* 선택된 권한 표시 */}
        {selectedPermissions && selectedPermissions.length > 0 && (
          <div className="permissions-info">
            <h3>요청된 권한</h3>
            <div className="permissions-tags">
              {selectedPermissions.map((perm) => (
                <span key={perm} className="perm-tag">
                  {INSTAGRAM_CONFIG.SCOPE_DESCRIPTIONS[perm]?.name || perm}
                </span>
              ))}
            </div>
          </div>
        )}

        <button
          className="instagram-login-btn"
          onClick={handleInstagramLogin}
          disabled={loading}
        >
          {loading ? '로그인 중...' : 'Instagram으로 로그인'}
        </button>

        <button
          className="permissions-link-btn"
          onClick={handlePermissionsClick}
          disabled={loading}
        >
          권한 변경
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
