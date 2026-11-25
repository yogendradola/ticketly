# TICKETLY

Ticketly is a React + Vite demonstration ticket-booking site. It uses beginner-friendly JSX components, React state and React Router, with Local Storage for demo accounts, events, seats and bookings.

## Run locally

```bash
npm install
npm run dev
```

Open the local address printed by Vite. To check the production build and lint:

```bash
npm run build
npm run lint
```

## Demo Admin

There is one configured Admin account. Admins sign in separately at `/admin/login`; change the account name, single email and password in `src/config/adminCredentials.js`.

- Email: `admin@ticketly.demo`
- Password: `Admin@123`

`/login` is the sign-in module chooser. Normal users sign in at `/user/login` and create accounts from **Sign up**. Admin login accepts only its configured email and password at `/admin/login`; there is no Admin registration or phone-number login.

## Main routes

- `/` — Home and event search
- `/login` — Choose User or Admin sign-in module
- `/user/login` — User login
- `/admin/login` — Admin login
- `/event/:id` — Event details
- `/booking/:id` — Seat selection and demo booking (requires a normal user account)
- `/dashboard` — User profile, bookings, favourites and recommendations
- `/tickets` — Tickets for the logged-in user
- `/admin` — Admin overview and booking totals
- `/admin/events` — Add, edit and delete events

Homepage event posters and banners are stored in `public/images`. New event poster paths should point to an image in that folder, such as `/images/event1.jpg`.

## Demo authentication notice

Accounts, passwords, sessions, events, seats and booking records are stored in the browser's Local Storage. This is intentionally simple for a college demonstration and is **not production-secure**. The payment flow is also a demonstration and does not charge a payment method.

Vercel's `vercel.json` rewrites page requests to the React entry point so direct route visits and browser refreshes work with React Router.
"# ticketly" 
