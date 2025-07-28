# Available Online
# https://nextauthjs-fullstack-rickyig-fj7wovco9.vercel.app/

## Commit Tanggal 27/07/2025
## Available Locally: 
## https://github.com/RickyIG/nextauthjs-fullstack-rickyig/commit/636014555d746686bf91a9f3578cc63031133590
## https://github.com/RickyIG/nextauthjs-fullstack-rickyig/tree/636014555d746686bf91a9f3578cc63031133590

## Cara penggunaan:

```pnpm install```

Kemudian, setting .env dengan:
- .env yang ada di NeonDB
- .env tambahan:
  - EMAIL_FROM, 
  - EMAIL_PASSWORD (didapat dari Google Account Settings > Sandi Aplikasi),
  - NEXTAUTH_SECRET (didapat dari ```openssl rand -base64 32```)
  - BASE_URL=http://localhost:3000

Berikut format .env:
```
#.env dari NeonDB
# Recommended for most uses
DATABASE_URL=

# For uses requiring a connection without pgbouncer
DATABASE_URL_UNPOOLED=

# Parameters for constructing your own connection string
PGHOST=
PGHOST_UNPOOLED=
PGUSER=
PGDATABASE=
PGPASSWORD=

# Parameters for Vercel Postgres Templates
POSTGRES_URL=
POSTGRES_URL_NON_POOLING=
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=
POSTGRES_URL_NO_SSL=
POSTGRES_PRISMA_URL=

# Neon Auth environment variables for Next.js
NEXT_PUBLIC_STACK_PROJECT_ID=
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=
STACK_SECRET_SERVER_KEY=

# .env tambahan
EMAIL_FROM=
EMAIL_PASSWORD=
NEXTAUTH_SECRET=
BASE_URL=
```

Selanjutnya:

```pnpm dlx prisma migrate dev```

```pnpm dlx prisma generate```

```pnpm run dev```



This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
