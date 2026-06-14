# Mail Tracking & Management System

A web application for registering, routing, and tracking official correspondence within an
organization. It logs incoming and outgoing mail, assigns recipients/officers through an
organizational hierarchy, threads replies, auto-generates reference numbers
(`MTS/YYYY/NNNNN`), sends real-time + overdue alerts, and includes a built-in chat.

**Stack:** React + TypeScript (frontend) · Node.js + Express + TypeScript (backend) · MySQL (Sequelize) · Socket.io

---

## Prerequisites

Install these first:

- **Node.js** 18+ and npm — https://nodejs.org
- **MySQL Server** 8.x — https://dev.mysql.com/downloads/mysql/
  (during install, set the `root` user to **no password**, or update `backend/.env` to match your password)

---

## Setup

### 1. Clone
```bash
git clone https://github.com/elijahbade/mail-tracking-system.git
cd mail-tracking-system
```

### 2. Create the database and load the seed data
This creates the `correspondence` database, all tables, and two demo users.
> ⚠️ This **drops and recreates** any existing `correspondence` database.
```bash
mysql -u root < database/seed.sql
```
(If your MySQL `root` has a password: `mysql -u root -p < database/seed.sql`)

### 3. Install dependencies
```bash
cd backend  && npm install
cd ../frontend && npm install
cd ..
```

### 4. Run (two terminals)
```bash
# Terminal 1 — backend API (http://localhost:5000)
cd backend && npm run dev

# Terminal 2 — frontend (http://localhost:3000)
cd frontend && npm start
```

Then open **http://localhost:3000/login**.

---

## Demo logins

| Name | Username | Password | Role |
|------|----------|----------|------|
| Elijah Ajibade | `elijah.ajibade@gmail.com` | `Admin@12345` | admin |
| Samuel Ajewole | `samuel.ajewole@gmail.com` | `Admin@12345` | employee |

Both belong to the same organizational unit, so they can send mail to each other —
log into one in a normal browser window and the other in a private/incognito window to
test the full send → inbox → reply flow and the real-time notification bell.

---

## Notes

- The backend auto-creates tables on startup via Sequelize `sync()`, so importing
  `database/seed.sql` is mainly for the **seed users and demo data**. Without it the app
  runs but has no accounts to log in with.
- Configuration lives in `backend/.env` (database credentials, JWT secrets) and
  `frontend/.env` (API URLs). Defaults assume MySQL `root` with no password on `localhost`.
- Email features (password reset, activation) require valid SMTP credentials in
  `backend/.env`; they are not needed for normal use.
