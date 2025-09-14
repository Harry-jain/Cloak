package com.p2pmessaging.models

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "messages")
data class Message(
    @PrimaryKey val id: String,
    val peerId: String,
    val content: String,
    val timestamp: Long,
    val isSent: Boolean,
    val isDelivered: Boolean = false,
    val sessionId: String
)