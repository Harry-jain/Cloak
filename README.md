# Claok - Anonymous P2P Messaging App

<div align="center">

![Claok Logo](https://img.shields.io/badge/Claok-v1.0-blue?style=for-the-badge&logo=android&logoColor=white)

*Secure, anonymous peer-to-peer messaging over Bluetooth Low Energy*

[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)
[![Android](https://img.shields.io/badge/platform-android-brightgreen?style=flat-square&logo=android)](app/)
[![Demo](https://img.shields.io/badge/web-demo-orange?style=flat-square&logo=react)](src/)

</div>

## 🚀 Overview

Claok is an innovative anonymous peer-to-peer messaging application designed for secure, private communication without requiring internet connectivity or central servers. The app utilizes Bluetooth Low Energy (BLE) for peer discovery and messaging, with Wi-Fi Direct integration for large file transfers.

### ✨ Key Features

- **🔒 Anonymous Communication**: No persistent device identifiers, ephemeral IDs rotated each session
- **📡 Radar Discovery**: 360° radar interface showing nearby peers with distance approximation
- **💬 Encrypted Messaging**: End-to-end encryption using ECDH key exchange and XChaCha20-Poly1305 AEAD
- **📁 Large File Transfer**: Seamless Wi-Fi Direct integration for files ≥1MB
- **🔐 Identity Reveal**: Optional mutual identity disclosure mechanism
- **🗑️ Auto-Delete**: Messages automatically expire after 24 hours
- **⚡ Panic Wipe**: Emergency data destruction for ultimate privacy

## 📂 Project Structure

```
claok/
├── app/                          # Android Application (Kotlin + Jetpack Compose)
│   ├── src/main/java/com/p2pmessaging/
│   │   ├── MainActivity.kt       # Main activity entry point
│   │   ├── ui/
│   │   │   ├── screens/          # UI screens (Radar, Chat, Settings)
│   │   │   ├── theme/            # Material Design theme
│   │   │   └── navigation/       # Navigation component
│   │   ├── viewmodel/            # Android ViewModels
│   │   ├── bluetooth/            # Bluetooth LE implementation
│   │   ├── models/               # Data models (Peer, Message, etc.)
│   │   └── data/                 # Database and repository layer
│   ├── src/main/res/             # Android resources
│   │   ├── values/               # Strings, colors, themes
│   │   ├── xml/                  # Backup and extraction rules
│   │   └── layout/               # XML layouts (if any)
│   └── build.gradle              # Android build configuration
├── src/                          # Web Demo (React + TypeScript)
│   ├── components/               # Reusable React components
│   │   ├── RadarView.tsx         # Animated radar display
│   │   ├── PeerList.tsx          # Peer discovery list
│   │   └── BottomNavigation.tsx  # Navigation component
│   ├── pages/                    # Main application pages
│   │   ├── RadarPage.tsx         # Peer discovery interface
│   │   ├── ChatPage.tsx          # Messaging interface
│   │   └── SettingsPage.tsx      # Settings and privacy
│   ├── types/                    # TypeScript type definitions
│   └── hooks/                    # Custom React hooks
├── build.gradle                  # Project-level Gradle configuration
├── settings.gradle               # Gradle settings
├── package.json                  # Node.js dependencies
├── vite.config.ts               # Vite build configuration
├── tsconfig.json                # TypeScript configuration
└── README.md                    # This file
```

## 🛠️ Installation & Setup

### Prerequisites

- **Android Development**: Android Studio, Android SDK (API 21+)
- **Web Demo**: Node.js 18+, npm or yarn
- **Development**: Git, Java 8+, Gradle 7+

### Quick Start

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Harry-jain/Cloak.git
   cd Cloak
   ```

2. **Run the web demo**:
   ```bash
   ./startup.sh
   # Or manually:
   npm install
   npm run dev
   ```
   Open [http://localhost:5000](http://localhost:5000) in your browser.

3. **Build Android app**:
   ```bash
   cd app
   ./gradlew build
   # Or open in Android Studio
   ```

## 🎯 Usage

### Web Demo

The web demonstration provides a fully interactive preview of Claok's user interface and core functionality:

1. **Peer Discovery**: View the animated radar display showing simulated nearby peers
2. **Chat Interface**: Send and receive messages with realistic chat bubbles
3. **Settings Management**: Configure display name, privacy settings, and panic wipe

### Android App

The Android application structure is complete with:

- **Bluetooth LE Integration**: Ready for BLE scanning, advertising, and GATT communication
- **Material Design UI**: Native Android interface matching the web demo
- **Security Framework**: Prepared for end-to-end encryption implementation
- **Permission Handling**: Complete manifest with required Bluetooth and location permissions

## 🔧 Technical Architecture

### Core Technologies

| Component | Technology Stack |
|-----------|------------------|
| **Android Frontend** | Kotlin, Jetpack Compose, Material Design 3 |
| **Web Demo** | React 18, TypeScript, Vite |
| **Networking** | Bluetooth LE, Wi-Fi Direct (Android) |
| **Encryption** | ECDH (Curve25519), XChaCha20-Poly1305 AEAD |
| **Database** | Room (Android), SQLCipher for encryption |
| **Background Tasks** | WorkManager for cleanup and key rotation |

### Security Features

- **Ephemeral Identity**: Device IDs randomized each session
- **End-to-End Encryption**: Military-grade cryptography (planned)
- **Forward Secrecy**: Session keys rotated every 12 hours
- **No Central Server**: Pure peer-to-peer architecture
- **Automatic Cleanup**: Messages and keys wiped after 24 hours
- **Replay Protection**: Sequence numbers and timestamp validation

### Communication Flow

```
[Device A] ←→ [BLE Discovery] ←→ [Device B]
     ↓              ↓              ↓
[ECDH Exchange] → [Session Key] ← [ECDH Exchange]
     ↓                           ↓
[Encrypt Message] → [BLE/GATT] → [Decrypt Message]
     ↓                           ↓
[Large File?] → [Wi-Fi Direct] ← [Large File?]
```

## 🚀 Development Status

### ✅ Completed Features

- [x] Complete Android project structure with Kotlin + Jetpack Compose
- [x] Web demonstration with React + TypeScript
- [x] Radar UI with animated peer discovery simulation
- [x] Chat interface with message bubbles and timestamps
- [x] Settings screen with privacy controls
- [x] Navigation and state management
- [x] Material Design theming
- [x] Android permissions and manifest configuration
- [x] Mobile-responsive web design

### 🔄 In Development

- [ ] Bluetooth LE GATT service implementation
- [ ] End-to-end encryption (ECDH + XChaCha20-Poly1305)
- [ ] Wi-Fi Direct file transfer protocol
- [ ] Message persistence with automatic deletion
- [ ] Runtime permission handling
- [ ] Key rotation and session management

### 📋 Planned Features

- [ ] Audio message support
- [ ] Group messaging capabilities
- [ ] Mesh networking for extended range
- [ ] Cross-platform compatibility (iOS)
- [ ] Advanced privacy features
- [ ] Message threading and search

## 🧪 Testing

### Web Demo Testing
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Android Testing
```bash
cd app
./gradlew test                    # Run unit tests
./gradlew connectedAndroidTest   # Run instrumented tests
./gradlew lint                   # Run code analysis
```

## 📱 Screenshots

| Radar Discovery | Chat Interface | Settings |
|----------------|---------------|----------|
| ![Radar](docs/radar.png) | ![Chat](docs/chat.png) | ![Settings](docs/settings.png) |

## 🤝 Contributing

We welcome contributions to Claok! Please follow these guidelines:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow Material Design principles for UI components
- Maintain security-first approach for all networking code
- Write comprehensive tests for cryptographic functions
- Document all public APIs and complex algorithms
- Ensure Android and web demos stay synchronized

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔒 Security Considerations

⚠️ **Important Security Notice**: This is currently a demonstration version. The following security features are not yet implemented:

- Real Bluetooth LE encryption and key exchange
- Production-grade cryptographic libraries
- Secure storage of session keys
- Message integrity verification
- Protection against man-in-the-middle attacks

**Do not use for sensitive communications** until security features are fully implemented.

## 📞 Support & Contact

- **Issues**: [GitHub Issues](https://github.com/Harry-jain/Cloak/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Harry-jain/Cloak/discussions)
- **Email**: [Your contact email]

## 🙏 Acknowledgments

- Android Bluetooth LE documentation and examples
- React and Vite communities
- Material Design guidelines
- Cryptographic libraries and best practices
- Open source security research

---

<div align="center">

**Built with ❤️ for privacy and security**

[⭐ Star us on GitHub](https://github.com/Harry-jain/Cloak) | [🐛 Report Bug](https://github.com/Harry-jain/Cloak/issues) | [💡 Request Feature](https://github.com/Harry-jain/Cloak/issues)

</div>