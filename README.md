# H♡ART

An art gallery and shop built with Next.js App Router. Visitors can browse original drawings, filter by tag, add pieces to a cart, and send commission enquiries. An admin panel lets the artist manage drawings, messages, and orders.

## Features

- **Gallery** — browsable grid of drawings with tag-based filtering and scroll-reveal animations
- **Drawing details** — full-size image, price, and add-to-cart flow
- **Cart & checkout** — persistent cart with shipping/billing form
- **Contact** — enquiry form with optional image upload
- **Auth** — email/password sign-up and Google OAuth; JWT sessions
- **Admin panel** — add/edit/delete drawings, manage inbox and archived messages
- **User profile** — view profile and update password

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS v4, DaisyUI v5 |
| Auth | next-auth v5 — Credentials + Google OAuth providers |
| Database | MongoDB with Mongoose |
| File storage | AWS S3 — presigned URLs, Sharp for thumbnail generation |
| Forms | React Hook Form + Zod v4 |

## Getting started

**Prerequisites:** Node.js 20+, a MongoDB connection string, AWS S3 bucket, Google OAuth credentials.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Create `.env.local` in the project root:

```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Auth (next-auth v5)
AUTH_SECRET=<long-random-secret>

# Google OAuth
GOOGLE_CLIENT_ID=<google-client-id>
GOOGLE_CLIENT_SECRET=<google-client-secret>

# MongoDB
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/<db>

# AWS S3
AWS_REGION=ap-southeast-2
AWS_S3_BUCKET_NAME=<bucket-name>
AWS_ACCESS_KEY_ID=<access-key-id>
AWS_SECRET_ACCESS_KEY=<secret-access-key>
```

## API routes

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/drawings` | List drawings (supports `?tag=`, `?skip=`, `?limit=`) |
| `GET` | `/api/drawings/tags` | All distinct tags |
| `POST` | `/api/drawings/create` | Upload a new drawing (admin) |
| `PUT` | `/api/drawings/update/[id]` | Edit a drawing (admin) |
| `DELETE` | `/api/drawings/delete/[id]` | Delete a drawing (admin) |
| `POST` | `/api/contact` | Submit a contact enquiry with optional image |
| `GET` | `/api/admin/messages` | Fetch messages (admin) |
| `POST` | `/api/admin/messages/archive/[id]` | Archive a message (admin) |
| `DELETE` | `/api/admin/messages/delete/[id]` | Delete a message (admin) |
| `GET` | `/api/user/cart` | Fetch cart items |
| `POST` | `/api/user/cart/add` | Add item to cart |
| `DELETE` | `/api/user/cart/remove/[id]` | Remove item from cart |
| `PUT` | `/api/user/profile/password` | Change password |
| `POST` | `/api/auth/signup` | Register a new user |

## Project structure

```
src/
  app/               # Next.js pages and API routes
    (auth)/          # Sign-in, sign-up, forgot-password
    (site)/          # Public and user pages
    (admin)/         # Admin-only pages
    api/             # Route handlers
  components/
    site/            # Public-facing components (NavBar, GalleryGrid, …)
    admin/           # Admin components (AddDrawingModal, …)
    auth/            # Auth form components
  hooks/             # Client-side data hooks (useDrawings, useCart, …)
  lib/
    types/           # Shared TypeScript types
    validators/      # Zod schemas
    ui/              # Shared UI primitives (Loader, FormField, …)
    styles/          # Global CSS and theme variables
  server/
    auth/            # next-auth config and helpers
    db/              # MongoDB connection
    models/          # Mongoose models (User, Drawing, Cart, Message, Order)
    upload/          # S3 upload and presigned URL helpers
```

## Deployment

```bash
pnpm build
pnpm start
```

Set all environment variables in your hosting provider (e.g. Vercel project settings). Make sure the S3 bucket policy allows the IAM user to `GetObject`, `PutObject`, and `DeleteObject`.

## Security notes

- Never commit `.env.local` or any secret keys
- Use scoped IAM permissions for the S3 bucket; prefer instance roles or short-lived credentials in production
- `AUTH_SECRET` must be a cryptographically random string of at least 32 characters
