# Testing Credentials and Sample API Requests

This file is for local testing only (Postman, Thunder Client, curl, etc.). All required-field lists below come directly from each controller's `validateFields(...)` call — nothing is guessed.

The requests are ordered **dependency-wise**, the same order as the Feature List — each request only needs IDs from requests that come before it. Every `POST`/`PUT` needs the `accessToken` cookie from Login (step 2), so log in first and keep the same Postman tab/cookie jar for every request after that.

---

## 0. First-run bootstrap (automatic)

No seed endpoint — on app startup the 4 system roles (`ADMIN`, `MANAGER`, `TECHNICIAN`, `USER`) and a single Admin account are created automatically (idempotent; skipped if an admin already exists). Log in as the admin below and create Manager/Technician/User accounts from the app.

Admin credentials can be set in `.env` (`ADMIN_NAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_EMPLOYEE_CODE`); defaults shown below.

---

## 1. Login (required before every other step)

**Endpoint:** `POST http://localhost:3000/api/auth/login`

| Role | Email | Password |
|---|---|---|
| Admin | `admin@assetmanagement.com` | `Admin@123` |
| Manager | `manager@assetmanagement.com` | `Manager@123` |
| Technician | `tech@assetmanagement.com` | `Tech@123` |
| End User | `user@assetmanagement.com` | `User@123` |

```json
{
  "email": "admin@assetmanagement.com",
  "password": "Admin@123"
}
```

Response sets `accessToken`/`refreshToken` as httpOnly cookies (no tokens in the JSON body). Other auth endpoints:

| Method | Endpoint | Body |
|---|---|---|
| GET | `/api/auth/me` | — |
| POST | `/api/auth/logout` | `{}` |
| POST | `/api/auth/forgot-password` | `{"email": "admin@assetmanagement.com"}` |
| POST | `/api/auth/verify-otp` | `{"email": "admin@assetmanagement.com", "otp": "123456"}` |
| POST | `/api/auth/reset-password` | `{"email": "admin@assetmanagement.com", "password": "NewPass@123"}` |

---

## 2. Role (needed before creating a User Account)

**Endpoint:** `POST http://localhost:3000/api/admin/roles` &nbsp;·&nbsp; `GET /api/admin/roles` to list existing ones (the startup bootstrap already created 4)

```json
{
  "name": "MANAGER",
  "description": "Department manager with limited admin access",
  "permissions": ["Create Asset", "View Reports"]
}
```

---

## 3. User Account (needs a Role `_id` from step 2)

**Endpoint:** `POST http://localhost:3000/api/admin/user-account`

```json
{
  "name": "Test Employee",
  "email": "test.employee@assetmanagement.com",
  "password": "Test@123",
  "employeeCode": "EMP100",
  "role": "<paste a Role _id from step 2>"
}
```

---

## 4. Department

**Endpoint:** `POST http://localhost:3000/api/admin/department`

```json
{
  "departmentName": "Information Technology",
  "code": "IT"
}
```

---

## 5. Sub-Department (needs a Department `_id` from step 4)

**Endpoint:** `POST http://localhost:3000/api/admin/sub-department`

```json
{
  "subDepartmentName": "Network Support",
  "departmentId": "<paste a Department _id from step 4>",
  "departmentName": "Information Technology"
}
```

---

## 6. Location

**Endpoint:** `POST http://localhost:3000/api/admin/location`

```json
{
  "locationName": "Head Office",
  "address": "123 MG Road",
  "city": "Bengaluru"
}
```

---

## 7. Sub-Location (needs a Location `_id` from step 6)

**Endpoint:** `POST http://localhost:3000/api/admin/sub-location`

```json
{
  "subLocationName": "3rd Floor",
  "locationId": "<paste a Location _id from step 6>",
  "locationName": "Head Office"
}
```

---

## 8. Vendor

**Endpoint:** `POST http://localhost:3000/api/admin/vendor`

```json
{
  "vendorName": "Dell Technologies",
  "email": "sales@dell.com",
  "phone": "+911234567890",
  "gstNumber": "29ABCDE1234F1Z5",
  "contractExpiry": "2027-01-01"
}
```

---

## 9. Asset Category

**Endpoint:** `POST http://localhost:3000/api/admin/asset-categories`

```json
{
  "name": "Computers",
  "code": "COMP",
  "description": "All computing devices"
}
```

---

## 10. Sub-Category (needs an Asset Category `_id` from step 9)

**Endpoint:** `POST http://localhost:3000/api/admin/sub-categories`

```json
{
  "name": "Laptops",
  "category": "<paste an AssetCategory _id from step 9>"
}
```

---

## 11. Asset Type (needs an Asset Category `_id` from step 9; Sub-Category optional)

**Endpoint:** `POST http://localhost:3000/api/admin/asset-types`

```json
{
  "name": "Dell Laptop",
  "category": "<paste an AssetCategory _id from step 9>",
  "subCategory": "<paste a SubCategory _id from step 10 (optional)>"
}
```

---

## 12. Support Group (needs a User Account `_id` from step 3, as manager/member)

**Endpoint:** `POST http://localhost:3000/api/admin/support-groups`

```json
{
  "name": "IT Helpdesk",
  "code": "ITHD",
  "manager": "<paste a UserAccount _id from step 3>",
  "members": ["<paste a UserAccount _id from step 3>"],
  "maxTickets": 10
}
```

**Add a member** — `POST http://localhost:3000/api/admin/support-groups/<group _id>/members` (Admin/Manager only)
```json
{
  "userId": "<paste a UserAccount _id from step 3>"
}
```

**Remove a member** — `DELETE http://localhost:3000/api/admin/support-groups/<group _id>/members/<userId>` (Admin/Manager only). No request body needed.

---











## 13. Asset (needs an Asset Category `_id` from step 9; Sub-Category, Asset Type, Vendor optional)

**Endpoint:** `POST http://localhost:3000/api/assets`

```json
{
  "assetTag": "LAP-100",
  "serialNumber": "SN-100XYZ",
  "category": "<paste an AssetCategory _id from step 9>",
  "subCategory": "<paste a SubCategory _id from step 10 (optional)>",
  "assetType": "<paste an AssetType _id from step 11 (optional)>",
  "vendor": "<paste a Vendor _id from step 8 (optional)>",
  "manufacturer": "Dell",
  "model": "Latitude 5540",
  "os": "Windows 11",
  "ram": "16GB",
  "purchaseCost": "75000",
  "warrantyExpiry": "2027-01-15"
}
```

---

## 14. Asset Allocation (needs an Asset `_id` from step 13 and a User Account `_id` from step 3; Admin/Manager only)

**Create** — `POST http://localhost:3000/api/allocations`
```json
{
  "asset": "<paste an Asset _id from step 13>",
  "allocatedTo": "<paste a UserAccount _id from step 3>",
  "allocationDate": "2026-07-12",
  "expectedReturn": "2026-08-12"
}
```

**Return** — `PUT http://localhost:3000/api/allocations/<allocation _id>` (Admin/Manager/Technician)
```json
{
  "condition": "Good",
  "notes": "Returned in working condition"
}
```

---

## 15. Gate Pass (needs an Asset `_id` from step 13; Admin/Manager/Technician can create, Admin/Manager only can approve)

**Create** — `POST http://localhost:3000/api/gate-passes`
```json
{
  "asset": "<paste an Asset _id from step 13>",
  "type": "OUT",
  "purpose": "Sending for repair"
}
```

**Approve / Reject / Issue / Return** — `PUT http://localhost:3000/api/gate-passes/<gatepass _id>` (Admin/Manager only)
```json
{
  "status": "APPROVED"
}
```
Valid `status` values: `PENDING`, `APPROVED`, `ISSUED`, `RETURNED`, `REJECTED`.

---

## 16. Self-Service Views (read-only, needs steps 13/14/15 data to already exist)

| Method | Endpoint | Log in as | Returns |
|---|---|---|---|
| GET | `/api/end-user` | End User | that user's own assets, allocations, and gate passes |
| GET | `/api/technician` | Technician | technician operational view (assets, allocations, returns, overdue) |
| GET | `/api/profile` | Any logged-in user | the logged-in user's own profile details |

No request body needed for any of these — just log in as the matching role first and call the endpoint.

---

## 17. Reports and Dashboard (read-only, depends on everything above)

| Method | Endpoint |
|---|---|
| GET | `/api/dashboard` |
| GET | `/api/asset/reports` |

No request body needed for either.

---

**Note:** only the **Admin** account is created automatically on first startup (see section 0). The Manager / Technician / User rows in the login table are examples — those accounts must first be created via section 3 (or the app UI) before their logins will work. Do not reuse these demo passwords for any real/production account.
