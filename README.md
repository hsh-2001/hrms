# HRMS

Human Resource Management System monorepo with:

- `hrms-fe`: React 19 + TypeScript + Vite frontend
- `hrms-be`: Express + PostgreSQL backend with WebSocket support

The project covers employee management, departments, positions, attendance, leave, payroll, reporting, company settings, roles, and user access control.

## Project Structure

```text
hrms/
├── hrms-be/   # API server, database scripts, websocket setup
└── hrms-fe/   # web client
```

## Main Features

- Authentication and role-based access control
- Company and employee management
- Department and position management
- Attendance and clock-in / clock-out flows
- Leave requests, leave types, and leave reports
- Payroll list, salary structure, and payslips
- Employee, attendance, and payroll reports
- Company settings, users, and roles

## Tech Stack

### Frontend

- React 19
- TypeScript
- Vite
- Redux Toolkit
- React Router
- Ant Design
- MUI
- Tailwind CSS
- Axios

### Backend

- Node.js
- Express
- PostgreSQL
- `pg`
- JWT authentication
- WebSocket (`ws`)

## Prerequisites

- Node.js 20+ recommended
- npm
- PostgreSQL

## Installation

Install dependencies for each app:

```bash
cd hrms-fe
npm install

cd ../hrms-be
npm install
```

## Environment Variables

### Frontend

Create `hrms-fe/.env`:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

### Backend

Create `hrms-be/.env` with the database and auth settings used by the API:

```env
PORT=8080
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
JWT_SECRET=replace_with_a_secure_secret
JWT_EXPIRES_IN=1d
JWT_REFRESH_EXPIRES_IN=7d
NODE_ENV=development
```

Notes:

- The backend reads `.env` for normal development and `.env.demo` for the demo scripts.
- The frontend also supports `.env.demo` through `npm run demo`.

## Database Setup

The backend includes SQL assets under `hrms-be/src/db/`:

- `table/`: schema creation
- `migrations/`: follow-up schema changes
- `initData/`: seed and initial system data
- `functions/`: PostgreSQL functions used by the app

Publish the database objects with:

```bash
cd hrms-be
npm run db:publish
```

For demo environment configuration:

```bash
npm run demo-db:publish
```

## Running Locally

### Start the backend

```bash
cd hrms-be
npm run dev
```

The API runs on the `PORT` defined in `hrms-be/.env`.

### Start the frontend

```bash
cd hrms-fe
npm run dev
```

By default, the frontend expects the API at `http://localhost:8080/api`.

## Available Scripts

### Frontend

```bash
npm run dev
npm run demo
npm run build
npm run lint
npm run preview
```

### Backend

```bash
npm run dev
npm run demo
npm run start
npm run db:publish
npm run demo-db:publish
```

## API Overview

Backend routes are mounted under `/api` and include:

- `/api/user`
- `/api/common`
- `/api/root`
- `/api/employee`
- `/api/department`
- `/api/position`
- `/api/attendance`
- `/api/leave`
- `/api/payroll`
- `/api/setting`
- `/api/transaction`

## Notes

- The frontend currently contains the default Vite template README in `hrms-fe/README.md`. The root README is the main project entry point.
- Backend logs are written under `hrms-be/logs/`.
