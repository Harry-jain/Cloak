package com.p2pmessaging

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.viewModels
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import com.p2pmessaging.ui.theme.P2PMessagingTheme
import com.p2pmessaging.ui.navigation.P2PNavigation
import com.p2pmessaging.viewmodel.BluetoothViewModel

class MainActivity : ComponentActivity() {
    private val bluetoothViewModel: BluetoothViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        setContent {
            P2PMessagingTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    P2PNavigation(bluetoothViewModel = bluetoothViewModel)
                }
            }
        }
    }
}