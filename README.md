# Finance Dashboard Backend

## Overview

This project is a backend system for a finance dashboard that manages users, financial records, and provides analytical insights.

It is built using Node.js, Express, and Prisma with SQLite as the database. The system demonstrates role-based access control (RBAC), data validation, secure API design, and aggregated dashboard logic.

---

## Features

### 1. User & Role Management

- Create and manage users
- Assign roles: ADMIN, ANALYST, VIEWER
- Manage user status (ACTIVE / INACTIVE)
- Enforce role-based permissions using middleware
- Secure authentication using JWT

---

### 2. Financial Records Management

- Create financial records (income / expense)
- View records with filtering options:
  - Type (INCOME / EXPENSE)
  - Category
  - Date range
- Update records (with validation)
- Delete records
- Each record is linked to a specific user
- Ownership enforcement (users can only modify their own records unless ADMIN)

---

### 3. Dashboard Summary APIs

Provides aggregated data for analytics:

- Total income
- Total expenses
- Net balance
- Category-wise totals
- Recent transactions
- Monthly trends (income vs expense)

All dashboard data is filtered based on user role:

- ADMIN → sees all data
- ANALYST / VIEWER → sees only their own data

---

### 4. Access Control (RBAC)

Role-based access is enforced at both:

- Middleware level (route protection)
- Service level (ownership checks)

#### Permissions:

- **ADMIN**
  - Full access (users + records + dashboard)

- **ANALYST**
  - Create, view, update records
  - Access dashboard
  - Cannot delete records or manage users

- **VIEWER**
  - View records
  - Access dashboard
  - Cannot create/update/delete records

---

### 5. Validation & Error Handling

- Input validation for all APIs
- Email and role validation for users
- Amount, type, and date validation for records
- Proper HTTP status codes:
  - 400 → Bad Request
  - 401 → Unauthorized
  - 403 → Forbidden
  - 404 → Not Found
  - 500 → Server Error
- Protection against invalid operations (e.g., unauthorized updates)

---

### 6. Data Persistence

- Uses SQLite as the database for simplicity
- Prisma ORM for database access and schema management
- Relational data model:
  - User ↔ FinancialRecord (one-to-many)
- Persistent storage (not in-memory)

SQLite is used for simplicity and easy setup, but the schema can be migrated to other databases like PostgreSQL or MySQL for production use.

---

## Tech Stack

- Node.js
- Express.js
- Prisma ORM
- SQLite
- JWT (Authentication)

---

## Setup Instructions

```bash
git clone <your-repo-link>
cd finance-dashboard-backend
npm install
npx prisma migrate dev
npx prisma studio
npm run dev
```
