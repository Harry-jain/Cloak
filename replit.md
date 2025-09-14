# Claok - Anonymous P2P Messaging App

## Overview
Claok is an anonymous peer-to-peer messaging Android app as specified in the attached document. The implementation includes both a complete Android app structure and a web-based demonstration.

## Recent Changes (September 11, 2025)
- Created complete Android project structure with Kotlin and Jetpack Compose
- Implemented web-based React demo showcasing all key features
- Set up development workflow running on port 5000
- Corrected misleading encryption claims to indicate simulation status

## Project Architecture

### Android Implementation
Located in `/app/` directory:
- **Kotlin/Jetpack Compose** UI components
- **Android Manifest** with Bluetooth LE, Wi-Fi Direct, and location permissions
- **Complete project structure** with ViewModels, navigation, and theme
- **UI Screens**: Radar view, Chat interface, Settings
- **Data Models**: Peer, Message, ChatSession

### Web Demo Implementation  
Located in `/src/` directory:
- **React/TypeScript** demonstration app
- **Animated radar view** with peer discovery simulation
- **Chat interface** with message bubbles and timestamps
- **Settings screen** with identity management and panic wipe
- **Mobile-friendly design** matching Android Material Design

## Current Status
- ✅ **UI Design & Layout**: Complete for both Android and web demo
- ✅ **Navigation & Screens**: Radar, Chat, Settings implemented
- ✅ **Simulated Functionality**: Peer discovery, messaging, settings
- ⚠️ **Bluetooth LE Implementation**: Android structure ready, actual BLE not implemented
- ⚠️ **Encryption**: Architecture planned, cryptography not implemented
- ⚠️ **Wi-Fi Direct**: Permissions configured, transfer logic not implemented

## User Preferences
- Focus on mobile-first design
- Emphasis on privacy and security features
- Clean, intuitive UI following Android Material Design
- Comprehensive feature demonstration through simulation

## Next Steps
1. Implement actual Bluetooth LE GATT service and scanning
2. Add real end-to-end encryption (ECDH + XChaCha20-Poly1305)
3. Implement Wi-Fi Direct file transfer capabilities
4. Add automatic message deletion and key rotation
5. Integrate real-time permission handling