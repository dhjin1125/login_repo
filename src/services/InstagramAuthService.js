import { INSTAGRAM_CONFIG } from '../config/instagram.config'

/**
 * Instagram OAuth 및 API 관련 서비스
 */
class InstagramAuthService {
  /**
   * Instagram OAuth 로그인 URL 생성
   */
  static generateAuthUrl() {
    const params = new URLSearchParams({
      client_id: INSTAGRAM_CONFIG.APP_ID,
      redirect_uri: INSTAGRAM_CONFIG.REDIRECT_URI,
      scope: INSTAGRAM_CONFIG.SCOPES.join(','),
      response_type: 'code'
    })

    return `${INSTAGRAM_CONFIG.AUTH_ENDPOINT}?${params.toString()}`
  }

  /**
   * Authorization code를 사용하여 access token 획득
   * @param {string} code - Instagram OAuth authorization code
   */
  static async exchangeCodeForToken(code) {
    try {
      const response = await fetch(`${INSTAGRAM_CONFIG.BACKEND_API}/auth/instagram/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code })
      })

      if (!response.ok) {
        throw new Error('Failed to exchange code for token')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error exchanging code for token:', error)
      throw error
    }
  }

  /**
   * Access token을 사용하여 사용자 정보 조회
   * @param {string} accessToken - Instagram access token
   */
  static async getUserProfile(accessToken) {
    try {
      const params = new URLSearchParams({
        fields: 'id,username,name,profile_picture_url,biography,website',
        access_token: accessToken
      })

      const response = await fetch(
        `https://graph.instagram.com/${INSTAGRAM_CONFIG.GRAPH_VERSION}/me?${params.toString()}`
      )

      if (!response.ok) {
        throw new Error('Failed to fetch user profile')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching user profile:', error)
      throw error
    }
  }

  /**
   * Access token을 사용하여 사용자의 미디어 목록 조회
   * @param {string} accessToken - Instagram access token
   */
  static async getUserMedia(accessToken) {
    try {
      const params = new URLSearchParams({
        fields: 'id,caption,media_type,media_url,timestamp,like_count,comments_count',
        access_token: accessToken
      })

      const response = await fetch(
        `https://graph.instagram.com/${INSTAGRAM_CONFIG.GRAPH_VERSION}/me/media?${params.toString()}`
      )

      if (!response.ok) {
        throw new Error('Failed to fetch user media')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching user media:', error)
      throw error
    }
  }

  /**
   * 로컬 스토리지에서 인증 정보 조회
   */
  static getStoredAuth() {
    const authData = localStorage.getItem('instagramAuth')
    return authData ? JSON.parse(authData) : null
  }

  /**
   * 로컬 스토리지에 인증 정보 저장
   * @param {object} authData - 인증 데이터
   */
  static saveAuth(authData) {
    localStorage.setItem('instagramAuth', JSON.stringify(authData))
  }

  /**
   * 인증 정보 삭제 (로그아웃)
   */
  static clearAuth() {
    localStorage.removeItem('instagramAuth')
  }

  /**
   * Access token 유효성 확인
   * @param {string} accessToken - Instagram access token
   */
  static async validateToken(accessToken) {
    try {
      const params = new URLSearchParams({
        access_token: accessToken
      })

      const response = await fetch(
        `https://graph.instagram.com/debug_token?${params.toString()}`
      )

      if (!response.ok) {
        return false
      }

      const data = await response.json()
      return data.data?.is_valid || false
    } catch (error) {
      console.error('Error validating token:', error)
      return false
    }
  }
}

export default InstagramAuthService
