#!/bin/bash

echo "📜 Showing Supabase logs (press Ctrl+C to stop)..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check if Supabase is running
if ! npx supabase status > /dev/null 2>&1; then
    echo "❌ Supabase is not running"
    echo "   💡 Start it with: npm run start:dev"
    exit 1
fi

# Follow logs from key Supabase containers
docker logs -f supabase_kong_return-hub-service --tail=50 2>&1 &
KONG_PID=$!

docker logs -f supabase_db_return-hub-service --tail=50 2>&1 &
DB_PID=$!

docker logs -f supabase_auth_return-hub-service --tail=50 2>&1 &
AUTH_PID=$!

# Wait for Ctrl+C
trap "kill $KONG_PID $DB_PID $AUTH_PID 2>/dev/null; echo ''; echo 'Stopped following logs'; exit 0" INT

wait
