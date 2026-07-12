# Role Permissions — Asset Management System

Who can do what. Derived directly from the API route guards (`authorizeRoles(...)`) in `src/backend/modules/**/controller.ts` — this is the actual enforced access, not a description of intent.

> **Login:** On first startup only the **Admin** account is created automatically. The Admin creates Manager / Technician / User accounts from **Admin → Users**.

---

## Quick matrix

| Area | Admin | Manager | Technician | User |
|------|:-----:|:-------:|:----------:|:----:|
| Roles (create/edit/delete) | ✅ | 👁️ view | ❌ | ❌ |
| Users (create/edit) | ✅ | ✅ | ❌ | ❌ |
| Users (delete) | ✅ | ❌ | ❌ | ❌ |
| Master data* (create/edit) | ✅ | ✅ | ❌ | ❌ |
| Master data* (delete) | ✅ | ❌ | ❌ | ❌ |
| Assets (view) | ✅ | ✅ | ✅ | own only |
| Assets (create/edit) | ✅ | ✅ | ❌ | ❌ |
| Assets (delete) | ✅ | ❌ | ❌ | ❌ |
| Allocations (allocate) | ✅ | ✅ | ❌ | ❌ |
| Allocations (return) | ✅ | ✅ | ✅ | ❌ |
| Allocations (delete) | ✅ | ❌ | ❌ | ❌ |
| Gate Pass (create) | ✅ | ✅ | ✅ | request |
| Gate Pass (approve/reject/issue) | ✅ | ✅ | ❌ | ❌ |
| Gate Pass (delete) | ✅ | ❌ | ❌ | ❌ |
| Reports | ✅ | ✅ | ❌ | ❌ |
| Dashboard | ✅ | ✅ | ✅ (own) | ✅ (own) |

\* Master data = Support Groups, Locations, Sub-Locations, Departments, Sub-Departments, Categories, Sub-Categories, Types, Vendors.

> `superadmin` is treated as **Admin + Technician** combined.

---

## Per-role summary

### 🔴 Admin — full control
- All master data (Roles, Users, Support Groups, Locations, Departments, Categories, Sub-Categories, Types, Vendors): **create / edit / delete**
- Assets: create / edit / **delete**
- Allocations: allocate / return / delete
- Gate Pass: create / approve / reject / issue / delete
- Reports & Dashboard: full
- **Only Admin can delete** most records

### 🟠 Manager — like Admin, but no delete
- Master data: create / edit ✅ · delete ❌
- Users: create / edit ✅ · delete ❌
- Roles: **view only** (no create/edit/delete)
- Assets: create / edit ✅ · delete ❌
- Allocations: allocate / return ✅ · delete ❌
- Gate Pass: create / approve / reject / issue ✅ · delete ❌
- Reports & Dashboard: ✅

### 🟡 Technician — operations only
- Assets: **view only**
- Allocations: view + **return** (cannot allocate — Admin/Manager only)
- Gate Pass: **create** (cannot approve/reject)
- Returns / Overdue / Asset History: view
- No access to master data, users, or reports

### 🟢 User (End User) — own workspace
- View own allocated assets
- Raise requests
- View own gate passes
- No management/admin access
