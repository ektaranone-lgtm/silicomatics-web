#!/bin/bash

# SilicoInformatics - Quick Start Script
# This script starts both frontend and backend servers

echo "🚀 Starting SilicoInformatics Full Stack Application"
echo "================================================"

# Check and install backend dependencies
echo "Checking backend dependencies..."
if [ ! -d "backend/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd backend
    npm install
    cd ..
    echo "✅ Backend dependencies installed"
else
    echo "✅ Backend dependencies already installed"
fi

# Check and install frontend dependencies
echo "Checking frontend dependencies..."
if [ ! -d "silico-frontend/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    # Check if pnpm is installed
    if command -v pnpm &> /dev/null; then
        cd silico-frontend
        pnpm install
        cd ..
    else
        echo "⚠️  pnpm not found. Installing with npm instead..."
        cd silico-frontend
        npm install
        cd ..
    fi
    echo "✅ Frontend dependencies installed"
else
    echo "✅ Frontend dependencies already installed"
fi

echo ""

# Check if MongoDB is running
echo "Checking MongoDB connection..."
if command -v mongosh &> /dev/null; then
    if mongosh --eval "db.version()" --quiet &> /dev/null; then
        echo "✅ MongoDB is running"
    else
        echo "⚠️  MongoDB doesn't appear to be running"
        echo "   Please start MongoDB before continuing:"
        echo "   macOS: brew services start mongodb-community"
        echo "   Linux: sudo systemctl start mongod"
        read -p "Press Enter to continue anyway or Ctrl+C to exit..."
    fi
else
    echo "⚠️  mongosh not found. Make sure MongoDB is installed and running."
    read -p "Press Enter to continue anyway or Ctrl+C to exit..."
fi

echo ""
echo "Starting backend server..."
cd backend
npm run dev &
BACKEND_PID=$!
echo "✅ Backend starting on http://localhost:5000 (PID: $BACKEND_PID)"

# Wait for backend to start
sleep 3

echo ""
echo "Starting frontend server..."
cd ../silico-frontend
npm run dev &
FRONTEND_PID=$!
echo "✅ Frontend starting on http://localhost:5173 (PID: $FRONTEND_PID)"

echo ""
echo "================================================"
echo "🎉 Both servers are starting!"
echo ""
echo "📡 Backend:  http://localhost:5000"
echo "🌐 Frontend: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both servers"
echo "================================================"

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "Shutting down servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "✅ Servers stopped"
    exit 0
}

# Trap Ctrl+C and call cleanup
trap cleanup INT

# Wait for both processes
wait
