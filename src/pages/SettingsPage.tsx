import React, { useState } from 'react'

const SettingsPage: React.FC = () => {
  const [displayName, setDisplayName] = useState('')
  const [wifiDirectEnabled, setWifiDirectEnabled] = useState(true)
  const [showPanicDialog, setShowPanicDialog] = useState(false)

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="app-bar">
        <h1>Settings</h1>
      </div>
      
      <div className="page-content">
        {/* Identity Section */}
        <div style={{
          background: '#1e1e1e',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '16px'
        }}>
          <h3 style={{ marginBottom: '16px', color: '#fff' }}>Identity</h3>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Display Name"
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #444',
              borderRadius: '8px',
              background: '#2c2c2c',
              color: 'white',
              marginBottom: '8px'
            }}
          />
          <p style={{ color: '#999', fontSize: '14px', marginBottom: '16px' }}>
            This name will only be revealed when you choose to share your identity with other users.
          </p>
          <button style={{
            background: '#2196f3',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Save
          </button>
        </div>

        {/* Privacy Section */}
        <div style={{
          background: '#1e1e1e',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '16px'
        }}>
          <h3 style={{ marginBottom: '16px', color: '#fff' }}>Privacy & Security</h3>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <div>
              <div style={{ color: '#fff', fontWeight: '500' }}>Wi-Fi Direct for Large Files</div>
              <div style={{ color: '#999', fontSize: '14px' }}>
                Enable Wi-Fi Direct for faster large file transfers
              </div>
            </div>
            <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '24px' }}>
              <input
                type="checkbox"
                checked={wifiDirectEnabled}
                onChange={(e) => setWifiDirectEnabled(e.target.checked)}
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span style={{
                position: 'absolute',
                cursor: 'pointer',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: wifiDirectEnabled ? '#2196f3' : '#ccc',
                borderRadius: '24px',
                transition: '0.4s'
              }}>
                <span style={{
                  position: 'absolute',
                  content: '',
                  height: '16px',
                  width: '16px',
                  left: wifiDirectEnabled ? '28px' : '4px',
                  bottom: '4px',
                  background: 'white',
                  borderRadius: '50%',
                  transition: '0.4s'
                }} />
              </span>
            </label>
          </div>

          <button
            onClick={() => setShowPanicDialog(true)}
            style={{
              width: '100%',
              background: '#f44336',
              color: 'white',
              border: 'none',
              padding: '12px',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            ⚠️ Panic Wipe
          </button>
        </div>

        {/* About Section */}
        <div style={{
          background: '#1e1e1e',
          borderRadius: '8px',
          padding: '16px'
        }}>
          <h3 style={{ marginBottom: '16px', color: '#fff' }}>About</h3>
          <div style={{ color: '#fff', marginBottom: '8px' }}>
            Claok v1.0
          </div>
          <p style={{ color: '#999', fontSize: '14px' }}>
            Anonymous peer-to-peer messaging over Bluetooth LE. This demo showcases the UI design - actual Bluetooth communication and encryption are not yet implemented.
          </p>
        </div>
      </div>

      {/* Panic Dialog */}
      {showPanicDialog && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: '#1e1e1e',
            borderRadius: '8px',
            padding: '20px',
            maxWidth: '300px',
            width: '100%'
          }}>
            <h3 style={{ color: '#fff', marginBottom: '16px' }}>Panic Wipe</h3>
            <p style={{ color: '#999', marginBottom: '20px' }}>
              This will permanently delete all messages and session data. Are you sure?
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setShowPanicDialog(false)}
                style={{
                  flex: 1,
                  background: '#666',
                  color: 'white',
                  border: 'none',
                  padding: '8px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                No
              </button>
              <button
                onClick={() => {
                  // Simulate panic wipe
                  alert('All data wiped!')
                  setShowPanicDialog(false)
                }}
                style={{
                  flex: 1,
                  background: '#f44336',
                  color: 'white',
                  border: 'none',
                  padding: '8px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SettingsPage