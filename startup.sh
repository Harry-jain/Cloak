#!/bin/bash

# Claok - Anonymous P2P Messaging App
# Startup script for development environment

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ASCII Art Logo
echo -e "${BLUE}"
cat << "EOF"
   ▄████▄   ██▓    ▄▄▄       ▒█████   ██ ▄█▀
  ▒██▀ ▀█  ▓██▒   ▒████▄    ▒██▒  ██▒ ██▄█▒ 
  ▒▓█    ▄ ▒██░   ▒██  ▀█▄  ▒██░  ██▒▓███▄░ 
  ▒▓▓▄ ▄██▒▒██░   ░██▄▄▄▄██ ▒██   ██░▓██ █▄ 
  ▒ ▓███▀ ░░██████▒▓█   ▓██▒░ ████▓▒░▒██▒ █▄
  ░ ░▒ ▒  ░░ ▒░▓  ░▒▒   ▓▒█░░ ▒░▒░▒░ ▒ ▒▒ ▓▒
    ░  ▒   ░ ░ ▒  ░ ▒   ▒▒ ░  ░ ▒ ▒░ ░ ░▒ ▒░
  ░          ░ ░    ░   ▒   ░ ░ ░ ▒  ░ ░░ ░ 
  ░ ░          ░  ░     ░  ░    ░ ░  ░  ░   
  ░                                         
EOF
echo -e "${NC}"

echo -e "${GREEN}🚀 Claok - Anonymous P2P Messaging App${NC}"
echo -e "${YELLOW}📱 Starting development environment...${NC}\n"

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to print status messages
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Check Node.js installation
print_status "Checking Node.js installation..."
if command_exists node; then
    NODE_VERSION=$(node --version)
    print_success "Node.js found: $NODE_VERSION"
else
    print_error "Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

# Check npm installation
print_status "Checking npm installation..."
if command_exists npm; then
    NPM_VERSION=$(npm --version)
    print_success "npm found: v$NPM_VERSION"
else
    print_error "npm is not installed. Please install npm."
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the Claok root directory."
    exit 1
fi

# Install dependencies
print_status "Installing dependencies..."
if npm install; then
    print_success "Dependencies installed successfully"
else
    print_error "Failed to install dependencies"
    exit 1
fi

# Check for Android development environment (optional)
print_status "Checking Android development environment..."
if command_exists java; then
    JAVA_VERSION=$(java -version 2>&1 | head -n 1 | cut -d'"' -f2)
    print_success "Java found: $JAVA_VERSION"
else
    print_warning "Java not found. Android development will not be available."
fi

if [ -d "app" ]; then
    print_success "Android project structure found at ./app/"
else
    print_warning "Android project not found"
fi

# Display project information
echo ""
echo -e "${BLUE}📊 Project Information:${NC}"
echo "  • Web Demo Port: 5000"
echo "  • Android Project: ./app/"
echo "  • Documentation: README.md"
echo ""

# Display available commands
echo -e "${BLUE}🔧 Available Commands:${NC}"
echo "  • npm run dev     - Start web development server"
echo "  • npm run build   - Build for production"
echo "  • npm run preview - Preview production build"
echo ""

# Check if port 5000 is available
print_status "Checking if port 5000 is available..."
if lsof -Pi :5000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    print_warning "Port 5000 is already in use. The server may not start properly."
else
    print_success "Port 5000 is available"
fi

# Start the development server
echo -e "${GREEN}🌐 Starting Claok web demonstration...${NC}"
echo -e "${YELLOW}📱 Open your browser to: http://localhost:5000${NC}"
echo -e "${YELLOW}🔄 Press Ctrl+C to stop the server${NC}\n"

# Function to handle cleanup on exit
cleanup() {
    echo ""
    print_status "Shutting down development server..."
    print_success "Goodbye! 👋"
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Start the development server
exec npm run dev

# Note: This line will not be reached as 'exec' replaces the current process