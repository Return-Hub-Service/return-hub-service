# Return Hub Service

A [Next.js](https://nextjs.org) application with Supabase backend, running entirely in Docker for local development.

## Table of Contents
- [Quick Start](#quick-start)
- [Docker Architecture](#docker-architecture)
- [Development Setup](#development-setup)
- [Available Commands](#available-commands)
- [Project Structure](#project-structure)
- [Deployment](#deployment)

---

## Quick Start

### Prerequisites
- Docker Desktop installed and running
- Node.js 20+ (for running npm commands)

### Starting the Application

```bash
npm run start:dev
```

This single command will:
1. Check if Docker is running
2. Start Supabase (all 13 services) if not already running
3. Start your Next.js app in a Docker container with hot reloading
4. Be ready to use at http://localhost:3000

**First time setup?** The first run will download Docker images (~5-10 minutes). Subsequent starts are much faster.

---

## Docker Architecture

This project uses a **dual-stack Docker setup**:

### 1. Supabase Stack (Managed by Supabase CLI)

When you run `npm run start:dev`, Supabase starts **13 Docker containers**:

```
┌─────────────────────────────────────────────────┐
│         Supabase Services (13 Containers)       │
├─────────────────────────────────────────────────┤
│  Core Services:                                 │
│    • postgres        - PostgreSQL database      │
│    • gotrue          - Authentication           │
│    • postgrest       - Auto-generated REST API  │
│    • realtime        - WebSocket server         │
│    • storage-api     - File storage             │
│    • kong            - API Gateway              │
│                                                 │
│  Development Tools:                             │
│    • studio          - Web UI (port 54323)      │
│    • postgres-meta   - DB introspection         │
│    • mailpit         - Email testing            │
│    • imgproxy        - Image transformation     │
│    • vector          - Analytics                │
│    • logflare        - Logging                  │
│    • edge-runtime    - Deno functions           │
└─────────────────────────────────────────────────┘
```

**Ports:**
- **54321** - Supabase API (REST, GraphQL, Auth)
- **54322** - PostgreSQL database
- **54323** - Supabase Studio (web UI)
- **54324** - Email testing (Mailpit)

### 2. Next.js Application (Managed by docker-compose)

Your app runs in a single container with **hot reloading enabled**:

```yaml
# docker-compose.yml
services:
  app:
    build: Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      - ./src:/app/src          # Instant sync ↔️
      - ./app:/app/app          # Instant sync ↔️
      - /app/node_modules       # Isolated ❌
    environment:
      - CHOKIDAR_USEPOLLING=true  # Enables hot reload
```

**How Hot Reloading Works:**

```
You edit app/page.tsx
        ↓
Volume syncs file to container
        ↓
Next.js detects change
        ↓
Recompiles & hot reloads
        ↓
Browser auto-refreshes
```

### Architecture Diagram

```
┌───────────────────────────────────────────────┐
│            Your Computer                      │
│                                               │
│  Browser ──► http://localhost:3000            │
│                     │                         │
│                     ▼                         │
│  ┌──────────────────────────────────────┐    │
│  │  Next.js Container (Docker)          │    │
│  │  • Hot reloading enabled             │    │
│  │  • Volumes mounted for code sync     │    │
│  └──────────┬───────────────────────────┘    │
│             │                                 │
│             ▼                                 │
│  ┌──────────────────────────────────────┐    │
│  │  Supabase (13 containers)            │    │
│  │  ┌────────────────────────────┐      │    │
│  │  │ Kong (API Gateway)         │      │    │
│  │  │ Port: 54321                │      │    │
│  │  └─────────┬──────────────────┘      │    │
│  │            ▼                          │    │
│  │  ┌─────────────────────────┐         │    │
│  │  │ PostgreSQL              │         │    │
│  │  │ Port: 54322             │         │    │
│  │  └─────────────────────────┘         │    │
│  │                                       │    │
│  │  ┌─────────────────────────┐         │    │
│  │  │ PostgREST (Auto API)    │         │    │
│  │  └─────────────────────────┘         │    │
│  │                                       │    │
│  │  ┌─────────────────────────┐         │    │
│  │  │ Studio (Web UI)         │         │    │
│  │  │ Port: 54323             │         │    │
│  │  └─────────────────────────┘         │    │
│  └───────────────────────────────────────┘    │
└───────────────────────────────────────────────┘
```

---

## Development Setup

### Environment Variables

The project uses local Supabase by default:

```bash
# .env.local (already configured)
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Database Migrations

Create new migrations:

```bash
npx supabase migration new your_migration_name
```

Edit the generated SQL file in `supabase/migrations/`, then apply:

```bash
npm run supabase:reset  # Resets DB and applies all migrations
```

### Seed Data

Edit `supabase/seed.sql` to add initial data:

```sql
INSERT INTO public.user (email, name) VALUES
    ('test@example.com', 'Test User');
```

Run seed:

```bash
npm run supabase:reset
```

### Generating TypeScript Types

Generate types from your database schema:

```bash
npm run supabase:generate-types
```

This creates `src/types/supabase.ts` with type-safe database types.

---

## Available Commands

### Development
```bash
npm run start:dev           # Start everything (Supabase + Next.js)
npm run dev                 # Start Next.js only (without Docker)
docker-compose down         # Stop Next.js container
```

### Supabase
```bash
npm run supabase:start      # Start Supabase services
npm run supabase:stop       # Stop Supabase services
npm run supabase:status     # View service status & URLs
npm run supabase:restart    # Restart Supabase
npm run supabase:reset      # Reset DB (rerun migrations + seed)
npm run supabase:migrate    # Push migrations to DB
npm run supabase:generate-types  # Generate TypeScript types
```

### Docker
```bash
npm run docker:up           # Start Next.js container
npm run docker:down         # Stop Next.js container
npm run docker:logs         # View Next.js logs
docker logs -f return-hub-app    # Follow logs live
```

### Viewing Logs
```bash
# Next.js app logs
docker logs return-hub-app
docker logs -f return-hub-app  # Follow mode

# All Supabase services
npx supabase status

# Specific Supabase service
docker logs supabase_db_return-hub-service
docker logs supabase_kong_return-hub-service
```

---

## Project Structure

```
return-hub-service/
├── app/                      # Next.js app directory
│   └── page.tsx             # Home page
├── src/                     # Source code
│   ├── lib/                 # Utilities
│   │   └── supabase.ts     # Supabase client
│   └── types/              # TypeScript types
│       └── supabase.ts     # Generated DB types
├── supabase/               # Supabase configuration
│   ├── config.toml         # Supabase settings
│   ├── migrations/         # Database migrations
│   │   └── *.sql
│   └── seed.sql           # Seed data
├── scripts/
│   └── start-dev.sh       # Startup script
├── docker-compose.yml     # Next.js container config
├── Dockerfile             # Production build
├── Dockerfile.dev         # Development build
├── .env.local            # Local environment vars
└── package.json          # npm scripts
```

---

## How It Works

### Request Flow

```
1. Browser requests data
        ↓
2. Next.js app calls: supabase.from("user").select("*")
        ↓
3. Request sent to http://127.0.0.1:54321/rest/v1/user
        ↓
4. Kong (API Gateway) receives request
        ↓
5. PostgREST generates SQL: SELECT * FROM user
        ↓
6. PostgreSQL executes query
        ↓
7. Data flows back through the stack
        ↓
8. React component receives JSON
```

### File Watching (Hot Reload)

The `docker-compose.yml` uses **volume mounts** to sync your local files into the container:

```yaml
volumes:
  - ./app:/app/app       # Sync app directory
  - ./src:/app/src       # Sync src directory
  - /app/node_modules    # Don't sync node_modules
```

When you edit a file:
1. Change is synced to container instantly
2. `CHOKIDAR_USEPOLLING=true` detects the change
3. Next.js recompiles
4. Browser hot-reloads

### Why Docker?

✅ **Consistency** - Everyone has identical environments
✅ **Isolation** - Dev setup doesn't pollute your machine
✅ **Full Stack** - Database, auth, storage all local
✅ **Production-like** - Mirrors production architecture
✅ **Fast Onboarding** - One command to start everything

---

## Troubleshooting

### Docker images failing to pull
If you see errors about `public.ecr.aws`, ensure:
- Docker Desktop is running
- You have internet connection
- Wait for downloads to complete (first time only)

### Port conflicts
If ports 3000, 54321-54324 are in use:
```bash
# Check what's using the port
lsof -i :3000

# Stop conflicting services or change ports in config.toml
```

### Hot reload not working
```bash
# Rebuild the container
docker-compose down
docker-compose up -d --build
```

### Database reset
```bash
# Nuclear option: delete everything and start fresh
npx supabase stop
docker volume rm $(docker volume ls -q --filter label=com.supabase.cli.project=return-hub-service)
npm run start:dev
```

---

## Deployment

The production `Dockerfile` is optimized for deployment:

```bash
docker build -t return-hub-service .
docker run -p 3000:3000 return-hub-service
```

For Vercel deployment, the app will use production Supabase credentials from environment variables.

---

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Docker Documentation](https://docs.docker.com)
