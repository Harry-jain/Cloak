package com.p2pmessaging.ui.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.p2pmessaging.ui.screens.RadarScreen
import com.p2pmessaging.ui.screens.ChatScreen
import com.p2pmessaging.ui.screens.SettingsScreen
import com.p2pmessaging.viewmodel.BluetoothViewModel

@Composable
fun P2PNavigation(
    navController: NavHostController = rememberNavController(),
    bluetoothViewModel: BluetoothViewModel
) {
    NavHost(
        navController = navController,
        startDestination = "radar"
    ) {
        composable("radar") {
            RadarScreen(
                bluetoothViewModel = bluetoothViewModel,
                onNavigateToChat = { peerId ->
                    navController.navigate("chat/$peerId")
                },
                onNavigateToSettings = {
                    navController.navigate("settings")
                }
            )
        }
        
        composable("chat/{peerId}") { backStackEntry ->
            val peerId = backStackEntry.arguments?.getString("peerId") ?: ""
            ChatScreen(
                peerId = peerId,
                bluetoothViewModel = bluetoothViewModel,
                onNavigateBack = {
                    navController.popBackStack()
                }
            )
        }
        
        composable("settings") {
            SettingsScreen(
                onNavigateBack = {
                    navController.popBackStack()
                }
            )
        }
    }
}