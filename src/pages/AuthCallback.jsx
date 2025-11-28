import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function AuthCallback() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')
    const state = params.get('state')

    if (code) {
      // 백엔드에 authorization code를 전송하여 access token 획득
      fetchAccessToken(code)
    } else {
      // 오류 발생
      console.error('Authorization code not found')
      navigate('/login')
    }
  }, [navigate])

  const fetchAccessToken = async (code) => {
    try {
      // 백엔드 API 호출 (실제 구현)
      // const response = await fetch('/api/auth/instagram/callback', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ code })
      // })

      // const data = await response.json()
      // localStorage.setItem('instagramAuth', JSON.stringify(data))

      // 메인 페이지로 이동
      setTimeout(() => {
        navigate('/')
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Failed to get access token:', error)
      navigate('/login')
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {loading && <p>로그인을 처리 중입니다...</p>}
    </div>
  )
}

export default AuthCallback
