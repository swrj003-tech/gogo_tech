# AWS Amplify Deployment Guide (Gen 2)

This project uses AWS Amplify Gen 2 for hosting and authentication (Cognito).

## Prerequisites

- AWS Account
- GitHub Repository connected to this codebase
- AWS Amplify configured in your terminal (optional, for local testing)

## Step 1: Initialize Amplify (Already Done in Codebase)

The project is already configured with Amplify Gen 2 files:
- `amplify/auth/resource.ts`: Defines the Cognito User Pool (Email/Password).
- `amplify/backend.ts`: Entry point for backend resources.
- `src/middleware.ts`: Protects admin routes.

## Step 2: Deploy via Amplify Console

1.  **Log in to AWS Console** and navigate to **AWS Amplify**.
2.  Click **"Create new app"** (or "Create app" -> "Gen 2").
3.  **Choose GitHub** as the source repository.
4.  Authorize AWS to access your repo and select the **branch** (e.g., `main`).
5.  **Build Settings**: Amplify should automatically detect the settings.
    -   **Framework**: Next.js - SSR
    -   **Build Image**: Amazon Linux 2023 (Standard)
6.  **Environment Variables**:
    You MUST add the following environment variables in the Amplify Console:

    | Variable | Description |
    | :--- | :--- |
    | `DATABASE_URL` | Connection string for your Postgres DB (e.g., AWS RDS) |
    | `NEXT_PUBLIC_GTM_ID` | (Optional) Google Tag Manager ID |
    | `NEXT_PUBLIC_GA_MEASUREMENT_ID` | (Optional) Google Analytics ID |
    | `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | (Optional) reCAPTCHA Site Key (if strictly used) |
    | `NEXT_PUBLIC_Recaptcha_Secret_Key` | (Optional) reCAPTCHA Secret |

    *Note: `AMPLIFY_*` variables are handled automatically by the platform.*

7.  **Deploy**: Click "Save and Deploy".

## Step 3: Post-Deployment Setup (Create Admin User)

Since sign-ups are hidden/disabled in the UI, you must create the first Admin user manually.

1.  Go to the **AWS Console** -> **Cognito**.
2.  Find the User Pool created by Amplify (name usually starts with `amplify-gogo...` or similar).
3.  Go to the **Users** tab.
4.  Click **Create user**.
5.  Enter the email (e.g., `admin@gogo.bj`).
6.  Select "Mark email number as verified".
7.  Set a **temporary password**.
8.  Click **Create user**.

## Step 4: Verify Admin Access

1.  Navigate to `https://your-domain.com/admin`.
2.  You should be redirected to `/admin/login`.
3.  Log in with the email and temporary password you created.
4.  You will be prompted to change your password (default Cognito behavior).
5.  After password change, you should be redirected to the Admin Dashboard.

## Troubleshooting

-   **Build Fails**: Check the "Build" logs in Amplify. Ensure `npm install` succeeded.
-   **Login Loop**: Ensure you are using the correct email/password. Check browser console for network errors.
-   **Database Error**: Verify `DATABASE_URL` is correct and the database accepts connections from the internet (or configure VPC peering/access if using private RDS).

## Local Development (Optional)

To run with Amplify features locally, you can use the sandbox:

```bash
npx ampx sandbox
```

This will deploy a temporary backend and generate `amplify_outputs.json` for local use.
