# Application Flow

In simple terms, here is how the application works from start to finish:

0. **First-time setup (automatic)** — The very first time the app starts, it creates the 4 roles (Admin, Manager, Technician, User) and a single Admin account by itself. The Admin logs in and creates everyone else. If the app is restarted later and an Admin already exists, nothing is created again and no data is deleted.

1. **Login** — A user opens the login page and enters their email and password. The server checks the password, and if it is correct, it creates two secure tokens (an access token and a refresh token) and stores them as httpOnly cookies in the browser. The browser is then redirected to a different home page depending on the user's role: Admin and Manager go to the Admin area, Technician goes to the Technician area, and everyone else goes to the End User area.

2. **Staying logged in** — While the user is using the app, the frontend checks every few minutes whether the session is still valid by calling a "who am I" endpoint. If the access token has expired or is missing, the user is sent back to the login page.

3. **Setting up master data** — Before assets can be added, an Admin sets up the basic building blocks: asset categories, sub-categories, asset types, vendors, departments, locations, and roles.

4. **Registering assets** — An Admin or Manager adds assets one by one, or uploads many at once using an Excel file. Each asset is linked to a category, and optionally to a sub-category, asset type, and vendor. A QR code is generated automatically for each asset.

5. **Allocating assets** — When an asset needs to be given to an employee, an Admin or Manager creates an allocation. The system checks that the asset is not already allocated to someone else before allowing this. When the employee returns the asset, the allocation is marked as returned, along with a note on the asset's condition.

6. **Moving assets in and out** — If an asset needs to physically leave or enter the premises (for repair, transfer, and so on), a gate pass is raised. A manager approves or rejects it, then it is marked as issued when the asset leaves, and returned when it comes back.

7. **Viewing reports** — At any time, users can check the dashboard for a quick overview, or open the reports section for detailed allocation history, gate pass logs, and audit trail entries.

8. **Logging out** — When the user logs out, the session cookies are cleared and the user is sent back to the login page.
