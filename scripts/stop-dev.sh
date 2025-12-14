#!/bin/bash

echo "🛑 Stopping development environment..."
echo ""

# Load environment variables from .env
if [ -f .env ]; then
    export $(grep -v '^#' .env | grep -v '^$' | xargs)
fi

# Use PORT from .env or default to 3000
PORT=${PORT:-3000}

# Parse command line arguments
STOP_SUPABASE=false
if [ "$1" == "--full" ] || [ "$1" == "-f" ]; then
    STOP_SUPABASE=true
fi

# Check for Next.js process on configured port
echo "🔍 Checking for Next.js process on port $PORT..."
if lsof -Pi :$PORT -sTCP:LISTEN -t > /dev/null 2>&1; then
    PID=$(lsof -Pi :$PORT -sTCP:LISTEN -t)
    echo "   Stopping Next.js (PID: $PID)..."
    kill $PID 2>/dev/null
    sleep 1

    # Force kill if still running
    if lsof -Pi :$PORT -sTCP:LISTEN -t > /dev/null 2>&1; then
        echo "   Force stopping Next.js..."
        kill -9 $PID 2>/dev/null
    fi
    echo "✅ Next.js stopped"
else
    echo "   No Next.js process found on port $PORT"
fi

# Stop Supabase if requested
if [ "$STOP_SUPABASE" = true ]; then
    echo "🔍 Stopping Supabase..."
    if npx supabase status > /dev/null 2>&1; then
        npx supabase stop
        echo "✅ Supabase stopped"
    else
        echo "   Supabase is not running"
    fi
else
    echo "ℹ️  Supabase left running (use --full to stop Supabase too)"
fi

echo ""
echo "✨ Development environment stopped!"
echo ""
echo "💡 To restart: npm run start:dev"
echo ""
