import React from 'react'
import { AppView } from '../types'

interface BottomNavigationProps {
  currentView: AppView
  onViewChange: (view: AppView) => void
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  currentView,
  onViewChange,
}) => {
  return (
    <div className="bottom-nav">
      <div
        className={`nav-item ${currentView === 'radar' ? 'active' : ''}`}
        onClick={() => onViewChange('radar')}
      >
        <div style={{ fontSize: '20px' }}>📡</div>
        <span>Radar</span>
      </div>
      <div
        className={`nav-item ${currentView === 'chat' ? 'active' : ''}`}
        onClick={() => onViewChange('chat')}
      >
        <div style={{ fontSize: '20px' }}>💬</div>
        <span>Chat</span>
      </div>
      <div
        className={`nav-item ${currentView === 'settings' ? 'active' : ''}`}
        onClick={() => onViewChange('settings')}
      >
        <div style={{ fontSize: '20px' }}>⚙️</div>
        <span>Settings</span>
      </div>
    </div>
  )
}

export default BottomNavigation