import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { INSTAGRAM_CONFIG } from '../config/instagram.config'
import PermissionsDialog from '../components/PermissionsDialog'
import '../styles/PermissionsPage.css'

function PermissionsPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [selectedPermissions, setSelectedPermissions] = useState(new Set())
  const [loading, setLoading] = useState(false)
  const [showDialog, setShowDialog] = useState(false)

  // 모든 권한을 기본으로 선택
  useEffect(() => {
    setSelectedPermissions(new Set(INSTAGRAM_CONFIG.SCOPES))
  }, [])

  const handlePermissionToggle = (scope) => {
    const newPermissions = new Set(selectedPermissions)
    if (newPermissions.has(scope)) {
      newPermissions.delete(scope)
    } else {
      newPermissions.add(scope)
    }
    setSelectedPermissions(newPermissions)
  }

  const handleSelectAll = () => {
    setSelectedPermissions(new Set(INSTAGRAM_CONFIG.SCOPES))
  }

  const handleDeselectAll = () => {
    setSelectedPermissions(new Set())
  }

  const handleContinue = () => {
    if (selectedPermissions.size === 0) {
      alert('최소한 하나의 권한을 선택해주세요.')
      return
    }

    setLoading(true)

    // 선택된 권한을 세션 스토리지에 저장
    sessionStorage.setItem('selectedPermissions', JSON.stringify(Array.from(selectedPermissions)))

    // 로그인 페이지로 이동 (권한 정보 포함)
    setTimeout(() => {
      navigate('/login', { state: { selectedPermissions: Array.from(selectedPermissions) } })
    }, 500)
  }

  return (
    <div className="permissions-container">
      <div className="permissions-box">
        <div className="permissions-header">
          <h1>🔐 권한 요청</h1>
          <p>앱이 필요로 하는 권한을 선택해주세요</p>
        </div>

        {/* 필수 권한 소개 배너 */}
        <div className="required-permissions-banner">
          <button 
            className="info-banner-btn"
            onClick={() => setShowDialog(true)}
          >
            <span className="banner-icon">ℹ️</span>
            <span className="banner-text">필수 권한에 대해 알아보기</span>
            <span className="banner-arrow">→</span>
          </button>
        </div>

        <div className="permissions-intro">
          <p>이 앱은 다음 권한을 사용하여 더 나은 경험을 제공합니다:</p>
        </div>

        {/* 권한 목록 */}
        <div className="permissions-list">
          {INSTAGRAM_CONFIG.SCOPES.map((scope) => (
            <div key={scope} className="permission-item">
              <input
                type="checkbox"
                id={`permission-${scope}`}
                checked={selectedPermissions.has(scope)}
                onChange={() => handlePermissionToggle(scope)}
                className="permission-checkbox"
              />
              <label htmlFor={`permission-${scope}`} className="permission-label">
                <div className="permission-title">
                  {INSTAGRAM_CONFIG.SCOPE_DESCRIPTIONS[scope]?.name || scope}
                </div>
                <div className="permission-description">
                  {INSTAGRAM_CONFIG.SCOPE_DESCRIPTIONS[scope]?.description || ''}
                </div>
              </label>
            </div>
          ))}
        </div>

        {/* 권한 선택 도구 */}
        <div className="permission-actions">
          <button onClick={handleSelectAll} className="action-btn select-all-btn">
            모두 선택
          </button>
          <button onClick={handleDeselectAll} className="action-btn deselect-all-btn">
            모두 해제
          </button>
        </div>

        {/* 선택된 권한 요약 */}
        <div className="permissions-summary">
          <h3>선택된 권한 ({selectedPermissions.size}/{INSTAGRAM_CONFIG.SCOPES.length})</h3>
          {selectedPermissions.size > 0 ? (
            <div className="selected-permissions">
              {Array.from(selectedPermissions).map((scope) => (
                <span key={scope} className="permission-tag">
                  {INSTAGRAM_CONFIG.SCOPE_DESCRIPTIONS[scope]?.name || scope}
                  <button
                    onClick={() => handlePermissionToggle(scope)}
                    className="remove-btn"
                    title="제거"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          ) : (
            <p className="no-permissions">선택된 권한이 없습니다</p>
          )}
        </div>

        {/* 설명 박스 */}
        <div className="info-box">
          <h4>📌 권한 정보</h4>
          <ul>
            <li><strong>프로필 정보:</strong> 계정 인증 및 사용자 정보 표시에 필요합니다</li>
            <li><strong>Threads 기본 기능:</strong> Threads 글과 정보를 읽기 위해 필요합니다</li>
            <li><strong>Threads 답글 읽기:</strong> 댓글과 답글 정보를 표시하기 위해 필요합니다</li>
            <li><strong>Threads 키워드 검색:</strong> 키워드로 글을 검색하기 위해 필요합니다</li>
          </ul>
        </div>

        {/* 버튼 */}
        <div className="button-group">
          <button
            onClick={() => navigate('/login')}
            className="cancel-btn"
            disabled={loading}
          >
            기본 권한으로 진행
          </button>
          <button
            onClick={handleContinue}
            className="continue-btn"
            disabled={loading || selectedPermissions.size === 0}
          >
            {loading ? '처리 중...' : '권한 선택 완료'}
          </button>
        </div>

        <p className="privacy-note">
          💡 선택한 권한은 Instagram의 보안 정책에 따라 안전하게 관리됩니다
        </p>
      </div>

      {/* 권한 다이얼로그 */}
      <PermissionsDialog 
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
        onConfirm={(permissions) => {
          setSelectedPermissions(new Set(permissions))
        }}
      />
    </div>
  )
}

export default PermissionsPage
