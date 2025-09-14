import React, { useState, useEffect } from 'react'
import { Peer, Message } from '../types'

interface ChatPageProps {
  peer: Peer | null
  onBack: () => void
}

const ChatPage: React.FC<ChatPageProps> = ({ peer, onBack }) => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    // Simulate receiving a welcome message
    if (peer) {
      const welcomeMessage: Message = {
        id: 'welcome',
        peerId: peer.id,
        content: 'Hello! This is a simulated P2P chat session.',
        timestamp: Date.now(),
        isSent: false,
        isDelivered: true,
        sessionId: `session_${peer.id}`
      }
      setMessages([welcomeMessage])
    }
  }, [peer])

  const sendMessage = () => {
    if (!message.trim() || !peer) return

    const newMessage: Message = {
      id: Date.now().toString(),
      peerId: peer.id,
      content: message.trim(),
      timestamp: Date.now(),
      isSent: true,
      isDelivered: true,
      sessionId: `session_${peer.id}`
    }

    setMessages(prev => [...prev, newMessage])
    setMessage('')

    // Simulate a response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        peerId: peer.id,
        content: 'Message received! (Encryption not yet implemented)',
        timestamp: Date.now(),
        isSent: false,
        isDelivered: true,
        sessionId: `session_${peer.id}`
      }
      setMessages(prev => [...prev, response])
    }, 1000)
  }

  if (!peer) {
    return (
      <div className="app-bar">
        <h1>No peer selected</h1>
        <button onClick={onBack}>←</button>
      </div>
    )
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="app-bar">
        <button onClick={onBack}>←</button>
        <h1>{peer.alias}</h1>
        <button>🔐</button>
      </div>
      
      <div style={{
        flex: 1,
        padding: '16px',
        overflowY: 'auto',
        paddingBottom: '80px'
      }}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: 'flex',
              justifyContent: msg.isSent ? 'flex-end' : 'flex-start',
              marginBottom: '16px'
            }}
          >
            <div style={{
              maxWidth: '280px',
              padding: '12px',
              borderRadius: '16px',
              background: msg.isSent ? '#2196f3' : '#424242',
              color: 'white'
            }}>
              <div>{msg.content}</div>
              <div style={{
                fontSize: '12px',
                opacity: 0.7,
                marginTop: '4px'
              }}>
                {new Date(msg.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        position: 'fixed',
        bottom: '70px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '400px',
        padding: '16px',
        background: '#1e1e1e',
        borderTop: '1px solid #333'
      }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
            style={{
              flex: 1,
              padding: '12px',
              border: '1px solid #444',
              borderRadius: '8px',
              background: '#2c2c2c',
              color: 'white'
            }}
          />
          <button
            onClick={sendMessage}
            disabled={!message.trim()}
            style={{
              padding: '12px 16px',
              background: message.trim() ? '#2196f3' : '#666',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatPage