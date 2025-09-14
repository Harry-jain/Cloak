package com.p2pmessaging.ui.screens

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.drawscope.DrawScope
import androidx.compose.ui.platform.LocalDensity
// import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
// import com.p2pmessaging.R // Using direct strings for now
import com.p2pmessaging.models.Peer
import com.p2pmessaging.ui.theme.RadarBackground
import com.p2pmessaging.ui.theme.RadarCircle
import com.p2pmessaging.ui.theme.PeerDot
import com.p2pmessaging.viewmodel.BluetoothViewModel
import kotlin.math.*

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun RadarScreen(
    bluetoothViewModel: BluetoothViewModel,
    onNavigateToChat: (String) -> Unit,
    onNavigateToSettings: () -> Unit
) {
    val peers by bluetoothViewModel.peers.collectAsState()
    val isScanning by bluetoothViewModel.isScanning.collectAsState()
    
    // Start scanning when screen is displayed
    LaunchedEffect(Unit) {
        bluetoothViewModel.startScanning()
    }
    
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(MaterialTheme.colorScheme.background)
    ) {
        // Top App Bar
        TopAppBar(
            title = { Text("Nearby Peers") },
            actions = {
                IconButton(onClick = onNavigateToSettings) {
                    Icon(Icons.Default.Settings, contentDescription = "Settings")
                }
            }
        )
        
        // Radar View
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(300.dp)
                .background(RadarBackground),
            contentAlignment = Alignment.Center
        ) {
            RadarView(
                peers = peers,
                modifier = Modifier.fillMaxSize()
            )
            
            if (isScanning) {
                CircularProgressIndicator(
                    modifier = Modifier.size(24.dp),
                    color = MaterialTheme.colorScheme.primary
                )
            }
        }
        
        // Peers List
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp)
        ) {
            Column(
                modifier = Modifier.padding(16.dp)
            ) {
                Text(
                    text = if (peers.isNotEmpty()) "Nearby Peers" else "No peers found nearby",
                    style = MaterialTheme.typography.headlineSmall,
                    fontWeight = FontWeight.Bold
                )
                
                Spacer(modifier = Modifier.height(8.dp))
                
                if (peers.isNotEmpty()) {
                    LazyColumn {
                        items(peers) { peer ->
                            PeerItem(
                                peer = peer,
                                onConnectClick = { onNavigateToChat(peer.id) }
                            )
                        }
                    }
                } else {
                    Text(
                        text = "Scanning for peers...",
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }
        }
    }
}

@Composable
fun RadarView(
    peers: List<Peer>,
    modifier: Modifier = Modifier
) {
    val density = LocalDensity.current
    
    Canvas(modifier = modifier) {
        val center = Offset(size.width / 2, size.height / 2)
        val maxRadius = minOf(size.width, size.height) / 2 - 20.dp.toPx()
        
        // Draw radar circles
        for (i in 1..3) {
            val radius = maxRadius * i / 3
            drawCircle(
                color = RadarCircle,
                radius = radius,
                center = center,
                style = androidx.compose.ui.graphics.drawscope.Stroke(width = 2.dp.toPx())
            )
        }
        
        // Draw crosshairs
        drawLine(
            color = RadarCircle,
            start = Offset(center.x, 0f),
            end = Offset(center.x, size.height),
            strokeWidth = 1.dp.toPx()
        )
        drawLine(
            color = RadarCircle,
            start = Offset(0f, center.y),
            end = Offset(size.width, center.y),
            strokeWidth = 1.dp.toPx()
        )
        
        // Draw peers
        peers.forEach { peer ->
            val angle = Random(peer.id.hashCode()).nextFloat() * 2 * PI
            val normalizedDistance = minOf(peer.distance / 20f, 1f) // Normalize to max 20 meters
            val peerRadius = maxRadius * normalizedDistance
            
            val peerX = center.x + cos(angle).toFloat() * peerRadius
            val peerY = center.y + sin(angle).toFloat() * peerRadius
            
            drawCircle(
                color = PeerDot,
                radius = 8.dp.toPx(),
                center = Offset(peerX, peerY)
            )
        }
    }
}

@Composable
fun PeerItem(
    peer: Peer,
    onConnectClick: () -> Unit
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 8.dp),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            Box(
                modifier = Modifier
                    .size(40.dp)
                    .clip(CircleShape)
                    .background(MaterialTheme.colorScheme.primary),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    Icons.Default.Person,
                    contentDescription = null,
                    tint = MaterialTheme.colorScheme.onPrimary
                )
            }
            
            Spacer(modifier = Modifier.width(12.dp))
            
            Column {
                Text(
                    text = peer.alias,
                    style = MaterialTheme.typography.bodyLarge,
                    fontWeight = FontWeight.Medium
                )
                Text(
                    text = "${String.format("%.1f", peer.distance)}m away",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        }
        
        Button(
            onClick = onConnectClick,
            modifier = Modifier.height(36.dp)
        ) {
            Text("Connect")
        }
    }
}