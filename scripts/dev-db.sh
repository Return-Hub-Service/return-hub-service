#!/bin/bash

echo "🗄️  Connecting to local Postgres database..."

# Check if Supabase is running
if ! npx supabase status > /dev/null 2>&1; then
    echo "❌ Supabase is not running"
    echo "   💡 Start it with: npm run start:dev"
    exit 1
fi

# Check if psql is installed
if ! command -v psql > /dev/null 2>&1; then
    echo "❌ psql is not installed"
    echo "   💡 Install with: brew install postgresql"
    exit 1
fi

echo "✅ Connecting to database..."
echo ""

# Connect to database
PGPASSWORD=postgres psql -h localhost -p 54322 -U postgres -d postgres
