# FEROZE — Designs & Holdings

Production-ready, full-stack website for **FEROZE** (www.ferozedesigns.com) — a luxury brand with two verticals under one unified site:

- **Feroze Interiors** (`@feroze.arch`) — Interior & architecture design studio, est. 1996.
- **Feroze Automotive Decor** (`@ferozeautomotivedecor`) — Automotive-inspired luxury furniture engineered from real car parts.

Luxury, minimal, editorial, dark-forward design — "a high-end architecture magazine meets a supercar showroom."

---

## 🧱 Tech Stack

| Layer     | Tech                                                                 |
| --------- | ------------------------------------------------------------------- |
| Frontend  | React 18, Vite, React Router, Tailwind CSS, Framer Motion, GSAP, Swiper |
| Backend   | Node.js, Express, Mongoose (MongoDB Atlas)                          |
| Auth      | JWT in httpOnly cookies, bcrypt (rounds=12)                         |
| Images    | Cloudinary (`f_auto,q_auto`)                                        |
| Email     | Nodemailer (Gmail SMTP)                                             |
| Hosting   | Frontend → Vercel · Backend → Render · DNS → GoDaddy                |

---

## 📁 Structure

```
feroze-designs/
├── client/   # React + Vite frontend
├── server/   # Express + MongoDB backend
├── render.yaml
└── README.md
```

See inline folder layout in the codebase; key directories: `client/src/{pages,components,admin,services,hooks,context,utils}` and `server/src/{config,models,controllers,routes,middleware,utils}`.

---

## 🚀 Local Development

### Prerequisites
- Node.js ≥ 18
- A MongoDB Atlas cluster (or local MongoDB) — optional for frontend-only work
- Cloudinary account (optional — image uploads)
- Gmail app password (optional — email)

> **Note:** Both apps include a `.npmrc` with `legacy-peer-deps=true` (required because `multer-storage-cloudinary` peers on an older Cloudinary major).

### 1. Backend

```bash
cd server
cp .env.example .env      # then fill in real values
npm install
npm run seed:admin        # creates the first superadmin
npm run seed:content      # (optional) seeds demo Feroze projects/products/testimonials
npm run dev               # http://localhost:5000
```

Health check: `GET http://localhost:5000/api/health`

> Without `MONGODB_URI`/`JWT_SECRET` the server still boots in **degraded dev mode** (public list endpoints return empty; the frontend falls back to bundled demo content).

### 2. Frontend

```bash
cd client
cp .env.example .env.local   # set VITE_API_URL etc.
npm install
npm run dev                  # http://localhost:5173
```

> The frontend ships with **static fallback data** (`src/services/fallbackData.js`) so all public pages render fully even with no backend running.

---

## 🔑 Environment Variables

### Server (`server/.env`)
| Var | Description |
| --- | --- |
| `NODE_ENV` | `development` / `production` |
| `PORT` | API port (Render uses 10000) |
| `MONGODB_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | ≥ 64-char secret for signing tokens |
| `JWT_EXPIRE` | Access token lifetime (default `1h`) |
| `COOKIE_EXPIRE_DAYS` | Auth cookie max-age (days) |
| `CLOUDINARY_CLOUD_NAME` / `_API_KEY` / `_API_SECRET` | Cloudinary credentials |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_EMAIL` / `SMTP_PASSWORD` | Gmail SMTP |
| `FROM_EMAIL` / `ADMIN_EMAIL` | Email sender / admin recipient |
| `FRONTEND_URL` | Allowed CORS origin (prod) |
| `SEED_ADMIN_USERNAME` / `_EMAIL` / `_PASSWORD` | Used by `seed:admin` |

### Client (`client/.env.local`)
| Var | Description |
| --- | --- |
| `VITE_API_URL` | Backend base URL incl. `/api` |
| `VITE_CLOUDINARY_CLOUD_NAME` | Public Cloudinary cloud name |
| `VITE_WHATSAPP_NUMBER` | Digits only (e.g. `918355821370`) |
| `VITE_INSTAGRAM_INTERIORS` / `_AUTOMOTIVE` | Handles (no `@`) |

---

## 🔌 API Reference

**Public**
```
GET  /api/projects                 ?category=&featured=&location=&year=&page=&limit=
GET  /api/projects/:slug
GET  /api/products                 ?category=&featured=&engineType=
GET  /api/products/:slug
GET  /api/testimonials             ?brand=
POST /api/inquiries
GET  /api/health
```

**Auth**
```
POST /api/auth/login    POST /api/auth/logout    GET /api/auth/me
```

**Admin (JWT cookie required)**
```
GET    /api/admin/dashboard
CRUD   /api/admin/projects     + PATCH /:id/publish
CRUD   /api/admin/products     + PATCH /:id/publish
CRUD   /api/admin/testimonials
GET    /api/admin/inquiries     PATCH /api/admin/inquiries/:id/status
POST   /api/upload/image  POST /api/upload/images  DELETE /api/upload/image
```

---

## 🔐 Admin Panel

- URL: `/admin/login` → dashboard at `/admin/dashboard`
- Default seed credentials: **admin@ferozedesigns.com / changeme_on_first_login** (change immediately).
- Full CRUD for Projects, Products, Testimonials; Inquiries with status workflow + CSV export; drag-and-drop Cloudinary image uploader with cover/reordering.
- All `/admin/*` routes are guarded client-side and protected server-side with JWT.

---

## 🛡️ Security

- JWT (1h) in **httpOnly, Secure, SameSite=Strict** cookie — never localStorage.
- bcrypt `saltRounds=12`.
- Rate limiting: 100 req/15min globally; **5 req/15min** on `/api/auth`.
- Helmet security headers; strict CORS allowlist.
- Server-side validation (express-validator) + input sanitization on all writes.
- Upload guard: `image/jpeg|png|webp` only, max 10MB (client + server).
- `/admin` disallowed in `robots.txt`; `noindex` on admin pages.

---

## ⚡ Performance & SEO

- `React.lazy` + Suspense route splitting; manual vendor chunks.
- `LazyImage` (native lazy-load + blur-up) and Cloudinary `f_auto,q_auto`.
- Per-page meta via `react-helmet-async` (title, description, canonical, OG, Twitter).
- `sitemap.xml` + `robots.txt` in `client/public`.
- `prefers-reduced-motion` respected globally (CSS + Framer `MotionConfig` + counter/reveal hooks).

---

## 🌍 Deployment

### Frontend → Vercel
1. Import the repo; set **Root Directory** to `client`.
2. Build command `npm run build`, output `dist` (auto-detected). `vercel.json` adds SPA rewrites + security headers.
3. Add env vars (`VITE_*`).
4. Project → Settings → Domains → add `ferozedesigns.com` and `www.ferozedesigns.com`.

### Backend → Render
1. New → Blueprint, point at this repo (`render.yaml` deploys the `server` service).
2. Set the `sync: false` secrets in the Render dashboard.
3. Health check path `/api/health`. After deploy, set the frontend `VITE_API_URL` to the Render URL.

### GoDaddy → Vercel DNS
1. GoDaddy → DNS Management for `ferozedesigns.com`.
2. Delete the existing `@` **A** record.
3. Add **A** record: `@` → `76.76.21.21`.
4. Add **CNAME**: `www` → `cname.vercel-dns.com`.
5. Back in Vercel → Domains, add both domains; SSL is auto-provisioned.

---

## 📧 Email Flow

On a contact/inquiry submission the server (fire-and-forget) sends:
1. **Confirmation** to the client — "Thank you for reaching out — Feroze Designs".
2. **Notification** to admin — "New Inquiry — {type} from {name}" with a table of all fields + a link to `/admin/inquiries`.

If SMTP isn't configured the submission still succeeds (emails are skipped with a warning).

---

## 📜 Scripts

**server:** `npm start` · `npm run dev` · `npm run seed:admin` · `npm run seed:content`
**client:** `npm run dev` · `npm run build` · `npm run preview`

---

© Feroze Designs & Holdings. Mumbai | Dubai.
