import React, { useState, useEffect } from 'react'
import { Peer } from '../types'
import RadarView from '../components/RadarView'
import PeerList from '../components/PeerList'

interface RadarPageProps {
  onPeerSelect: (peer: Peer) => void
}

const RadarPage: React.FC<RadarPageProps> = ({ onPeerSelect }) => {
  const [isScanning, setIsScanning] = useState(false)
  const [peers, setPeers] = useState<Peer[]>([])

  // Simulate peer discovery
  useEffect(() => {
    setIsScanning(true)
    
    const timer = setTimeout(() => {
      const simulatedPeers: Peer[] = [
        {
          id: 'peer_1',
          alias: 'User 01',
          distance: 5.2,
          rssi: -45,
          isConnected: false,
          lastSeen: Date.now()
        },
        {
          id: 'peer_2',
          alias: 'User 02',
          distance: 12.8,
          rssi: -60,
          isConnected: false,
          lastSeen: Date.now()
        },
        {
          id: 'peer_3',
          alias: 'User 03',
          distance: 8.1,
          rssi: -52,
          isConnected: false,
          lastSeen: Date.now()
        }
      ]
      setPeers(simulatedPeers)
      setIsScanning(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="app-bar">
        <h1>Nearby Peers</h1>
        <button onClick={() => window.location.reload()}>🔄</button>
      </div>
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <RadarView peers={peers} isScanning={isScanning} />
        <PeerList peers={peers} onPeerSelect={onPeerSelect} isScanning={isScanning} />
      </div>
    </div>
  )
}

export default RadarPage