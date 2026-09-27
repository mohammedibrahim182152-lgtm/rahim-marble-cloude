# Rahim Marble Company — Premium Business Website

A production-ready Next.js 15 website for Rahim Marble Company, Delhi's premier marble dealer and handicraft manufacturer.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Auth**: NextAuth v5 (Google OAuth — admin-only)
- **Database**: PostgreSQL + Prisma ORM
- **Email**: Nodemailer (Gmail SMTP)
- **Deployment**: Vercel

## Features

- Luxury marble-themed design (Black / White / Gold)
- 7 public pages: Home, About, Products, Gallery, Contact, Testimonials, FAQ
- Inquiry popup (shown once per session)
- WhatsApp floating button
- Full Admin Panel at `/admin`
- Complete CRUD for Inquiries, Quotations, Contacts, Products, Gallery, Testimonials
- CSV export for all data tables
- Email notifications via Nodemailer
- SEO: metadata, OG tags, sitemap, robots.txt, JSON-LD
- Auth: only `mohammedibrahim182152@gmail.com` can access admin

## Quick Start

### 1. Clone and Install

```bash
git clone <repo-url>
cd rahim-marble-company
npm install
```

### 2. Environment Variables

```bash
cp .env.example .env.local
```

Fill in:
- `DATABASE_URL` — PostgreSQL connection string
- `AUTH_SECRET` — Random secret (`openssl rand -base64 32`)
- `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` — Google OAuth credentials
- `SMTP_USER` / `SMTP_PASS` — Gmail App Password

### 3. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project → Enable Google+ API
3. Create OAuth credentials (Web application)
4. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
5. For production: `https://yourdomain.com/api/auth/callback/google`

### 4. Database Setup

```bash
npm run db:migrate   # Run migrations
# or
npm run db:push      # Push schema directly (development)
```

### 5. Gmail App Password

1. Enable 2FA on your Gmail account
2. Go to Google Account → Security → App Passwords
3. Generate a password for "Mail"
4. Use that as `SMTP_PASS`

### 6. Run Development Server

```bash
npm run dev
```

Visit:
- Website: http://localhost:3000
- Admin: http://localhost:3000/admin

## Deployment on Vercel

1. Push to GitHub
2. Import repo in Vercel
3. Add all environment variables in Vercel dashboard
4. Set `NEXTAUTH_URL` to your production URL
5. Deploy

## Project Structure

```
src/
├── app/
│   ├── (site)/         # Public pages with shared layout
│   │   ├── about/
│   │   ├── contact/
│   │   ├── faq/
│   │   ├── gallery/
│   │   ├── products/
│   │   └── testimonials/
│   ├── admin/          # Admin panel (protected)
│   │   ├── dashboard/
│   │   ├── inquiries/
│   │   ├── quotations/
│   │   ├── contacts/
│   │   ├── gallery/
│   │   ├── products/
│   │   └── testimonials/
│   └── api/            # API routes
├── components/
│   ├── layout/         # Navbar, Footer
│   ├── ui/             # InquiryPopup, WhatsAppButton
│   └── admin/          # AdminSidebar
└── lib/
    ├── data.ts          # Static product/testimonial data
    ├── email.ts         # Nodemailer helpers
    ├── prisma.ts        # Prisma client
    └── utils.ts         # Utilities + data re-exports
```

## Admin Panel

URL: `/admin`

Login: Only `mohammedibrahim182152@gmail.com` via Google OAuth.

Features:
- Dashboard with stats and recent activity
- Inquiry management (view, mark contacted, delete, export CSV)
- Quotation management (view, update status, delete, export CSV)
- Contact messages (view, reply, delete, export CSV)
- Gallery management (add, delete, feature images)
- Product management (add, edit, delete, toggle active/featured)
- Testimonials management (add, edit, delete)

## Contact

**Rahim Marble Company**  
A-1/2, WHS Kirti Nagar Marble Market  
New Delhi, Delhi 110015  
Email: mohammedibrahim182152@gmail.com
