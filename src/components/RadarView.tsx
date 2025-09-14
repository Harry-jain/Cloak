import React, { useRef, useEffect } from 'react'
import { Peer } from '../types'

interface RadarViewProps {
  peers: Peer[]
  isScanning: boolean
}

const RadarView: React.FC<RadarViewProps> = ({ peers, isScanning }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const size = 280
    canvas.width = size
    canvas.height = size
    
    // Clear canvas
    ctx.fillStyle = '#121212'
    ctx.fillRect(0, 0, size, size)
    
    const center = size / 2
    const maxRadius = center - 20

    // Draw radar circles
    ctx.strokeStyle = '#404040'
    ctx.lineWidth = 2
    for (let i = 1; i <= 3; i++) {
      ctx.beginPath()
      ctx.arc(center, center, (maxRadius * i) / 3, 0, 2 * Math.PI)
      ctx.stroke()
    }

    // Draw crosshairs
    ctx.strokeStyle = '#404040'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(center, 0)
    ctx.lineTo(center, size)
    ctx.moveTo(0, center)
    ctx.lineTo(size, center)
    ctx.stroke()

    // Draw peers
    peers.forEach((peer, index) => {
      const angle = (index * 2 * Math.PI) / 6 + (Date.now() / 1000) * 0.1 // Rotating animation
      const normalizedDistance = Math.min(peer.distance / 20, 1)
      const peerRadius = maxRadius * normalizedDistance

      const x = center + Math.cos(angle) * peerRadius
      const y = center + Math.sin(angle) * peerRadius

      ctx.fillStyle = '#00ff00'
      ctx.beginPath()
      ctx.arc(x, y, 6, 0, 2 * Math.PI)
      ctx.fill()

      // Add glow effect
      ctx.shadowColor = '#00ff00'
      ctx.shadowBlur = 10
      ctx.beginPath()
      ctx.arc(x, y, 4, 0, 2 * Math.PI)
      ctx.fill()
      ctx.shadowBlur = 0
    })

    // Draw scanning animation
    if (isScanning) {
      const sweepAngle = (Date.now() / 10) % 360
      ctx.save()
      ctx.translate(center, center)
      ctx.rotate((sweepAngle * Math.PI) / 180)
      
      const gradient = ctx.createLinearGradient(0, 0, maxRadius, 0)
      gradient.addColorStop(0, 'rgba(0, 255, 0, 0.3)')
      gradient.addColorStop(1, 'rgba(0, 255, 0, 0)')
      
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(0, 0, maxRadius, 0, Math.PI / 4)
      ctx.lineTo(0, 0)
      ctx.fill()
      ctx.restore()
    }
  }, [peers, isScanning])

  // Animation loop for scanning
  useEffect(() => {
    if (!isScanning) return

    const interval = setInterval(() => {
      // Force redraw for animation
      const canvas = canvasRef.current
      if (canvas) {
        const event = new Event('redraw')
        canvas.dispatchEvent(event)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [isScanning])

  return (
    <div style={{
      background: '#121212',
      padding: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative'
    }}>
      <canvas
        ref={canvasRef}
        style={{
          border: '1px solid #404040',
          borderRadius: '50%'
        }}
      />
      {isScanning && (
        <div style={{
          position: 'absolute',
          color: '#00ff00',
          fontSize: '12px',
          bottom: '10px'
        }}>
          Scanning for peers...
        </div>
      )}
    </div>
  )
}

export default RadarView