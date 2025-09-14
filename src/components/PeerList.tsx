import React from 'react'
import { Peer } from '../types'

interface PeerListProps {
  peers: Peer[]
  onPeerSelect: (peer: Peer) => void
  isScanning: boolean
}

const PeerList: React.FC<PeerListProps> = ({ peers, onPeerSelect, isScanning }) => {
  return (
    <div style={{
      background: '#1e1e1e',
      margin: '16px',
      borderRadius: '8px',
      padding: '16px'
    }}>
      <h3 style={{ marginBottom: '16px', color: '#fff' }}>
        {peers.length > 0 ? 'Nearby Peers' : 'No peers found'}
      </h3>
      
      {isScanning && peers.length === 0 && (
        <div style={{ color: '#999', textAlign: 'center', padding: '20px' }}>
          Scanning for peers...
        </div>
      )}
      
      {peers.map((peer) => (
        <div
          key={peer.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 0',
            borderBottom: '1px solid #333',
            cursor: 'pointer'
          }}
          onClick={() => onPeerSelect(peer)}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: '#2196f3',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '12px'
            }}>
              👤
            </div>
            <div>
              <div style={{ color: '#fff', fontWeight: '500' }}>{peer.alias}</div>
              <div style={{ color: '#999', fontSize: '14px' }}>
                {peer.distance.toFixed(1)}m away
              </div>
            </div>
          </div>
          <button style={{
            background: '#2196f3',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Connect
          </button>
        </div>
      ))}
    </div>
  )
}

export default PeerList