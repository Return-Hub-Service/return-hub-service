#!/bin/bash

# Load environment variables from .env
if [ -f .env ]; then
    export $(grep -v '^#' .env | grep -v '^$' | xargs)
fi

# Use ports from .env or defaults
PORT=${PORT:-3000}
SUPABASE_PORT=${SUPABASE_PORT:-54321}
SUPABASE_STUDIO_PORT=${SUPABASE_STUDIO_PORT:-54323}

echo "📊 Development Environment Status"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check Docker
echo "🐳 Docker:"
if docker info > /dev/null 2>&1; then
    echo "   ✅ Running"
else
    echo "   ❌ Not running"
fi
echo ""

# Check Supabase
echo "🗄️  Supabase:"
if npx supabase status > /dev/null 2>&1; then
    echo "   ✅ Running"

    # Show Supabase container count
    CONTAINER_COUNT=$(docker ps --filter "name=supabase_" --format "{{.Names}}" | wc -l | tr -d ' ')
    echo "   📦 Containers: $CONTAINER_COUNT"

    # Check if API is responding
    if curl -s http://localhost:$SUPABASE_PORT/rest/v1/ > /dev/null 2>&1; then
        echo "   🔌 API: Healthy"
    else
        echo "   ⚠️  API: Not responding"
    fi
else
    echo "   ❌ Not running"
fi
echo ""

# Check Next.js
echo "🌐 Next.js:"
if lsof -Pi :$PORT -sTCP:LISTEN -t > /dev/null 2>&1; then
    PID=$(lsof -Pi :$PORT -sTCP:LISTEN -t)
    echo "   ✅ Running (PID: $PID)"

    # Check if responding
    if curl -f http://localhost:$PORT > /dev/null 2>&1; then
        echo "   🔌 Server: Responding"
    else
        echo "   ⚠️  Server: Not responding yet (may be starting)"
    fi
else
    echo "   ❌ Not running"
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📍 Service URLs:"
echo "   🌐 Next.js:          http://localhost:$PORT"
echo "   🗄️  Supabase Studio:  http://localhost:$SUPABASE_STUDIO_PORT"
echo "   🔌 Supabase API:     http://localhost:$SUPABASE_PORT"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
