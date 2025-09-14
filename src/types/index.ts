export interface Peer {
  id: string;
  alias: string;
  distance: number;
  rssi: number;
  isConnected: boolean;
  lastSeen: number;
}

export interface Message {
  id: string;
  peerId: string;
  content: string;
  timestamp: number;
  isSent: boolean;
  isDelivered: boolean;
  sessionId: string;
}

export interface ChatSession {
  id: string;
  peerId: string;
  peerAlias: string;
  isActive: boolean;
  createdAt: number;
  lastMessageAt: number;
}

export type AppView = 'radar' | 'chat' | 'settings';