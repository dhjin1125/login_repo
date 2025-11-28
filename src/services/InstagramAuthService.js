import { INSTAGRAM_CONFIG } from '../config/instagram.config'

/**
 * Instagram OAuth 및 Threads API 관련 서비스
 * 권한: threads_read_replies, threads_basic, threads_keyword_search
 */
class InstagramAuthService {
  /**
   * Instagram OAuth 로그인 URL 생성 (선택된 권한 포함)
   * @param {string[]} permissions - 요청할 권한 배열
   */
  static generateAuthUrl(permissions = INSTAGRAM_CONFIG.SCOPES) {
    const scopesString = Array.isArray(permissions) ? permissions.join(',') : permissions
    
    const params = new URLSearchParams({
      client_id: INSTAGRAM_CONFIG.APP_ID,
      redirect_uri: INSTAGRAM_CONFIG.REDIRECT_URI,
      scope: scopesString,
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
   * Access token을 사용하여 사용자의 Threads 정보 조회 (threads_basic 권한 필요)
   * @param {string} accessToken - Instagram access token
   */
  static async getThreadsProfile(accessToken) {
    try {
      const params = new URLSearchParams({
        fields: 'id,username,name,biography',
        access_token: accessToken
      })

      const response = await fetch(
        `https://graph.threads.com/${INSTAGRAM_CONFIG.GRAPH_VERSION}/me?${params.toString()}`
      )

      if (!response.ok) {
        throw new Error('Failed to fetch Threads profile')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching Threads profile:', error)
      throw error
    }
  }

  /**
   * 키워드로 Threads 검색 (threads_keyword_search 권한 필요)
   * @param {string} keyword - 검색 키워드
   * @param {string} accessToken - Instagram access token
   */
  static async searchThreads(keyword, accessToken) {
    try {
      const params = new URLSearchParams({
        q: keyword,
        fields: 'id,text,timestamp,username,like_count,comments_count',
        access_token: accessToken
      })

      const response = await fetch(
        `https://graph.threads.com/${INSTAGRAM_CONFIG.GRAPH_VERSION}/ig_hashtag_search?${params.toString()}`
      )

      if (!response.ok) {
        throw new Error('Failed to search Threads')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error searching Threads:', error)
      throw error
    }
  }

  /**
   * 특정 Threads 게시물의 답글 조회 (threads_read_replies 권한 필요)
   * @param {string} threadId - Threads 게시물 ID
   * @param {string} accessToken - Instagram access token
   */
  static async getThreadReplies(threadId, accessToken) {
    try {
      const params = new URLSearchParams({
        fields: 'id,text,timestamp,username,like_count,replies_count',
        access_token: accessToken
      })

      const response = await fetch(
        `https://graph.threads.com/${INSTAGRAM_CONFIG.GRAPH_VERSION}/${threadId}/replies?${params.toString()}`
      )

      if (!response.ok) {
        throw new Error('Failed to fetch thread replies')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching thread replies:', error)
      throw error
    }
  }

  /**
   * 특정 키워드를 포함한 Threads 게시물 조회 (threads_keyword_search 권한 필요)
   * @param {string} keyword - 검색 키워드
   * @param {string} accessToken - Instagram access token
   */
  static async getThreadsByKeyword(keyword, accessToken) {
    try {
      const params = new URLSearchParams({
        q: keyword,
        fields: 'id,text,timestamp,username,like_count,comments_count',
        access_token: accessToken
      })

      const response = await fetch(
        `https://graph.threads.com/${INSTAGRAM_CONFIG.GRAPH_VERSION}/ig_hashtag_search?${params.toString()}`
      )

      if (!response.ok) {
        throw new Error('Failed to search by keyword')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error searching by keyword:', error)
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

  /**
   * 권한이 있는지 확인
   * @param {string[]} requiredPermissions - 필요한 권한 배열
   * @param {string[]} grantedPermissions - 부여된 권한 배열
   */
  static hasPermissions(requiredPermissions, grantedPermissions) {
    return requiredPermissions.every(perm => grantedPermissions.includes(perm))
  }

  /**
   * 권한 요청 상태 확인
   * @param {string} permission - 확인할 권한
   */
  static getPermissionStatus(permission) {
    const auth = this.getStoredAuth()
    const grantedPermissions = auth?.grantedPermissions || []
    
    return {
      permission,
      isGranted: grantedPermissions.includes(permission),
      description: INSTAGRAM_CONFIG.SCOPE_DESCRIPTIONS[permission]
    }
  }
}

export default InstagramAuthService
