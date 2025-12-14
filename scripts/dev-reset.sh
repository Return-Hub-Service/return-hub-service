#!/bin/bash

echo "🧹 Cleaning development environment..."
echo ""
echo "⚠️  This will:"
echo "   • Stop Next.js"
echo "   • Stop Supabase"
echo "   • Reset database to seed state"
echo ""
read -p "Continue? (y/N) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cancelled."
    exit 0
fi

echo ""
echo "🛑 Stopping services..."

# Stop Next.js if running
if lsof -Pi :3000 -sTCP:LISTEN -t > /dev/null 2>&1; then
    PID=$(lsof -Pi :3000 -sTCP:LISTEN -t)
    echo "   Stopping Next.js..."
    kill -9 $PID 2>/dev/null
fi

# Stop and reset Supabase
if npx supabase status > /dev/null 2>&1; then
    echo "   Stopping Supabase..."
    npx supabase stop
fi

echo ""
echo "🔄 Resetting Supabase database..."
npx supabase db reset

if [ $? -eq 0 ]; then
    echo ""
    echo "✨ Environment cleaned and reset!"
    echo ""
    echo "💡 Start fresh with: npm run start:dev"
else
    echo ""
    echo "❌ Failed to reset database"
    exit 1
fi
