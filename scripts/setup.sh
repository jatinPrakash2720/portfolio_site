#!/bin/bash

echo "🚀 Setting up Trio Portfolio Multi-Domain Architecture..."

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install shared package dependencies
echo "📦 Installing shared package dependencies..."
cd packages/shared
npm install
cd ../..

# Install portfolio app dependencies
echo "📦 Installing portfolio app dependencies..."
cd apps/portfolio
npm install
cd ../..

# Install admin app dependencies
echo "📦 Installing admin app dependencies..."
cd apps/admin
npm install
cd ../..

# Build shared package
echo "🔨 Building shared package..."
npm run build:shared

echo "✅ Setup complete!"
echo ""
echo "To start development:"
echo "  npm run dev"
echo ""
echo "This will start:"
echo "  - Portfolio app on http://localhost:3001"
echo "  - Admin app on http://localhost:3002"
echo ""
echo "Don't forget to:"
echo "  1. Set up your Firebase project"
echo "  2. Configure environment variables"
echo "  3. Add sample users with domain configurations"
