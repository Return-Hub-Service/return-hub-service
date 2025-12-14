#!/bin/bash

echo "🎨 Opening Supabase Studio..."

# Check if Supabase is running
if ! npx supabase status > /dev/null 2>&1; then
    echo "❌ Supabase is not running"
    echo "   💡 Start it with: npm run start:dev"
    exit 1
fi

# Open in default browser
if command -v open > /dev/null 2>&1; then
    # macOS
    open http://localhost:54323
elif command -v xdg-open > /dev/null 2>&1; then
    # Linux
    xdg-open http://localhost:54323
else
    echo "✅ Supabase Studio: http://localhost:54323"
    echo "   (Please open manually in your browser)"
fi
