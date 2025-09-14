package com.p2pmessaging.viewmodel

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import com.p2pmessaging.models.Peer
import com.p2pmessaging.models.Message

class BluetoothViewModel(application: Application) : AndroidViewModel(application) {
    
    private val _peers = MutableStateFlow<List<Peer>>(emptyList())
    val peers: StateFlow<List<Peer>> = _peers.asStateFlow()
    
    private val _messages = MutableStateFlow<List<Message>>(emptyList())
    val messages: StateFlow<List<Message>> = _messages.asStateFlow()
    
    private val _isScanning = MutableStateFlow(false)
    val isScanning: StateFlow<Boolean> = _isScanning.asStateFlow()
    
    private val _connectedPeer = MutableStateFlow<Peer?>(null)
    val connectedPeer: StateFlow<Peer?> = _connectedPeer.asStateFlow()
    
    fun startScanning() {
        viewModelScope.launch {
            _isScanning.value = true
            // TODO: Implement actual BLE scanning
            // For now, simulate finding peers
            simulatePeerDiscovery()
        }
    }
    
    fun stopScanning() {
        _isScanning.value = false
    }
    
    fun connectToPeer(peer: Peer) {
        viewModelScope.launch {
            // TODO: Implement actual Bluetooth connection
            _connectedPeer.value = peer.copy(isConnected = true)
        }
    }
    
    fun sendMessage(content: String, peerId: String) {
        viewModelScope.launch {
            val message = Message(
                id = System.currentTimeMillis().toString(),
                peerId = peerId,
                content = content,
                timestamp = System.currentTimeMillis(),
                isSent = true,
                sessionId = "session_$peerId"
            )
            
            val currentMessages = _messages.value.toMutableList()
            currentMessages.add(message)
            _messages.value = currentMessages
            
            // TODO: Implement actual message sending over Bluetooth
        }
    }
    
    private suspend fun simulatePeerDiscovery() {
        // Simulate finding nearby peers for demo purposes
        val simulatedPeers = listOf(
            Peer(
                id = "peer_1",
                alias = "User 01",
                distance = 5.2f,
                rssi = -45
            ),
            Peer(
                id = "peer_2", 
                alias = "User 02",
                distance = 12.8f,
                rssi = -60
            ),
            Peer(
                id = "peer_3",
                alias = "User 03", 
                distance = 8.1f,
                rssi = -52
            )
        )
        
        _peers.value = simulatedPeers
    }
}