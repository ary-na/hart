Hart — Next.js portfolio and contact admin app

This project is a portfolio/contact management app built with the Next.js App Router. It provides a public portfolio with a contact form and an admin UI for viewing messages. The project uses a simple credentials-based NextAuth authentication flow, MongoDB for data storage, and AWS S3 for optional file uploads from the contact form.

Key features:

- Public pages: Home, About, Contact, Shop (with cart), Privacy
- Contact form: submits to MongoDB and optionally uploads an image to S3
- Admin UI: protected by NextAuth `Credentials` provider; view and delete messages
- NextAuth credentials flow: admin user creation is available via an init endpoint

Tech stack

- Frontend: Next.js (App Router), React 19, Tailwind CSS, DaisyUI
- Auth: next-auth using `Credentials` provider
- Database: MongoDB with Mongoose
- File storage: AWS S3 using `@aws-sdk/client-s3`

Getting started

Prerequisites:

- Node.js (v20+ recommended) and a package manager (`pnpm`, `npm`, `yarn`)
- MongoDB connection string (Atlas or self-hosted)
- AWS credentials with an S3 bucket for uploads (optional for file attachments)

Install packages and run locally:

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000 to view the site.

Environment variables
Create a `.env.local` file in the project root with the following variables (replace placeholders accordingly):

```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<db_name>
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<a-long-secure-secret>
JWT_SECRET=<jwt-secret>
AWS_REGION=ap-southeast-2
AWS_S3_BUCKET_NAME=<s3-bucket-name>
AWS_ACCESS_KEY_ID=<aws-access-key-id>
AWS_SECRET_ACCESS_KEY=<aws-secret>
ADMIN_USERNAME=<admin-username>
ADMIN_EMAIL=<admin-email>
ADMIN_PASSWORD=<admin-password>
```

The app includes an endpoint to create an initial admin user if needed: `POST /api/admin/initAdmin`.

API Endpoints

- `POST /api/contact` — submit contact info and optional image file (multipart/form-data). The server validates required fields and uploads the file to S3 if present.
- `GET /api/admin/messages` — fetch admin messages (protected)
- `DELETE /api/admin/messages/delete/:id` — delete a message (protected)
- `POST /api/admin/initAdmin` — create an admin user using ADMIN\_\* environment vars
  For authenticated routes, NextAuth is configured using `src/server/auth/nAuth.ts`.

Project layout highlights

- `src/app` — Next.js App Router pages and server actions
- `src/components` — React components (NavBar, LoginForm, ContactForm, Footer, etc.)
- `src/server` — server-side modules (auth, db, models, upload, proxy)
- `src/lib` — client/server shared utilities, types, and styles
- `src/hooks` — custom hooks (e.g., `useMessages`) used by UI

Deployment

- Build for production: `pnpm build`
- Start server in production mode: `pnpm start`
- When deploying to platforms like Vercel, set corresponding environment variables under project settings.

Security and best practices

- Keep secrets secure (do not commit `.env.local` or any keys)
- Use proper IAM permissions for the S3 bucket, and prefer short-lived credentials or roles in production

Troubleshooting

- If you encounter port or lock issues while developing, kill dev processes and remove `.next/dev/lock` before restarting the dev server.
- If NextAuth or type issues appear, ensure `NEXTAUTH_SECRET` and env variables are set correctly and restart the dev server.

Contributing

- Open issues for bugs or feature requests. Contributions are welcome via pull requests.

License

- This repo does not include a license file. Add one if you intend to open-source it.
