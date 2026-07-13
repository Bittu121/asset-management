# Asset Management System

A full-stack IT asset management application built with Next.js 16 (App Router), MongoDB/Mongoose, and Redux. It lets an organization register assets, allocate them to employees, track asset movement with a gate-pass workflow, and view reports — with role-based access for Admin, Manager, Technician, and End User.

This document is written to match the actual code in this repository, so every feature described below is genuinely implemented. Planned hardening and cleanup work is listed separately in the **Roadmap** section at the end.

**Live demo:** _coming soon_

## Table of Contents

- [Highlights](#highlights)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Feature List](#feature-list)
- [Application Flow](#application-flow)
- [How the Schemas Are Connected](#how-the-schemas-are-connected)
- [Entity Relationship Overview](#entity-relationship-overview)
- [Schema Diagram](#schema-diagram)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Roadmap / Planned Improvements](#roadmap--planned-improvements)

---

## Highlights

- 🔐 **Auth done right** — JWT access + refresh tokens in httpOnly cookies, bcrypt password hashing, and OTP-based password reset over email.
- 🛡️ **Role-based access** — 4 roles (Admin, Manager, Technician, End User) enforced by middleware on every protected route, not just hidden in the UI.
- ⚙️ **Idempotent startup bootstrap** — auto-provisions the 4 roles and an admin account on first boot; safe to re-run and never destroys existing data.
- 🔒 **Data integrity at the database layer** — a partial unique index guarantees an asset can have only one _active_ allocation at a time, even under concurrent requests.
- 📦 **Real-world asset operations** — bulk Excel import/export, an auto-generated QR code per asset, and a full gate-pass approval workflow (Pending → Approved → Issued → Returned).
- 🧱 **Clean modular backend** — 17 feature modules, each split into schema / controller / service, exposed through a REST API (40+ routes).

---

## Screenshots

> _Screenshots and a demo GIF go here — add the images to `readme/images/` and uncomment the lines below._

<!--
![Dashboard](readme/images/screenshot-dashboard.png)
![Asset Allocation](readme/images/screenshot-allocation.png)
![Gate Pass Workflow](readme/images/screenshot-gatepass.png)
-->

---

## Tech Stack

- **Frontend:** Next.js 16 (App Router), React 19, Redux + Redux Thunk, Tailwind CSS
- **Backend:** Next.js API routes (Route Handlers) calling backend controllers/services
- **Database:** MongoDB with Mongoose
- **Auth:** JWT (access + refresh tokens) stored in httpOnly cookies, bcrypt password hashing
- **Other:** react-qr-code (QR generation), xlsx (bulk Excel import/export), react-pdf / pdfmake (printable documents)

---

## Feature List

### 0. First-Time Setup (Automatic)

- On first startup, the app auto-creates the 4 roles (Admin, Manager, Technician, User) and one Admin account.
- If an Admin already exists on restart, nothing is recreated and no data is deleted.
- The Admin email and password are configurable via environment variables.

### 1. Login and Security

- Log in using email and password.
- Passwords are stored securely in hashed (encrypted) form.
- Users stay logged in via a secure authentication token (httpOnly cookie).
- Reset a password using a One-Time Password (OTP) sent to email.
- Secure logout that clears the session.

### 2. Role

- Create and manage user roles.
- Assign permissions to each role.
- Assign a role to each user; only permitted roles can perform specific actions (role-based access).

### 3. User Account

- Create and manage user accounts for system access.
- Stores name, email, password, employee code, phone number, and job title.
- Assign a Role and an optional Reporting Manager.
- Stores the user's Department, Sub-Department, Location, and Sub-Location (as text).

### 4. Department

- A team in the company, like IT or Finance, with a name and short code.
- Independent — can be created first among the master data.

### 5. Sub-Department

- A smaller team inside a Department (e.g., "Network Support" inside "IT").
- Every Sub-Department belongs to one Department.

### 6. Location

- A physical place (office or branch) with a name, address, and city.

### 7. Sub-Location

- A smaller part inside a Location (e.g., one floor or room).
- Every Sub-Location belongs to one Location.

### 8. Vendor Management

- A vendor is the company that supplied an asset (e.g., the laptop supplier).
- Stores vendor contact details, GST number, and contract expiry date.

### 9. Asset Category

- Groups similar assets at the top level (e.g., Computers, Furniture, Printers).

### 10. Sub-Category

- Groups assets within a Category (e.g., "Laptops" under "Computers").

### 11. Asset Type

- Defines a specific asset (e.g., "Dell Laptop"). Optionally linked to a Sub-Category.

### 12. Support Group

- A small team of users (e.g., an "IT Helpdesk" group).
- Has one manager, a list of members, and a maximum ticket limit (default 10).

### 13. Asset Registry (Adding and Managing Assets)

- Manage assets like laptops, desktops, tablets, and other devices.
- Each asset has a unique Asset Tag and Serial Number.
- Stores technical (OS, processor, RAM), network (IP address, hostname), and purchase (cost, warranty, AMC) details.
- A unique QR code is generated for each asset — printable, downloadable, and scannable.
- Add assets one by one or import in bulk via Excel; export the full list to Excel.

### 14. Asset Allocation (Giving Assets to Employees)

- Allocate an asset to a user with an expected return date.
- Each allocation links one asset to one user.
- The same asset cannot be allocated to two users at once (enforced by the database).
- An Admin, Manager, or Technician can process a return and record the asset's condition.
- View full allocation history and track overdue allocations.
- Only an Admin can permanently delete an allocation.

### 15. Gate Pass Management (Moving Assets In and Out)

- Raise a gate pass request for a specific asset (with a unique Gate Pass ID).
- Status flow: Pending → Approved → Issued → Returned (or Rejected).
- Only an Admin or Manager can approve, reject, issue, or mark as returned.
- A Technician can only raise a request; an End User cannot raise one.
- Only an Admin can permanently delete a gate pass.

### 16. End User Self-Service View

- Shows only the logged-in user's own asset information.
- Displays assigned assets, returned assets, gate passes, and alerts.
- Read-only for End Users.

### 17. Reports and Dashboard

- **Dashboard:** total assets, allocated, available, total value, and overdue allocations.
- **Reports:** allocation history, asset returns, and gate pass records — filterable and exportable.
- **Audit trail:** records key actions (e.g., who allocated which asset, and when) — currently for allocation and gate-pass actions only.

---

## Application Flow

![Operational Flow Diagram](readme/images/asset_management_flow.png)

---

## How the Schemas Are Connected

This is a plain description of how each database collection relates to the others. "One-to-many" means one record in the first collection can be linked to many records in the second collection.

- **AssetCategory → SubCategory**: one category can have many sub-categories.
- **AssetCategory → AssetType**: one category can have many asset types.
- **SubCategory → AssetType**: one sub-category can have many asset types (optional link).
- **AssetCategory / SubCategory / AssetType → Asset**: every asset must belong to one category, and may optionally belong to a sub-category and asset type.
- **Vendor → Asset**: one vendor can supply many assets (optional link).
- **Department → SubDepartment**: one department can have many sub-departments.
- **Location → SubLocation**: one location can have many sub-locations.
- **Role → UserAccount**: one role can be assigned to many users.
- **UserAccount → UserAccount**: a user can have a "reporting manager", which is another user in the same collection (self-reference).
- **UserAccount → SupportGroup**: a user can be the manager of a support group, and a user can also be a member of many support groups at once (many-to-many, stored as a list of user IDs inside the support group).
- **Asset → Allocation**: one asset can have many allocation records over time, but only one of them can be "active" at any given moment (this is enforced by the database itself, not just the application code).
- **UserAccount → Allocation**: one user can hold many allocations (past and present).
- **Asset → GatePass**: one asset can have many gate pass records over time (there is no limit on how many are open at once).

A few fields look like they should be links but are actually stored as plain text, not as a real database relationship:
- A user's department, sub-department, location, and sub-location are stored as plain text on the user record, not linked to the actual Department/Location collections.
- The sub-department's department name, and the sub-location's location name, are stored as a text copy in addition to the real link.
- The "requested by" field on a gate pass stores the requester's email as text, not a link to the user account.

---

## Entity Relationship Overview

![Entity Relationship Diagram](readme/images/Asset_Management_ER_Diagram.png)

---

## Schema Diagram

![Database Schema Diagram](readme/images/Asset_Management_Schema_Diagram.png)

---

## Project Structure

```
src/
  app/
    (auth)/            Login, forgot-password, verify-otp, reset-password pages
    (main)/            Authenticated app: admin, assets, end-user, technician, profile
    api/               Next.js route handlers (thin layer calling backend controllers)
  backend/
    modules/           One folder per domain: schema.ts + controller.ts + service.ts
    middleware/        auth.ts, role.ts, validate.ts, error.ts
    config/            db.ts, env.ts, jwt.ts
    constants/         roles.ts, messages.ts
    models/            counter.ts (used to generate sequential gate pass IDs)
  store/               Redux slices: one folder per domain (actions, reducer, types)
```

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

You will need a `.env` file with at least: `MONGODB_URI`, `JWT_SECRET`, `JWT_REFRESH_SECRET` (and mail settings if you want the OTP/forgot-password email to actually send).

On first startup the app auto-bootstraps the 4 system roles (`ADMIN`, `MANAGER`, `TECHNICIAN`, `USER`) and a single Admin account (idempotent — skipped if an admin already exists). The admin then creates all other users from the app. Admin credentials can be overridden via `.env`: `ADMIN_NAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_EMPLOYEE_CODE` (defaults: `admin@assetmanagement.com` / `Admin@123`).

---

## Roadmap / Planned Improvements

The core flows (auth, asset registry, allocation, gate pass, reports) are fully working end to end. The items below are the next planned hardening/cleanup steps, listed here for transparency:

1. **Tighten role restriction on Location and Sub-Location endpoints.** These two endpoints currently allow any authenticated user to create/edit/delete records; the plan is to restrict them to Admin/Manager, matching every other admin master-data endpoint.
2. **Enforce permissions server-side, not just by role name.** Each Role already stores a granular `permissions` list (e.g. "Create Asset") and it's returned to the frontend at login; the next step is to check this list on the backend for finer-grained access control, instead of relying on the broader role name alone.
3. **Add a `/api/auth/refresh` endpoint.** A refresh token is already issued and stored in a cookie at login; wiring up a refresh route will let a session extend past the access token's expiry instead of requiring a fresh login.
4. **Formalize the `SUPERADMIN` role.** A couple of backend checks already anticipate a `SUPERADMIN` role for a level of access above Admin; the plan is to seed it properly and document it as a first-class role rather than something an Admin has to create manually.
5. **Link user location/department fields to the master-data collections.** These are currently stored as text on the user record; converting them to proper references will keep them automatically in sync if a department or location is renamed.
6. **Remove legacy scaffolding models (`AuthUser`, `GroupMember`, unused `roles` constants file)** that were superseded by `UserAccount` and the `SupportGroup.members` array during development.
