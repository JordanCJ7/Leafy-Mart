# Leafy Mart 🌿 (SPSMS)

Leafy Mart is a full-stack web application (MERN) for managing plant-store operations: inventory, orders, suppliers and customer-facing shopping.

Key technologies: React (client), Node.js + Express (server), MongoDB.

Goals: provide a simple developer setup, clear run instructions, and notes for contributors.

## Quick start (development)

These instructions match this repository's layout (top-level `server/` and `client/` folders).

1) Install dependencies

PowerShell (from repo root):

```powershell
cd server; npm install
cd ..\client; npm install
```

2) Environment variables (server)

Create `server/.env` with at minimum:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

3) Run for development

- Start the server with automatic reload (nodemon):

```powershell
cd server; npm run dev
```

- Start the React dev server:

```powershell
cd client; npm start
```

Notes:
- The React app uses a proxy to `http://localhost:5000` (see `client/package.json`).
- The server package.json provides `start` (node server.js) and `dev` (nodemon) scripts.

Alternate: both services are configured as VS Code tasks in this workspace. From the VS Code Run/Tasks panel look for:
- "Start Backend Server" — runs `cd server; npx nodemon server.js` (background task)
- "Start Frontend Client" — runs `cd client; npm start` (background task)

## Production-style run

1. Build frontend

```powershell
cd client; npm run build
```

2. Serve the static build from your preferred host or configure the `server` to serve `client/build`.

## Project structure (top-level)

```
leafy-mart/
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── utils/
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── README.md
└── ...
```

## Scripts of interest

- server/package.json
	- `npm run dev` — development server with nodemon
	- `npm start` — run with node
- client/package.json
	- `npm start` — React dev server
	- `npm run build` — production build

## Testing & debugging

- Use Postman or similar to exercise API endpoints at `http://localhost:5000`.
- Client tests (if present) can be run from `client` with `npm test`.

## Implemented features (current)

The sections below reflect features already implemented in this repository (based on server controllers and client pages/contexts).

- Backend
  - Product management: add, update, delete, list, get-by-id, and endpoint for product categories/tags.
  - Orders: create orders, validate stock, decrement/increment stock on create/cancel, list user/admin orders with pagination and filters, update order status and payment status, basic order statistics aggregation.
  - Authentication: customer registration, customer login, admin login, get/update profile, JWT token generation and usage in controllers.
  - Utilities: simple notification utility (currently logs messages to console).

- Frontend
  - Product browsing UI (product list and product detail pages).
  - Cart and checkout pages, plus basic payment page stub.
  - Wishlist and profile pages.
  - Admin UI pages: dashboard, product management, user/customer management.
  - App-wide contexts for auth, cart and wishlist; localStorage hook for persistence.

These implemented pieces form a working developer experience for local testing: run the server, start the React app, register/login users, browse products, place orders, and manage products from the admin UI.

## Improvements & roadmap (suggested / work to do)

Practical, prioritized items to make the system production-ready and easier to maintain.

1) Security & stability
	- Replace the console-based notification with real channels (email/SMS/push) and a queued worker for reliability.
	- Harden authentication: store JWT secret securely, shorten token lifetimes, add refresh tokens, and ensure role-based access enforcement in middleware.
	- Add input validation (server + client) and sanitize inputs to prevent injection attacks.
	- Rate limiting and brute-force protections on auth endpoints.

2) Testing, CI & quality
	- Add unit and integration tests for critical backend controllers and frontend components (happy path + edge cases).
	- Configure CI (GitHub Actions) to run lint, tests and build on PRs.
	- Add ESLint/Prettier and a pre-commit hook to enforce style.

3) Observability & operations
	- Add structured logging (winston/pino) and error tracking (Sentry).
	- Add health-check endpoints and basic metrics (request rates, error rates).
	- Provide a `server/.env.example` and documented run/seed steps.

4) Payments & business flows
	- Integrate a payment gateway (Stripe/PayPal) and implement secure server-side payment verification.
	- Extend order lifecycle (refunds, partial cancellations, retries) and improve tracking/notifications.

5) Performance & UX
	- Move images to cloud storage (S3 or static CDN) and serve optimized images.
	- Add server-side pagination and indexed search for product listings; consider caching popular queries.
	- Improve front-end forms, add friendly error handling and loading states.

6) Deployment & infra
	- Add Dockerfile(s) and docker-compose for local and staging environments.
	- Add deployment docs (Heroku, DigitalOcean App Platform, or container registry + Kubernetes manifest).

If you'd like, I can implement the highest-priority items incrementally (for example: add `server/.env.example`, create a basic GitHub Actions workflow that runs tests/builds, or wire up ESLint + Prettier). Tell me which one to do first.

## Contributors

- IT23845664 – M V D S Hendahewa
- IT23576902 – D G D D Jayathissa
- IT23699144 – E B T B Abeynayaka

## License

This project is developed for academic purposes under Sri Lanka Institute of Information Technology (SLIIT).

