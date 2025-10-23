import { useState } from 'react'
import './App.css'

function App() {
  const categories = [
    { id: '전체', label: '전체 인기' },
    { id: '채미', label: '채미' },
    { id: '스크루지', label: '스크루지' },
    { id: '재테크', label: '재테크' },
    { id: '개발', label: '개발' }
  ]

  const [selectedCategory, setSelectedCategory] = useState('전체')

  const featuredPost = {
    category: '채미',
    title: '채미 커뮤니티가 선택한 이번 주 핵심 전략',
    excerpt:
      '핀테크 서비스에서 바로 적용 가능한 요약 콘텐츠와 실험 로드맵을 정리했어요. 팀 미팅 전에 빠르게 훑어보세요.',
    author: '홍유진',
    date: '2024. 3. 22',
    readTime: '7분 읽기'
  }

  const posts = [
    {
      id: 1,
      category: '채미',
      title: '채미 라이브 세션으로 2배 늘어난 구독 전환율',
      summary:
        '라이브 클래스 기획부터 실시간 Q&A 운영까지, 사용자 니즈에 맞춘 편성 전략을 공개합니다.',
      stats: { likes: 982, comments: 54 }
    },
    {
      id: 2,
      category: '스크루지',
      title: '스크루지가 설계한 구독자 리텐션 자동화 5단계',
      summary:
        '온보딩 메일부터 앱 푸시까지 연결한 시퀀스를 통해 어떤 결과가 나왔는지 데이터와 함께 공유합니다.',
      stats: { likes: 861, comments: 37 }
    },
    {
      id: 3,
      category: '재테크',
      title: '재테크 뉴슬레터가 좋아요를 부른 편집 전략',
      summary:
        '투자자 페르소나를 유형별로 나눠 스토리를 구성한 방식과 KPI를 상세히 설명합니다.',
      stats: { likes: 734, comments: 28 }
    },
    {
      id: 4,
      category: '개발',
      title: '개발팀이 공개한 실시간 대시보드 캐싱 전략',
      summary:
        '신규 지표 추가를 빠르게 배포하기 위해 어떤 캐싱 레이어를 선택했는지 비교 분석했습니다.',
      stats: { likes: 688, comments: 19 }
    },
    {
      id: 5,
      category: '스크루지',
      title: '스크루지 에디터가 말하는 수익형 콘텐츠 제작 루틴',
      summary:
        '아이디어 발굴부터 광고 협업까지 이어지는 워크플로를 하루 단위로 기록했습니다.',
      stats: { likes: 642, comments: 22 }
    }
  ]

  const filteredPosts =
    selectedCategory === '전체'
      ? posts
      : posts.filter((post) => post.category === selectedCategory)

  return (
    <div className="page">
      <header className="hero">
        <p className="hero__label">오늘의 인기</p>
        <h1 className="hero__title">스레드 핫 사이트</h1>
        <p className="hero__subtitle">
          스레드에서 메이커들이 게시한 인기 게시물을 한눈에 담았어요.<br />
          매일 새로 올라오는 화제의 글을 확인해보세요.
        </p>
        <div className="hero__tags">
          <span>채미</span>
          <span>스크루지</span>
          <span>재테크</span>
          <span>개발</span>
        </div>
      </header>

      <section className="featured">
        <article className="featured__card">
          <div className="featured__meta">
            <span className="badge">{featuredPost.category}</span>
            <span className="featured__readtime">{featuredPost.readTime}</span>
          </div>
          <h2 className="featured__title">{featuredPost.title}</h2>
          <p className="featured__excerpt">{featuredPost.excerpt}</p>
          <div className="featured__footer">
            <div>
              <p className="featured__author">{featuredPost.author}</p>
              <p className="featured__date">{featuredPost.date}</p>
            </div>
            <a className="featured__link" href="#">자세히 보기 →</a>
          </div>
        </article>
      </section>

      <section className="filters" aria-label="카테고리 필터">
        <h2 className="filters__title">카테고리별 인기 글</h2>
        <div className="filters__group" role="tablist">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              role="tab"
              aria-selected={selectedCategory === category.id}
              className={`filters__chip${selectedCategory === category.id ? ' is-active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>
      </section>

      <section className="post-grid" aria-label="인기 게시물 목록">
        {filteredPosts.map((post) => (
          <article key={post.id} className="post-card">
            <p className="post-card__category">{post.category}</p>
            <h3 className="post-card__title">{post.title}</h3>
            <p className="post-card__summary">{post.summary}</p>
            <div className="post-card__meta">
              <span>👍 {post.stats.likes.toLocaleString()}</span>
              <span>💬 {post.stats.comments}</span>
            </div>
            <button type="button" className="post-card__button">
              바로 읽기
            </button>
          </article>
        ))}
      </section>
    </div>
  )
}

export default App
