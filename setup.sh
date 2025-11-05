#!/bin/bash

echo "🚀 ClassHub Installation & Setup"
echo "=================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v14 or higher from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js is installed: $(node --version)"
echo "✅ npm is installed: $(npm --version)"
echo ""

echo "📦 Installing dependencies..."
npm install

echo ""
echo "✅ Installation complete!"
echo ""
echo "🎉 To start the development server, run:"
echo "   npm start"
echo ""
echo "📚 To build for production, run:"
echo "   npm run build"
echo ""
echo "📖 For more information, see README_CLASSHUB.md"
