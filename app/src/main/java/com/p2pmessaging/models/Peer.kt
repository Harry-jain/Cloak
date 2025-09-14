package com.p2pmessaging.models

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "peers")
data class Peer(
    @PrimaryKey val id: String,
    val alias: String,
    val distance: Float, // Estimated from RSSI
    val rssi: Int,
    val isConnected: Boolean = false,
    val lastSeen: Long = System.currentTimeMillis()
)