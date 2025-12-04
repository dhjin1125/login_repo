import { useState } from 'react'
import { INSTAGRAM_CONFIG } from '../config/instagram.config'
import '../styles/PermissionsDialog.css'

function PermissionsDialog({ isOpen, onClose, onConfirm }) {
  const [selectedPermissions, setSelectedPermissions] = useState(new Set([
    'threads_basic',
    'threads_read_replies',
    'threads_keyword_search'
  ]))

  const requiredPermissions = ['threads_basic', 'threads_read_replies', 'threads_keyword_search']

  const handlePermissionToggle = (scope) => {
    // 필수 권한은 선택 해제 불가
    if (requiredPermissions.includes(scope)) {
      return
    }

    const newPermissions = new Set(selectedPermissions)
    if (newPermissions.has(scope)) {
      newPermissions.delete(scope)
    } else {
      newPermissions.add(scope)
    }
    setSelectedPermissions(newPermissions)
  }

  const handleConfirm = () => {
    onConfirm(Array.from(selectedPermissions))
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="permissions-dialog-overlay">
      <div className="permissions-dialog-content">
        {/* 헤더 */}
        <div className="dialog-header">
          <h2>🔐 필수 권한 요청</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {/* 설명 */}
        <div className="dialog-description">
          <p>To use this feature, you will connect your Threads account and grant the following permissions:</p>
        </div>

        {/* 권한 목록 */}
        <div className="permissions-dialog-list">
          {requiredPermissions.map((scope) => {
            const desc = INSTAGRAM_CONFIG.SCOPE_DESCRIPTIONS[scope]
            return (
              <div key={scope} className="permission-dialog-item">
                <div className="permission-icon-large">
                  {desc?.icon || '🔒'}
                </div>
                <div className="permission-content">
                  <h3>{desc?.name}</h3>
                  <p>{desc?.description}</p>
                </div>
                <div className="permission-check">✓</div>
              </div>
            )
          })}
        </div>

        {/* 주의사항 */}
        <div className="dialog-notice">
          <p>
            <strong>💡 주의:</strong> 이 기능을 사용하려면 Threads 계정에 연결되어 있어야 하며, 위의 권한을 부여해야 합니다.
          </p>
        </div>

        {/* 버튼 */}
        <div className="dialog-buttons">
          <button className="dialog-cancel-btn" onClick={onClose}>
            취소
          </button>
          <button className="dialog-confirm-btn" onClick={handleConfirm}>
            권한 부여 및 계속
          </button>
        </div>

        {/* 보안 정보 */}
        <div className="dialog-security">
          <p>🔒 귀하의 정보는 Instagram의 보안 정책에 따라 안전하게 보호됩니다.</p>
        </div>
      </div>
    </div>
  )
}

export default PermissionsDialog
