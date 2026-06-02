# Fasirung Telehealth System 🏥✨

A full-stack, enterprise-grade digital health consultation and appointment booking platform. The project is organized as a monorepo consisting of a highly secure Express database backend, an administrative React web dashboard, and a patient-facing React Native mobile application.

---

## 🗺️ System Architecture Overview

The system is designed with a strict **Separation of Concerns** using a decoupled client-server architecture:

```
  ┌──────────────────────────────────────────────────────────┐
  │                       CLIENT LAYER                       │
  │                                                          │
  │  ┌─────────────────────────────┐ ┌────────────────────┐  │
  │  │  React Native Patient App   │ │   React Web Portal │  │
  │  │        (/client-app)        │ │    (/client-web)   │  │
  │  └──────────────┬──────────────┘ └─────────┬──────────┘  │
  └─────────────────┼──────────────────────────┼─────────────┘
                    │                          │
                    └───────────┬──────────────┘
                                │ JSON REST API
                                ▼
  ┌──────────────────────────────────────────────────────────┐
  │                       BACKEND LAYER                      │
  │                                                          │
  │  ┌────────────────────────────────────────────────────┐  │
  │  │             Express API (/server)                  │  │
  │  │  ┌──────────────┐ ┌──────────────┐ ┌────────────┐  │  │
  │  │  │   Routers    │ │ Controllers  │ │  Services  │  │  │
  │  │  └──────────────┘ └──────────────┘ └────────────┘  │  │
  │  │                                                    │  │
  │  │  ┌──────────────────────────────────────────────┐  │  │
  │  │  │ Centralized Global Error & Prisma Middleware │  │  │
  │  │  └──────────────────────────────────────────────┘  │  │
  │  └──────────────────────────┬─────────────────────────┘  │
  └─────────────────────────────┼────────────────────────────┘
                                │ Prisma ORM
                                ▼
  ┌──────────────────────────────────────────────────────────┐
  │                        DATA LAYER                        │
  │                                                          │
  │                  ┌───────────────────┐                   │
  │                  │  MySQL Database   │                   │
  │                  └───────────────────┘                   │
  └──────────────────────────────────────────────────────────┘
```

---

## 📂 Codebase Breakdown

The system workspace is divided into three primary projects:

```
fasirung-telehealth-system/
├── server/                 # Express backend server with Prisma ORM
│   ├── prisma/             # Database schemas, migrations, and seed engines
│   └── src/                # Backend source code (Services, Controllers, Routes)
├── client-web/             # React (Vite/Tailwind) administrative web dashboard
│   ├── src/components/     # UI Components (Sidebars, Tables, Cards, Modals)
│   ├── src/hooks/          # Custom React hooks encapsulating business logic
│   ├── src/pages/          # Admin, Officer, and Physician portals
│   └── src/layouts/        # Layout managers supporting responsive mobile drawers
└── client-app/             # React Native (Expo) patient mobile app
    ├── screens/            # Native screen layouts (Home, Profile, Bookings, Assessment)
    ├── hooks/              # High-performance mobile custom hooks
    └── services/           # Axios network endpoints
```

---

## 🛠️ Technology Stack

| Layer | Technology | Key Features |
| :--- | :--- | :--- |
| **Backend Server** | **Node.js** & **Express** | Service-Repository Pattern, Centralized Error Handling. |
| **Database ORM** | **Prisma ORM** | Schema safety, relational links, and transaction integrity. |
| **Database** | **MySQL** | ACID compliant relational storage for secure patient records. |
| **Web Client** | **React** (Vite + Tailwind v4) | Role-based portal, Custom Hooks, Modern HSL design system. |
| **Mobile Client** | **React Native** (Expo) | Native components, virtualized listings, device caching. |

---

## 🔒 Relational Database Schema (`Prisma`)

The platform handles medical consulting workflows via these primary models:
* **`User`**: Accounts with role-based auth (`ADMIN`, `USER`, `OFFICER`, `PHYSICIAN` / `COUNSELOR`).
* **`Booking`**: Appointment structures supporting `bloodTest` (ตรวจเลือด) and `consult` (จองคิวปรึกษา) types.
* **`Case`**: Active consults linking a `Booking` to a handling `Officer` and a treating `Physician`.
* **`Question`**, **`Answer`**, **`Response`**: Questionnaire engine supporting risk and diagnostics assessments.
* **`Content`**: Educational medical articles, guidelines, and advisories published by staff.

---

## ⚡ Key Visual & Architectural Refactoring Highlights

This codebase is designed and optimized using modern frontend architecture practices and visual design guidelines:

### 1. Premium Visual Redesign & HSL Color Tokens
* Configured tailored **HSL-based Theme Colors** in `index.css` (Sky Blue, Emerald Green, Amber, Violet) ensuring harmonious accents and a premium, clean medical aesthetics layout.
* Modern typography with Outfit/Inter font weights, smooth scale transitions (`hover:scale-[1.01]`), and clean visual spacing rules.

### 2. Centralized Badge Design System ([Badge.jsx](file:///client-web/src/components/ui/Badge.jsx))
* Replaced outdated generic pills with a custom, highly styled `Badge` component that supports:
  * Soft translucent background states (`bg-[color]/75 border-[color]/60`) with dynamic hover changes.
  * Real-time pulsing status dots (`dot={true} pulsing={true}`) to indicate active/pending consultation cases.
  * Native Lucide icons integrated inline (`Shield` for Admins, `UserCheck` for Officers, `Stethoscope` for Physicians, `Droplet` for Blood Tests, `MessageSquare` for Consultations, etc.).

### 3. Fully Responsive Mobile drawer Layouts
* Integrated responsive hamburger controls inside the admin/officer/physician headers.
* Side menus transition seamlessly to togglable mobile slide-out drawers on smaller screens (`max-md` screen states), maintaining full navigation flexibility down to mobile viewports.

### 4. Complete Thai Localization & Database Seeding
* Fully localized the medical database content. The seed engine (`seed.js`) deploys native Thai diagnostic questions, answers, and medical information articles into the MySQL instance.
* Solved strict SQL timestamps issues by standardizing DateTime columns to `DATETIME(3)`.

### 5. Custom Hook State Encapsulation
* Extracted state hooks (e.g. `useBookings.js`, `useContents.js`) from visual components, isolating data mutations, query parameters, search states, and pagination from UI presentation.

---

## 🐳 Dockerized Local Development (Recommended)

The system is fully containerized using Docker Compose. Start all services (Database, API, Web Dashboard, Mobile metro bundler) with a single command:

```bash
docker-compose up --build -d
```

### Port Mapping Summary
* **MySQL Database**: `3306` (Credentials: `telehealth_user` / `user_secure_password`)
* **REST API Server**: `http://localhost:8080`
* **Administrative Web Portal**: `http://localhost:3000`
* **Mobile Metro Bundler**: `http://localhost:8081`

---

## 🚀 Manual Getting Started

### 1. Setup the Backend Server
1. Navigate to the server folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure your environment variables in `.env`:
   ```env
   PORT=8080
   DATABASE_URL="mysql://telehealth_user:user_secure_password@localhost:3306/telehealth_db"
   JWT_SECRET="your_secure_jwt_secret_token_here"
   ```
4. Deploy the database migrations and seed default data:
   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```
5. Run the server in development mode:
   ```bash
   npm run dev
   ```

### 2. Setup the Web Dashboard
1. Navigate to the web folder:
   ```bash
   cd ../client-web
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Boot up the Vite development server:
   ```bash
   npm run dev
   ```

### 3. Setup the Mobile Patient App
1. Navigate to the mobile folder:
   ```bash
   cd ../client-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Launch the Expo application:
   ```bash
   npx expo start
   ```

---

## 📜 License
Developed under secure, standard coding guidelines. All rights reserved.
