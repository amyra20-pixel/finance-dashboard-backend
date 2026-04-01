Finance Dashboard Backend

Overview
This project is a backend system for a finance dashboard that manages users, financial records, and provides summary analytics.

It supports role-based access control (RBAC), data validation, and structured API design.

Features

1. User Management

- Create users
- Assign roles (admin, analyst, viewer)
- Enforce role-based access

2. Financial Records

- Create income/expense records
- View and filter records
- Link records to users

3. Dashboard APIs

- Total income
- Total expenses
- Net balance
- Category breakdown
- Recent transactions

4. Access Control (RBAC)

- Admin → full access
- Analyst → read access to records + dashboard
- Viewer → dashboard only

5. Validation & Error Handling

- Input validation for all APIs
- Proper error responses
- Unique constraints handled

Tech Stack

- Node.js
- Express.js
- Prisma ORM
- SQLite

Setup Instructions

bash commands:
git clone <my-repo>
cd finance-backend
npm install
npx prisma migrate dev
npm run dev
