# AWS Amplify Setup Guide

## Overview

This project uses **AWS Amplify Gen 2** for authentication with email/password login and custom user roles.

## Important Files

- `amplify/backend.ts` - Amplify backend configuration
- `amplify/auth/resource.ts` - Authentication resource definition
- `src/amplify_outputs.json` - **AUTO-GENERATED** (gitignored, do not commit)
- `src/amplify_outputs.d.ts` - TypeScript declarations for the config

## Setup for Development

### Option 1: Use Amplify Sandbox (Recommended for Local Dev)

```bash
# Start a local sandbox environment
npx ampx sandbox --profile default
```

This will:
- Deploy a temporary backend to AWS
- Auto-generate `src/amplify_outputs.json`
- Hot-reload on changes to `amplify/` files

### Option 2: Pull from Existing Deployment

If your colleague already deployed the app:

```bash
# Generate outputs from deployed app
npx ampx generate outputs --app-id <your-app-id> --branch main

# Or pull complete configuration
npx ampx pull --app-id <your-app-id>
```

### Option 3: Use Development Mock File

For CI/CD or when AWS access is not available, a mock `amplify_outputs.json` file is included in the repository (currently with placeholder values).

**⚠️ Note:** This mock file will not work for actual authentication, but allows the build to succeed.

## CI/CD Setup

### GitHub Actions / Vercel / Netlify

Add these environment variables to your CI/CD platform:

```bash
# Required for Amplify
AWS_ACCESS_KEY_ID=<your-key>
AWS_SECRET_ACCESS_KEY=<your-secret>
AWS_REGION=us-east-1

# Optional: Amplify App ID for pulling config
AMPLIFY_APP_ID=<your-app-id>
```

### Build Command

Your CI/CD build script should:

1. Generate `amplify_outputs.json` before building:
   ```bash
   npx ampx generate outputs --app-id $AMPLIFY_APP_ID --branch $BRANCH_NAME
   npm run build
   ```

2. Or use the mock file (already in repo):
   ```bash
   # File exists at src/amplify_outputs.json
   npm run build
   ```

## Authentication Flow

1. **Admin Login**: Users authenticate via `/admin/login`
2. **Amplify Authenticator**: Uses `@aws-amplify/ui-react` components
3. **Session Management**: JWT tokens stored in cookies
4. **Role-Based Access**: Custom `role` attribute (admin/user)

## Troubleshooting

### Error: "Module not found: Can't resolve '@/amplify_outputs.json'"

**Solution:**
```bash
# Run sandbox to generate the file
npx ampx sandbox

# Or create the mock file (already included)
# File should exist at: src/amplify_outputs.json
```

### Error: "A require() style import is forbidden"

**Solution:** Already fixed! We use ES6 imports:
```typescript
import { cookies } from 'next/headers';
// NOT: require('next/headers').cookies
```

### Build succeeds but auth doesn't work

**Reason:** Using mock/placeholder configuration.

**Solution:** Deploy actual Amplify backend:
```bash
npx ampx sandbox  # for dev
npx ampx deploy   # for production
```

## File Structure

```
amplify/
├── auth/
│   └── resource.ts          # Auth configuration
├── backend.ts               # Backend definition
└── package.json             

src/
├── amplify_outputs.json     # ⚠️ GITIGNORED - Auto-generated
├── amplify_outputs.d.ts     # TypeScript types
├── components/
│   └── ConfigureAmplify.tsx # Client-side Amplify config
├── utils/
│   └── amplify-server-utils.ts # Server-side utilities
└── lib/
    └── auth.ts              # Auth helper functions
```

## Next Steps

1. **Deploy Amplify Backend:**
   ```bash
   npx ampx sandbox  # Start development backend
   ```

2. **Configure Admin Users:**
   - Go to AWS Cognito console
   - Create users manually
   - Set custom attribute: `custom:role` = `admin`

3. **Update Production Config:**
   - Deploy to production: `npx ampx deploy`
   - Update CI/CD with proper AWS credentials
   - Generate `amplify_outputs.json` in build pipeline

## Resources

- [Amplify Gen 2 Documentation](https://docs.amplify.aws/react/build-a-backend/)
- [Authentication with Amplify](https://docs.amplify.aws/react/build-a-backend/auth/)
- [Deploy to Production](https://docs.amplify.aws/react/deploy-and-host/)
