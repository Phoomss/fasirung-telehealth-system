# Fasirung Telehealth System

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
│   ├── prisma/             # Database schemas and migrations
│   └── src/                # Backend source code (Services, Controllers, Routes)
├── client-web/             # React (Vite) administration web dashboard
│   ├── src/components/     # UI Components and reusable tables
│   ├── src/hooks/          # Custom React hooks (state encapsulation)
│   └── src/pages/          # Admin, Officer, and Counselor pages
└── client-app/             # React Native (Expo) patient mobile app
    ├── screens/            # Native layouts (Home, Profile, Bookings, Assessment)
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
| **Web Client** | **React** (Vite) | Role-based portal, Tailwind/Vanilla CSS, Custom State Hooks. |
| **Mobile Client** | **React Native** (Expo) | Native components, virtualized listings, device caching. |

---

## 🔒 Relational Database Schema (`Prisma`)

The platform handles medical consulting workflows via these primary models:
* **`User`**: Accounts with role-based auth (`ADMIN`, `USER`, `OFFICER`, `COUNSELOR`).
* **`Booking`**: Appointment structures supporting `bloodTest` and `consult` types.
* **`Case`**: Active consults linking a `Booking` to a handling `Officer` and a treating `Physician`.
* **`Question`**, **`Answer`**, **`Response`**: A questionnaire engine supporting risk assessments.
* **`Content`**: Articles, media, and medical guidelines published by staff.

---

## ⚡ Key Architectural Patterns Applied (Refactored Highlights)

This codebase has been refactored to conform to high-level, production-ready design practices:

1. **Service-Repository Pattern**: The API layer is split into **Controllers** (handling request parameters and JSON responses) and **Services** (handling query calculations and Prisma actions).
2. **Centralized Error Middleware**: Manual try/catch blocks are replaced with a global Express handler (`errorHandler.js`) and custom `AppError` classes that log issues securely and translate SQL constraints cleanly.
3. **Payload Optimization**: User queries omit password hashes in standard retrievals to maximize data security and reduce JSON transfer sizes.
4. **React Custom Hook Decoupling**: All states, fetch cycles, page metrics, and modals are extracted into dedicated custom hooks (`useBookings.js`, `useContents.js`), leaving components to focus entirely on visual presentation.
5. **Mobile View Virtualization**: The mobile booking summaries utilize React Native **`<FlatList>`** with memory-optimized rendering profiles to recycle layout nodes and eliminate scrolling lag.

---

## 🚀 Getting Started

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
   DATABASE_URL="mysql://username:password@localhost:3306/telehealth_db"
   JWT_SECRET="your_secure_jwt_secret_token"
   ```
4. Deploy the Prisma database migration:
   ```bash
   npx prisma migrate dev
   ```
5. Seed or run the server in development mode (which auto-creates the default `admin` profile):
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
3. Boot up the Vite dev server:
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
4. Scan the QR code using your physical iOS/Android camera, or press `a` (Android) / `i` (iOS) to boot inside a emulator.

---

## 📜 License
Developed under secure, standard coding guidelines. All rights reserved.
