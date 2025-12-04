// Instagram OAuth 설정
export const INSTAGRAM_CONFIG = {
  // Meta Developer Console에서 발급받은 App ID
  APP_ID: import.meta.env.VITE_INSTAGRAM_APP_ID || 'YOUR_INSTAGRAM_APP_ID',
  
  // OAuth 리다이렉트 URI
  REDIRECT_URI: import.meta.env.VITE_REDIRECT_URI || 'http://localhost:5173/auth/callback',
  
  // Threads API 권한
  SCOPES: [
    'user_profile',     // 사용자 프로필 정보
    'user_media',       // 사용자 미디어 정보
    'threads_basic',    // Threads 기본 권한
    'threads_read_replies',      // Threads 답글 읽기
    'threads_keyword_search'     // Threads 키워드 검색
  ],
  
  // 권한 설명
  SCOPE_DESCRIPTIONS: {
    user_profile: {
      name: 'Profile Info',
      displayName: '프로필 정보',
      description: '사용자명, 프로필 사진 등 기본 정보에 액세스합니다.',
      icon: '👤'
    },
    user_media: {
      name: 'Media Access',
      displayName: '미디어 정보',
      description: '게시된 미디어의 목록과 정보에 액세스합니다.',
      icon: '📸'
    },
    threads_basic: {
      name: 'threads_basic',
      displayName: 'Threads 기본 기능',
      description: 'Show your connected Threads profile and connection status inside this app.',
      icon: '📱',
      isRequired: true
    },
    threads_read_replies: {
      name: 'threads_read_replies',
      displayName: 'Threads 답글 읽기',
      description: 'Retrieve replies to your Threads posts so you can review and respond to conversations from this dashboard.',
      icon: '💬',
      isRequired: true
    },
    threads_keyword_search: {
      name: 'threads_keyword_search',
      displayName: 'Threads 키워드 검색',
      description: 'Retrieve public Threads posts matching predefined keywords you configure (e.g., brand name, product name, campaign hashtag), and display them in the monitoring dashboard.',
      icon: '🔍',
      isRequired: true
    }
  },
  
  // Instagram Graph API 버전
  GRAPH_VERSION: 'v18.0',
  
  // OAuth 엔드포인트
  AUTH_ENDPOINT: 'https://api.instagram.com/oauth/authorize',
  TOKEN_ENDPOINT: 'https://graph.instagram.com/v18.0/oauth/access_token',
  
  // 백엔드 API 설정
  BACKEND_API: import.meta.env.VITE_BACKEND_API || 'http://localhost:3001/api'
}
