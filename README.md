# YouAi Whitelabel Sample

This sample repository demonstrates how to create and authenticate headless users for your YouAi organization.

## How It Works

You have a database of your own users. Those users have some unique component (ID or username). The YouAi API for Organizations allows you to use that unique ID to generate a signed URL to allow that user to access a YouAi AI without going through a YouAi authentication flow, creating a YouAi account, or seeing any YouAi branding.

In more precise terms, the YouAi API for Organizations allows you to create headless, managed YouAi users scoped to your organization and identified by a foreign ID (the user's ID in your system, rather than the user's ID in YouAi's database).

## Getting Started

First, create a new organization from your YouAi account by visiting: https://youai.ai/settings/organizations

Then, copy the API key from the organization and paste it at the top of app/api/getSecureUrl/route.ts

Then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
