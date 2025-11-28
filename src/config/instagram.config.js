// Instagram OAuth 설정
export const INSTAGRAM_CONFIG = {
  // Meta Developer Console에서 발급받은 App ID
  APP_ID: process.env.REACT_APP_INSTAGRAM_APP_ID || 'YOUR_INSTAGRAM_APP_ID',
  
  // OAuth 리다이렉트 URI
  REDIRECT_URI: process.env.REACT_APP_REDIRECT_URI || 'http://localhost:5173/auth/callback',
  
  // 요청할 권한
  SCOPES: ['user_profile', 'user_media'],
  
  // Instagram Graph API 버전
  GRAPH_VERSION: 'v18.0',
  
  // OAuth 엔드포인트
  AUTH_ENDPOINT: 'https://api.instagram.com/oauth/authorize',
  TOKEN_ENDPOINT: 'https://graph.instagram.com/v18.0/oauth/access_token',
  
  // 백엔드 API 설정
  BACKEND_API: process.env.REACT_APP_BACKEND_API || 'http://localhost:3001/api'
}
