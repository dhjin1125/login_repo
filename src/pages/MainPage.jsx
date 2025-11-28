import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { INSTAGRAM_CONFIG } from '../config/instagram.config'
import '../styles/MainPage.css'

// 더미 스레드 데이터
const DUMMY_THREADS = [
  {
    id: 1,
    keyword: 'React',
    content: 'React 18의 새로운 기능들에 대해 알아봤습니다. Suspense와 Transition을 사용하면 사용자 경험을 크게 개선할 수 있어요.',
    author: 'frontend_dev',
    comments: 24,
    likes: 156,
    timestamp: '2시간 전'
  },
  {
    id: 2,
    keyword: '성능 최적화',
    content: '번들 사이즈를 50% 줄이는 방법. Tree shaking과 Code splitting을 제대로 활용하면 초기 로딩 시간을 대폭 단축할 수 있습니다.',
    author: 'web_optimizer',
    comments: 18,
    likes: 203,
    timestamp: '4시간 전'
  },
  {
    id: 3,
    keyword: 'JavaScript',
    content: '비동기 프로그래밍의 패턴들을 정리해봤습니다. Callback, Promise, Async/Await의 차이점과 사용 시나리오를 설명했어요.',
    author: 'js_master',
    comments: 42,
    likes: 289,
    timestamp: '5시간 전'
  },
  {
    id: 4,
    keyword: 'CSS',
    content: 'CSS Grid와 Flexbox를 언제 써야 할까요? 레이아웃 상황에 따른 최적의 선택을 알려드립니다.',
    author: 'design_coder',
    comments: 31,
    likes: 174,
    timestamp: '6시간 전'
  },
  {
    id: 5,
    keyword: '웹 보안',
    content: 'XSS, CSRF, SQL Injection 공격을 방어하는 방법들을 정리했습니다. 보안은 선택이 아닌 필수입니다!',
    author: 'security_expert',
    comments: 56,
    likes: 312,
    timestamp: '8시간 전'
  },
  {
    id: 6,
    keyword: 'TypeScript',
    content: 'TypeScript의 제네릭(Generics)을 제대로 이해하면 타입 안정성이 크게 향상됩니다. 실무 예제와 함께 설명했어요.',
    author: 'ts_enthusiast',
    comments: 27,
    likes: 198,
    timestamp: '10시간 전'
  }
]

function MainPage() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [threads, setThreads] = useState([])
  const [searchKeyword, setSearchKeyword] = useState('')
  const [grantedPermissions, setGrantedPermissions] = useState([])

  useEffect(() => {
    // 로그인 상태 확인
    const authData = localStorage.getItem('instagramAuth')
    
    if (!authData) {
      // 로그인하지 않은 경우 권한 페이지로 이동
      navigate('/permissions')
    } else {
      // 사용자 정보 설정
      const userData = JSON.parse(authData)
      setUser(userData.user)
      setGrantedPermissions(userData.grantedPermissions || INSTAGRAM_CONFIG.SCOPES)
      
      // 더미 스레드 데이터 로드
      setThreads(DUMMY_THREADS)
      setLoading(false)
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('instagramAuth')
    navigate('/login')
  }

  // 키워드로 필터링된 스레드 검색
  const filteredThreads = threads.filter(thread => 
    searchKeyword === '' || 
    thread.keyword.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    thread.content.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    thread.author.toLowerCase().includes(searchKeyword.toLowerCase())
  )

  if (loading) {
    return <div className="loading">로딩 중...</div>
  }

  return (
    <div className="main-container">
      <header className="header">
        <div className="header-content">
          <h1>Threads</h1>
          <div className="user-menu">
            {user && (
              <>
                <img src={user.profile_picture_url} alt={user.username} className="profile-pic" />
                <span className="username">@{user.username}</span>
                <button onClick={handleLogout} className="logout-btn">
                  로그아웃
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="welcome-section">
          <h2>환영합니다, {user?.name}! 👋</h2>
          <p>최신 Threads 글들을 확인해보세요</p>
        </div>

        {/* 권한 정보 카드 */}
        <div className="permissions-card">
          <div className="permissions-header-title">
            <span className="lock-icon">🔐</span>
            <h3>부여된 권한</h3>
          </div>
          <div className="permissions-grid">
            {grantedPermissions.map((perm) => (
              <div key={perm} className="permission-item-card">
                <div className="perm-icon">
                  {perm === 'user_profile' && '👤'}
                  {perm === 'user_media' && '📸'}
                  {perm === 'threads_basic' && '📱'}
                  {perm === 'threads_read_replies' && '💬'}
                  {perm === 'threads_keyword_search' && '🔍'}
                </div>
                <div className="perm-name">
                  {INSTAGRAM_CONFIG.SCOPE_DESCRIPTIONS[perm]?.name || perm}
                </div>
                <div className="perm-check">✓</div>
              </div>
            ))}
          </div>
        </div>

        {/* 기능 안내 */}
        {grantedPermissions.includes('threads_keyword_search') && (
          <div className="feature-info-box">
            <span className="info-icon">🔍</span>
            <p><strong>키워드 검색:</strong> 활성화됨 - 아래 검색창에서 Threads를 검색할 수 있습니다</p>
          </div>
        )}

        {grantedPermissions.includes('threads_read_replies') && (
          <div className="feature-info-box">
            <span className="info-icon">💬</span>
            <p><strong>댓글 보기:</strong> 활성화됨 - 각 게시물의 댓글 수를 확인할 수 있습니다</p>
          </div>
        )}

        {/* 검색 바 */}
        {grantedPermissions.includes('threads_keyword_search') && (
          <div className="search-section">
            <input
              type="text"
              placeholder="키워드로 검색해보세요 (예: React, JavaScript, 성능 최적화)"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="search-input"
            />
            <div className="search-hint">💡 키워드로 Threads를 검색하고 관련 댓글을 확인하세요</div>
          </div>
        )}

        {/* 스레드 목록 */}
        <div className="threads-section">
          <h3 className="threads-title">
            Threads 피드 {searchKeyword && `- "${searchKeyword}" 검색 결과 ${filteredThreads.length}개`}
          </h3>
          
          {filteredThreads.length === 0 ? (
            <div className="no-threads">
              <p>검색 결과가 없습니다. 다른 키워드를 시도해보세요.</p>
            </div>
          ) : (
            <div className="threads-list">
              {filteredThreads.map((thread) => (
                <article key={thread.id} className="thread-card">
                  <div className="thread-header">
                    <span className="keyword-badge">{thread.keyword}</span>
                    <span className="timestamp">{thread.timestamp}</span>
                  </div>
                  
                  <p className="thread-content">{thread.content}</p>
                  
                  <div className="thread-author">
                    <span className="author-name">@{thread.author}</span>
                  </div>
                  
                  <div className="thread-stats">
                    {grantedPermissions.includes('threads_read_replies') && (
                      <div className="stat-item">
                        <span className="stat-icon">💬</span>
                        <span className="stat-label">댓글</span>
                        <span className="stat-value">{thread.comments}</span>
                      </div>
                    )}
                    <div className="stat-item">
                      <span className="stat-icon">❤️</span>
                      <span className="stat-label">좋아요</span>
                      <span className="stat-value">{thread.likes}</span>
                    </div>
                  </div>

                  {grantedPermissions.includes('threads_read_replies') && thread.comments > 0 && (
                    <div className="thread-replies-info">
                      <span>💭 {thread.comments}개의 답글이 있습니다</span>
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default MainPage
