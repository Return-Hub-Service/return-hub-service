#!/bin/bash

set -e  # Exit on error

echo "🚀 Starting Return Hub Service in development mode..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop and try again."
    exit 1
fi

# Check if Supabase is already running
echo "🔍 Checking Supabase status..."
if npx supabase status > /dev/null 2>&1; then
    echo "✅ Supabase is already running"
else
    echo "🔧 Starting Supabase (this may take a few minutes on first run)..."
    echo "   Pulling Docker images from public.ecr.aws..."
    npx supabase start

    if [ $? -eq 0 ]; then
        echo "✅ Supabase started successfully"
    else
        echo "❌ Failed to start Supabase. Please check the error above."
        exit 1
    fi
fi

# Start Docker containers
echo "🐳 Starting Docker containers..."
docker-compose up -d

echo ""
echo "✨ Development environment is ready!"
echo ""
echo "📍 Services:"
echo "   - Next.js App: http://localhost:3000"
echo "   - Supabase Studio: http://localhost:54323"
echo "   - Supabase API: http://localhost:54321"
echo ""
