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
      name: '프로필 정보',
      description: '사용자명, 프로필 사진 등 기본 정보에 액세스합니다.'
    },
    user_media: {
      name: '미디어 정보',
      description: '게시된 미디어의 목록과 정보에 액세스합니다.'
    },
    threads_basic: {
      name: 'Threads 기본 기능',
      description: 'Threads의 기본 콘텐츠와 메타데이터에 액세스합니다.'
    },
    threads_read_replies: {
      name: 'Threads 답글 읽기',
      description: 'Threads의 댓글 및 답글에 액세스합니다.'
    },
    threads_keyword_search: {
      name: 'Threads 키워드 검색',
      description: 'Threads에서 키워드로 콘텐츠를 검색합니다.'
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
