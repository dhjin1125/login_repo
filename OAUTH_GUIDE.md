# Instagram OAuth 로그인 구현 가이드

Instagram OAuth를 통한 로그인 기능이 구현되었습니다. 이 가이드는 설정 및 사용 방법을 설명합니다.

## 프로젝트 구조

```
src/
├── pages/
│   ├── LoginPage.jsx          # 로그인 페이지
│   ├── MainPage.jsx           # 메인 페이지 (로그인 후)
│   └── AuthCallback.jsx       # OAuth 콜백 처리
├── services/
│   └── InstagramAuthService.js # Instagram API 호출 서비스
├── config/
│   └── instagram.config.js     # Instagram OAuth 설정
├── styles/
│   ├── LoginPage.css           # 로그인 페이지 스타일
│   └── MainPage.css            # 메인 페이지 스타일
├── App.jsx                     # 라우팅 설정
└── main.jsx                    # 진입점
```

## 주요 기능

### 1. 로그인 페이지 (`LoginPage.jsx`)
- Instagram 로그인 버튼 제공
- 안전한 OAuth 인증 흐름

### 2. 메인 페이지 (`MainPage.jsx`)
- 로그인 후 사용자 정보 표시
- 사용자 프로필 이미지, 사용자명 표시
- 로그아웃 기능
- 다양한 기능 카드 표시

### 3. 인증 콜백 (`AuthCallback.jsx`)
- OAuth authorization code 처리
- Access token 교환

### 4. Instagram 서비스 (`InstagramAuthService.js`)
- OAuth URL 생성
- 사용자 정보 조회
- 사용자 미디어 목록 조회
- Token 유효성 검사

## 설정 방법

### Step 1: Meta Developer 계정 설정

1. [Meta Developers](https://developers.facebook.com) 방문
2. 새 앱 생성 또는 기존 앱 선택
3. "Instagram Basic Display" 또는 "Instagram Graph API" 추가
4. App ID 발급받기

### Step 2: OAuth 리다이렉트 URI 설정

Meta Developer Console에서:
```
http://localhost:5173/auth/callback  (개발 환경)
https://yourdomain.com/auth/callback (프로덕션)
```

### Step 3: 환경 변수 설정

프로젝트 루트에 `.env` 파일 생성:
```env
REACT_APP_INSTAGRAM_APP_ID=YOUR_INSTAGRAM_APP_ID
REACT_APP_REDIRECT_URI=http://localhost:5173/auth/callback
REACT_APP_BACKEND_API=http://localhost:3001/api
```

### Step 4: 백엔드 API 설정 (필수)

실제 구현을 위해서는 백엔드 API가 필요합니다:

```javascript
// POST /api/auth/instagram/token
{
  "code": "authorization_code_from_instagram"
}

// Response
{
  "accessToken": "access_token",
  "user": {
    "id": "user_id",
    "username": "username",
    "name": "Full Name",
    "profile_picture_url": "https://..."
  }
}
```

**중요**: 보안을 위해 authorization code를 access token으로 교환하는 작업은 반드시 백엔드에서 처리해야 합니다.

## 데모 모드

현재 앱은 **데모 모드**로 실행되고 있습니다. 실제 Instagram 계정 없이 로그인을 테스트할 수 있습니다.

### 데모 로그인 방법:
1. 로그인 페이지에서 "Instagram으로 로그인" 버튼 클릭
2. 자동으로 메인 페이지로 이동
3. 더미 사용자 정보 표시됨

### 데모 모드에서 실제 구현으로 변경:

`src/pages/LoginPage.jsx`에서:
```javascript
// 주석 처리된 부분을 활성화하세요
// window.location.href = authUrl

// 그리고 데모 코드는 제거하세요
// localStorage.setItem('instagramAuth', JSON.stringify(demoToken))
```

## 보안 주의사항

1. **Client Secret 노출 금지**: 절대 클라이언트 시크릿을 프론트엔드에 저장하지 마세요
2. **HTTPS 사용**: 프로덕션에서는 반드시 HTTPS를 사용하세요
3. **Token 저장**: Access token은 httpOnly 쿠키에 저장하는 것이 더 안전합니다
4. **CORS 설정**: 백엔드에서 적절한 CORS 설정을 해주세요

## 라우팅 구조

```
/login           → 로그인 페이지
/auth/callback   → OAuth 콜백 처리
/                → 메인 페이지 (인증 필요)
```

로그인하지 않은 상태로 `/`에 접근하면 자동으로 `/login`으로 리다이렉트됩니다.

## 사용되는 라이브러리

- `react`: UI 프레임워크
- `react-router-dom`: 라우팅 관리

## 실행 방법

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 미리보기
npm run preview
```

개발 서버는 `http://localhost:5173`에서 실행됩니다.

## 다음 단계

1. **백엔드 API 구현**: Node.js, Python, 등으로 OAuth token 교환 엔드포인트 구현
2. **사용자 정보 저장**: 데이터베이스에 사용자 정보 저장
3. **미디어 피드**: Instagram 미디어 목록 표시
4. **댓글 및 좋아요**: 게시물과 상호작용하는 기능 추가
5. **Threads API 통합**: Threads 전용 API 통합

## 문제 해결

### 1. "Instagram App ID not found" 에러
- `.env` 파일에서 `REACT_APP_INSTAGRAM_APP_ID` 설정 확인

### 2. 리다이렉트 URI 오류
- Meta Developer Console에서 리다이렉트 URI가 정확하게 설정되어 있는지 확인

### 3. CORS 에러
- 백엔드에서 CORS 설정 확인
- 프론트엔드에서 올바른 백엔드 API URL 사용

## 참고 자료

- [Meta for Developers](https://developers.facebook.com/)
- [Instagram Graph API Documentation](https://developers.facebook.com/docs/instagram-api)
- [Instagram Basic Display Documentation](https://developers.facebook.com/docs/instagram-basic-display)
- [React Router Documentation](https://reactrouter.com/)
