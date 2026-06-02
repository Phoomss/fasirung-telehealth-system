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
  │                  │ PostgreSQL Database │                 │
  │                  └───────────────────┘                   │
  └──────────────────────────────────────────────────────────┘
```

---

## 📂 Codebase Breakdown

The system workspace is divided into three primary projects. Access key configurations and entry files directly via the links below:

```
fasirung-telehealth-system/
├── docker-compose.yml      # Docker Multi-container Orchestration (docker-compose.yml)
├── server/                 # Express backend server with Prisma ORM
│   ├── prisma/
│   │   ├── schema.prisma   # Prisma Database Schema (schema.prisma)
│   │   └── seed.js         # Thai Medical Seed Database Engine (seed.js)
│   └── src/
│       ├── server.js       # App Bootstrapping & Middleware Router (server.js)
│       ├── routes/         # Router controllers (e.g. authRoutes.js, bookingRoutes.js)
│       ├── controllers/    # Request handlers (e.g. authController.js, bookingController.js)
│       └── services/       # Core Business Logic Services (e.g. authService.js, bookingService.js)
├── client-web/             # React (Vite/Tailwind) administrative web dashboard
│   ├── src/
│   │   ├── App.jsx         # Client Web Layout & Routes (App.jsx)
│   │   ├── index.css       # HSL Color Tokens & Tailwind Layer Directives (index.css)
│   │   ├── components/     # UI Component system (Badge.jsx, Button.jsx, FormInput.jsx, Table.jsx)
│   │   ├── hooks/          # Custom state encapsulation hooks (useBookings.js, useContents.js)
│   │   └── pages/          # Admin, Officer, and Physician portals & auth screens
└── client-app/             # React Native (Expo) patient mobile app
    ├── App.js              # Native Application Entry Point (App.js)
    ├── app.json            # Expo Manifest & Android/iOS Configs (app.json)
    ├── navigate/           # Stack and Tab Navigation Routing (AppNavigation.jsx, HomeStackScreen.jsx)
    ├── screens/            # Native client screens (HomeScreen.jsx, ProfileScreen.jsx, ConsultScreen.jsx)
    │   └── auth/           # Mobile authentication screens (LoginScreen.jsx, SignupScreen.jsx)
    ├── hooks/              # Native state encapsulation hooks (useBookingList.js, useProfile.js)
    └── services/           # Axios client HTTP configuration
```

- 🐋 Infrastructure: [docker-compose.yml](file:///Users/mac/Desktop/workspace/fasirung-telehealth-system/docker-compose.yml)
- 🖥️ Backend Server Configuration: [server.js](file:///Users/mac/Desktop/workspace/fasirung-telehealth-system/server/src/server.js)
- 💾 Database Engine: [schema.prisma](file:///Users/mac/Desktop/workspace/fasirung-telehealth-system/server/prisma/schema.prisma) | [seed.js](file:///Users/mac/Desktop/workspace/fasirung-telehealth-system/server/prisma/seed.js)
- 🌐 Web Client Interface: [App.jsx](file:///Users/mac/Desktop/workspace/fasirung-telehealth-system/client-web/src/App.jsx) | [index.css](file:///Users/mac/Desktop/workspace/fasirung-telehealth-system/client-web/src/index.css)
- 🎨 Web Component Library: [Badge.jsx](file:///Users/mac/Desktop/workspace/fasirung-telehealth-system/client-web/src/components/ui/Badge.jsx) | [Button.jsx](file:///Users/mac/Desktop/workspace/fasirung-telehealth-system/client-web/src/components/ui/Button.jsx) | [FormInput.jsx](file:///Users/mac/Desktop/workspace/fasirung-telehealth-system/client-web/src/components/ui/FormInput.jsx) | [Table.jsx](file:///Users/mac/Desktop/workspace/fasirung-telehealth-system/client-web/src/components/ui/Table.jsx)
- 📱 Mobile App Entry: [App.js](file:///Users/mac/Desktop/workspace/fasirung-telehealth-system/client-app/App.js) | [app.json](file:///Users/mac/Desktop/workspace/fasirung-telehealth-system/client-app/app.json)
- 🗺️ Mobile Routing & Pages: [AppNavigation.jsx](file:///Users/mac/Desktop/workspace/fasirung-telehealth-system/client-app/navigate/AppNavigation.jsx) | [LoginScreen.jsx](file:///Users/mac/Desktop/workspace/fasirung-telehealth-system/client-app/screens/auth/LoginScreen.jsx) | [SignupScreen.jsx](file:///Users/mac/Desktop/workspace/fasirung-telehealth-system/client-app/screens/auth/SignupScreen.jsx)

---

## 🛠️ Technology Stack

| Layer | Technology | Key Features |
| :--- | :--- | :--- |
| **Backend Server** | **Node.js** & **Express** | Service-Repository Pattern, Centralized Error Handling, Middleware Protection |
| **Database ORM** | **Prisma ORM** | Schema safety, relational links, and transaction integrity |
| **Database** | **PostgreSQL** | ACID compliant relational storage for secure patient records |
| **Web Client** | **React** (Vite + Tailwind v4) | Role-based portal, Custom Hooks, Modern HSL design system |
| **Mobile Client** | **React Native** (Expo) | Native components, stack navigation, virtualized listings, local state |

---

## 🔒 Relational Database Schema (`Prisma`)

The platform handles medical consulting workflows via these primary models specified in [schema.prisma](file:///Users/mac/Desktop/workspace/fasirung-telehealth-system/server/prisma/schema.prisma):

* **`User`**: Accounts with role-based auth (`ADMIN`, `USER`, `OFFICER`, `COUNSELOR`).
* **`Booking`**: Appointment structures supporting `bloodTest` (ตรวจเลือด) and `consult` (จองคิวปรึกษา) types.
* **`Case`**: Active consults linking a `Booking` to a handling `Officer` and a treating `Physician` (represented in the database as `COUNSELOR`).
* **`Question`**, **`Answer`**, **`Response`**: Questionnaire engine supporting risk and diagnostics assessments.
* **`Content`**: Educational medical articles, guidelines, and advisories published by staff.

---

## ⚡ Key Visual & Architectural Refactoring Highlights

This codebase is designed and optimized using modern frontend architecture practices and visual design guidelines:

### 1. Premium Visual Redesign & HSL Color Tokens
* Configured tailored **HSL-based Theme Colors** in [index.css](file:///Users/mac/Desktop/workspace/fasirung-telehealth-system/client-web/src/index.css) (Sky Blue, Emerald Green, Amber, Violet) ensuring harmonious accents and a premium, clean medical aesthetics layout.
* Modern typography with Outfit/Inter font weights, smooth scale transitions (`hover:scale-[1.01]`), and clean visual spacing rules.

### 2. Centralized Badge Design System ([Badge.jsx](file:///Users/mac/Desktop/workspace/fasirung-telehealth-system/client-web/src/components/ui/Badge.jsx))
* Replaced outdated generic pills with a custom, highly styled `Badge` component that supports:
  * Soft translucent background states (`bg-[color]/75 border-[color]/60`) with dynamic hover changes.
  * Real-time pulsing status dots (`dot={true} pulsing={true}`) to indicate active/pending consultation cases.
  * Native Lucide icons integrated inline (`Shield` for Admins, `UserCheck` for Officers, `Stethoscope` for Physicians, `Droplet` for Blood Tests, `MessageSquare` for Consultations, etc.).

### 3. Fully Responsive Mobile Drawer Layouts
* Integrated responsive hamburger controls inside the admin/officer/physician headers.
* Side menus transition seamlessly to togglable mobile slide-out drawers on smaller screens (`max-md` screen states), maintaining full navigation flexibility down to mobile viewports.

### 4. Complete Thai Localization & Database Seeding
* Fully localized the medical database content. The seed engine in [seed.js](file:///Users/mac/Desktop/workspace/fasirung-telehealth-system/server/prisma/seed.js) deploys native Thai diagnostic questions, answers, and medical information articles into the PostgreSQL instance.
* Solved strict SQL timestamps issues by standardizing DateTime columns to `DATETIME(3)`.

### 5. Custom Hook State Encapsulation
* Extracted state hooks (e.g. [useBookings.js](file:///Users/mac/Desktop/workspace/fasirung-telehealth-system/client-web/src/hooks/useBookings.js), [useContents.js](file:///Users/mac/Desktop/workspace/fasirung-telehealth-system/client-web/src/hooks/useContents.js)) from visual components, isolating data mutations, query parameters, search states, and pagination from UI presentation.

---

## 🐳 Dockerized Local Development (Recommended)

The system is fully containerized using Docker Compose. Start all services (Database, API, Web Dashboard, Mobile metro bundler) with a single command:

```bash
docker-compose up --build -d
```

### Port Mapping Summary
* **PostgreSQL Database**: `5435` (Credentials: `telehealth_user` / `user_secure_password`)
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
   DATABASE_URL="postgresql://telehealth_user:user_secure_password@localhost:5435/telehealth_db?schema=public"
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

## 📜 Standardized API Endpoints

The backend routes maps standard CRUD operations for key entities:
* **Auth**: `/api/auth/login`, `/api/auth/register`, `/api/auth/me`
* **Bookings**: `/api/bookings` (GET, POST, GET by ID, DELETE)
* **Cases**: `/api/cases` (GET, POST, UPDATE by ID, DELETE)
* **Questions & Answers**: `/api/questions`, `/api/answers`
* **Responses**: `/api/responses` (User assessments)
* **Contents**: `/api/contents` (GET, POST, DELETE)

---

## 📜 License
Developed under secure, standard coding guidelines. All rights reserved.
