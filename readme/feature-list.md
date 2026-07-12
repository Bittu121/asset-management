# Feature List

This section explains what the app can do, in simple words. Every feature listed here is already built and working in the code — nothing here is a future plan.

The features below are written in **dependency order** — meaning each feature is listed only after the features it depends on. For example, a User Account needs a Role to already exist, so Role is explained before User Account.

---

## 0. First-Time Setup (Automatic)

When the app starts for the very first time, it sets itself up automatically — no manual steps needed.

- It creates the 4 roles (**Admin, Manager, Technician, User**) and a single **Admin** account by itself.
- The Admin then logs in and creates all the other users (Manager, Technician, End Users) from inside the app.
- If the app is restarted later and an Admin already exists, nothing is created again — no existing data is ever deleted.
- The Admin's email and password can be set in the app's configuration (environment variables), so each company can use its own secure login.

## 1. Login and Security

- A user logs in with their email and password.
- The password is never saved as plain text. It is encrypted (this is called "hashing") before it is stored, so no one can read the real password, not even the developers.
- After a correct login, the app creates a secure token and saves it in the browser as a cookie. This token proves who the user is on every page they visit next, so they don't have to log in again and again.
- If a user forgets their password, they can ask for a one-time password (OTP). This OTP is sent to their email, and they can use it to set a new password.
- When a user clicks logout, the token is removed. The user must log in again to use the app after that.

## 2. Role (Who Is Allowed to Do What)

- A Role must exist before a User Account can be created, because every User Account needs one Role.
- A Role decides what a user is allowed to do in the app. The four roles are **Admin, Manager, Technician, and User (End User)**.
- Each Role has a list of permission names attached to it, like "Create Asset" or "View Reports."
- Every important action in the app checks the logged-in user's role first. For example, only an Admin or a Manager can assign an asset to an employee. A Technician can only view it.
- This whole idea is called "role-based access." It keeps the app safe by only letting the right people do the right actions.

## 3. User Account

- A User Account needs a Role to already exist, so it is explained right after Role.
- A User Account is one person's login in the app. It stores their name, email, encrypted password, employee code, phone number, and job title, along with which Role they have.
- A User Account can also have a "reporting manager," which is simply another user already in the system that this person reports to.
- **Note:** a user's department, sub-department, location, and sub-location are currently saved as plain text on their account. They are not directly connected to the actual Department and Location records described below.

## 4. Department

- A Department is a team in the company, like "IT" or "Finance." It has a name and a short code.
- A Department does not depend on anything else, so it can be created first among the location/department master data.

## 5. Sub-Department

- A Sub-Department needs a Department to already exist.
- A Sub-Department is a smaller team inside a Department, like "Network Support" inside "IT."
- Every Sub-Department must belong to one Department.

## 6. Location

- A Location is a physical place, like an office building or a branch office. It has a name, an address, and a city.
- Like Department, a Location does not depend on anything else.

## 7. Sub-Location

- A Sub-Location needs a Location to already exist.
- A Sub-Location is a smaller part inside a Location, like one floor or one room.
- Every Sub-Location must belong to one Location.

## 8. Vendor Management

- A "vendor" is the company that sold or supplied the asset (for example, the laptop supplier).
- The app keeps a list of vendors along with their contact details, GST number, and contract expiry date.
- A Vendor does not depend on anything else, but it is needed later when assets are added, so it is set up before the Asset Registry.

## 9. Asset Category

- Asset Category is the broadest way to group assets, for example "Computers" or "Furniture."
- This is the first and topmost level of the asset grouping, so it is created before Sub-Category and Asset Type.

## 10. Sub-Category

- A Sub-Category needs an Asset Category to already exist.
- Sub-Category sits inside a Category, for example "Laptops" inside "Computers."

## 11. Asset Type

- An Asset Type needs an Asset Category to already exist, and it can optionally use a Sub-Category too.
- Asset Type is the most specific level, for example "Dell Laptop" inside "Laptops."
- Linking an Asset Type to a Sub-Category is optional, not required.

## 12. Support Group

- A Support Group needs at least one User Account to already exist, since it needs a manager and members.
- A Support Group is a small team of users working together, for example, an "IT Helpdesk" group.
- Each group has one manager and a list of members, plus a maximum number of tickets it can handle at once.

## 13. Asset Registry (Adding and Managing Assets)

- An asset needs an Asset Category to already exist (this part is required). It can optionally use a Sub-Category, Asset Type, and Vendor if they have already been set up.
- An "asset" here means any item the company owns, such as a laptop, a desktop computer, or a tablet.
- Every asset gets its own tag number and serial number, so no two assets are ever mixed up.
- For each asset, the app stores technical details (like the operating system, processor, and RAM), network details (like the IP address and hostname), and money details (like purchase cost, warranty date, and AMC / maintenance contract date).
- Every asset automatically gets its own QR code. This code can be printed on a sticker or downloaded as an image. Anyone can scan it with a phone camera and instantly see the asset's details.
- Instead of adding assets one at a time, an Admin can upload one Excel file with many assets at once. The asset list can also be downloaded as an Excel file, which is useful for reports.

## 14. Asset Allocation (Giving Assets to Employees)

- An allocation needs both an Asset and a User Account to already exist, since it connects the two.
- When an employee needs an asset, an Admin or a Manager can allocate (assign) it to them, along with an expected return date.
- The app will never allow the same asset to be given to two people at the same time. This rule is checked by the database itself, so it cannot be broken by mistake, even if two people try to allocate the same asset at the exact same moment.
- When the employee is done using the asset, an Admin, Manager, or Technician can process the return and write a short note about the asset's condition (for example, "screen has a small scratch").
- Only an Admin can permanently delete an allocation record.
- The app keeps a full history of which employee used which asset, and when.
- There is also a report that shows assets that were not returned by their expected date (called "overdue allocations").

## 15. Gate Pass Management (Moving Assets In and Out)

- A gate pass needs an Asset to already exist, since every gate pass is raised for one specific asset.
- Sometimes an asset needs to physically leave the office, for example, to go for a repair.
- For this, an Admin, Manager, or Technician can raise a "gate pass" request. Think of it like a permission slip for moving the asset in or out. An End User cannot raise a gate pass request.
- Every gate pass moves through these steps, in order: **Pending → Approved → Issued → Returned**. A request can also be **Rejected** instead of approved.
- Only an Admin or a Manager is allowed to approve, reject, issue, or mark a gate pass as returned. A Technician can raise a request but cannot approve it.
- Only an Admin can permanently delete a gate pass record.
- Each gate pass automatically gets its own unique ID number.
- The gate pass can be printed and shown to the security staff at the gate.

## 16. End User Self-Service View

- This depends on a User Account, and on Assets/Allocations/Gate Passes already existing, since it only displays that data back to the person it belongs to.
- Every logged-in user, including an End User, can open a personal view that shows only their own information, never anyone else's.
- It shows: the assets currently assigned to them, their recently returned assets, the status of any gate passes they raised, and simple alerts (for example, an asset overdue for return, or a warranty expiring soon).
- This view is read-only for an End User. Approving, rejecting, creating a gate pass, or allocating/returning an asset still requires an Admin, Manager, or Technician.

## 17. Reports and Dashboard

- Reports and the Dashboard depend on everything above, since they simply collect and summarize data that already exists (assets, allocations, and gate passes).
- The Dashboard gives a quick summary at a glance: how many assets there are in total, how many are allocated, how many are available, and how many are under maintenance.
- Detailed reports are available for allocation history, asset returns, and gate pass records. These reports can be filtered and exported.
- There is also an audit trail, which is a record of important actions — for example, who allocated which asset, and when.
- **Please note:** the audit trail currently only records allocation and gate-pass actions. It does not yet record changes made to assets, vendors, or user accounts. This is mentioned here so the feature list stays fully accurate.

---

_See also: [Application Flow](03-application-flow.md) · [Role Permissions](role-permissions.md)_
