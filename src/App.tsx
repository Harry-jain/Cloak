import React, { useState } from 'react'
import RadarPage from './pages/RadarPage'
import ChatPage from './pages/ChatPage'
import SettingsPage from './pages/SettingsPage'
import BottomNavigation from './components/BottomNavigation'
import { AppView, Peer } from './types'

function App() {
  const [currentView, setCurrentView] = useState<AppView>('radar')
  const [selectedPeer, setSelectedPeer] = useState<Peer | null>(null)

  const handlePeerSelect = (peer: Peer) => {
    setSelectedPeer(peer)
    setCurrentView('chat')
  }

  const handleBackToRadar = () => {
    setSelectedPeer(null)
    setCurrentView('radar')
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'radar':
        return <RadarPage onPeerSelect={handlePeerSelect} />
      case 'chat':
        return <ChatPage peer={selectedPeer} onBack={handleBackToRadar} />
      case 'settings':
        return <SettingsPage />
      default:
        return <RadarPage onPeerSelect={handlePeerSelect} />
    }
  }

  return (
    <div className="container">
      {renderCurrentView()}
      <BottomNavigation
        currentView={currentView}
        onViewChange={setCurrentView}
      />
    </div>
  )
}

export default App