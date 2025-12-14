#!/bin/bash

set -e  # Exit on error

echo "🚀 Starting Return Hub Service in development mode..."
echo ""

# Load environment variables from .env
if [ -f .env ]; then
    export $(grep -v '^#' .env | grep -v '^$' | xargs)
fi

# Use PORT from .env or default to 3000
PORT=${PORT:-3000}
SUPABASE_PORT=${SUPABASE_PORT:-54321}
SUPABASE_STUDIO_PORT=${SUPABASE_STUDIO_PORT:-54323}

# Check if Docker is running
echo "🔍 Checking Docker..."
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop and try again."
    exit 1
fi
echo "✅ Docker is running"

# Check if Next.js port is already in use
echo "🔍 Checking if port $PORT is available..."
if lsof -Pi :$PORT -sTCP:LISTEN -t > /dev/null 2>&1; then
    echo "❌ Port $PORT is already in use. Please stop the process using port $PORT and try again."
    echo "   💡 Find what's using the port: lsof -i :$PORT"
    exit 1
fi
echo "✅ Port $PORT is available"

# Check if Supabase is already running
echo "🔍 Checking Supabase status..."
if npx supabase status > /dev/null 2>&1; then
    echo "✅ Supabase is already running"
else
    echo "🔧 Starting Supabase (this may take a few minutes on first run)..."
    echo "   📥 Pulling Docker images and starting containers..."
    echo ""

    # Start Supabase and capture output, filtering out pull errors
    if npx supabase start 2>&1 | grep -v "failed to resolve" | grep -v "Error"; then
        echo ""
        echo "✅ Supabase started successfully"
    else
        # If there was a real error, show it
        echo ""
        echo "❌ Failed to start Supabase. Please check the error above."
        exit 1
    fi
fi

# Wait for Supabase to be fully ready
echo "⏳ Waiting for Supabase to be healthy..."
MAX_ATTEMPTS=30
ATTEMPT=0
while [ $ATTEMPT -lt $MAX_ATTEMPTS ]; do
    if curl -s http://localhost:$SUPABASE_PORT/rest/v1/ > /dev/null 2>&1; then
        echo "✅ Supabase is healthy and ready"
        break
    fi
    ATTEMPT=$((ATTEMPT + 1))
    if [ $ATTEMPT -eq $MAX_ATTEMPTS ]; then
        echo "❌ Supabase health check timed out after 60 seconds"
        echo "   💡 Try: npm run supabase:status"
        exit 1
    fi
    sleep 2
done

# Start Next.js locally
echo "🎯 Starting Next.js app locally..."
echo "   Running: npm run dev"
echo ""
echo "✨ Development environment is ready!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📍 Services:"
echo "   🌐 Next.js App:      http://localhost:$PORT"
echo "   🗄️  Supabase Studio:  http://localhost:$SUPABASE_STUDIO_PORT"
echo "   🔌 Supabase API:     http://localhost:$SUPABASE_PORT"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "💡 Tips:"
echo "   • Press Ctrl+C to stop Next.js"
echo "   • Run 'npm run stop:dev' to stop Supabase"
echo "   • Run 'npm run dev:status' to check services"
echo ""

# Start Next.js in the foreground
npm run dev
