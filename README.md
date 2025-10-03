# Trio Portfolio - Multi-Domain Architecture

A professional portfolio platform with multi-domain, single codebase architecture. This monorepo supports multiple users with their own custom domains for both portfolio and admin interfaces.

## Architecture Overview

This project follows a "franchise model" architecture where:
- **One codebase** powers multiple branded domains
- **Shared services** handle domain resolution and user data
- **Separate apps** for portfolio (public) and admin (private) interfaces
- **Domain-based routing** determines which user's data to display

## Project Structure

```
trio-portfolio/
├── apps/
│   ├── portfolio/          # Public portfolio app
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   └── [domain]/    # Dynamic domain routing
│   │   │   ├── components/
│   │   │   └── middleware.ts    # Domain resolution middleware
│   │   └── package.json
│   └── admin/              # Admin dashboard app
│       ├── src/
│       │   ├── app/
│       │   │   └── [domain]/    # Dynamic domain routing
│       │   ├── components/
│       │   └── middleware.ts    # Domain resolution middleware
│       └── package.json
├── packages/
│   └── shared/             # Shared services and types
│       ├── src/
│       │   ├── services/   # Domain, user, project services
│       │   ├── types/      # TypeScript definitions
│       │   └── lib/        # Utilities and Firebase config
│       └── package.json
└── package.json            # Root workspace configuration
```

## Domain Configuration

Each user in the Firestore database has:
```typescript
{
  "userId": "user_abc_123",
  "username": "jatin-prakash",
  "fullName": "Jatin Prakash",
  "portfolioDomain": "portfolio.jatinbuilds.com",
  "adminDomain": "dashboard.jatinbuilds.com",
  // ... other user fields
}
```

## How It Works

1. **Domain Resolution**: Middleware intercepts requests and extracts the domain
2. **User Lookup**: Domain service queries Firestore to find the user
3. **App Routing**: Routes to appropriate app (portfolio/admin) based on domain
4. **Data Loading**: Pages load user-specific data based on resolved domain

## Development

### Prerequisites
- Node.js 18+
- Firebase project with Firestore

### Setup
```bash
# Install dependencies
npm install

# Build shared package
npm run build:shared

# Start development servers
npm run dev
```

This will start:
- Portfolio app on `http://localhost:3001`
- Admin app on `http://localhost:3002`

### Environment Variables
Create `.env.local` files in each app directory:
```env
NEXT_PUBLIC_ROOT_DOMAIN=jatinbuilds.com
NEXT_PUBLIC_FIREBASE_CONFIG={"apiKey":"...","authDomain":"..."}
```

## Deployment

### Vercel (Recommended)
1. Deploy each app separately
2. Configure custom domains in Vercel dashboard
3. Set environment variables for each deployment

### Domain Configuration
- Portfolio domains: `portfolio.username.com`
- Admin domains: `dashboard.username.com`
- Root domain: `username.com` (marketing page)

## Features

- ✅ Multi-domain routing
- ✅ User-specific data loading
- ✅ Shared component library
- ✅ TypeScript support
- ✅ Tailwind CSS styling
- ✅ Firebase integration
- ✅ SEO optimization
- ✅ Responsive design

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes in the appropriate app/package
4. Test with multiple domains
5. Submit a pull request

## License

MIT License - see LICENSE file for details