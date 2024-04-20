<div align="center">
  <picture>
    <source
      width="100%"
      media="(prefers-color-scheme: light), (prefers-color-scheme: no-preference)"
      srcset="Images/Logos/Light.svg"
    />
    <source
      width="100%"
      media="(prefers-color-scheme: dark)"
      srcset="Images/Logos/Dark.svg"
    />
    <img alt="Logo">
  </picture>
  <h1>
    CoogExpress
  </h1>
  <p>
    This project was created for our Database Systems course (COSC 3380) at the University of Houston. Our task was to create a database system and a full stack website for a fictional post office.
  </p>
</div>

# About

**Short miniworld description**: CoogExpress is a fictional delivery company that delivers packages to all locations in the continental United States. The company has multiple branches, each with its own set of employees. Customers can place orders to send packages between branches. The website is where customers can track their packages or purchase items; retail associates can place orders; drivers can accept shipment routes; and managers can restock inventory, manage employees, and view reports at their respective branches.

# Screenshots

[Todo].

# Project Requirements

### 5 Must Haves

- User authentication for different user roles.
- Data entry forms:
  - Add new data: [Todo].
  - Modify existing data: [Todo].
  - Delete data: [Todo].
- Triggers:
  1. [Todo].
  2. [Todo].
- Data queries:
  1. [Todo].
  2. [Todo].
  3. [Todo].
- Data reports:
  1. [Todo].
  2. [Todo].
  3. [Todo].

# Technologies

- **Frontend**: `React`, `SCSS`.
- **Backend**: `Node.js`.
- **Database**: `Azure Database for MySQL - Flexible Server`.
- **Deployment**: `Oracle Cloud Compute`.
- **Operating System**: `Ubuntu Linux`.
- **Authentication**: `JWT`, `JavaScript Cookie`.
- **Testing**: `Postman`.
- **Third-Party APIs**: `Imgur`.

# Features

[Todo].

# Hosting Locally

- Install [Git](https://git-scm.com) on your machine if you haven't already.
- Make sure [Node.js](https://nodejs.org/en/) version `20.11+` is installed on your machine. Some features may not work on older versions of.

### Cloning The Repository

```bash
git clone https://github.com/tthn0/CoogExpress
cd CoogExpress
```

> [!IMPORTANT]
> Ensure sure both `Source/client/example.env` and `Source/client/server.env` are renamed to `.env` and are properly configured before hosting locally.

### Starting The Client

```bash
cd Source/client # If not already in the client directory.
npm i -y         # Install dependencies.
npm start        # Start the client.
```

> [!NOTE]
> A new window will automatically open in your default browser on `http://localhost:3000`. All features of the website should be functional except for updating the profile picture. To remediate this, see more in the `Notes` section at the very end of this document.

### Starting The Server

```bash
cd Source/server # If not already in the server directory.
npm i -y         # Install dependencies.
npm start        # Start the server.
```

# Hosting On A Linux Server

[Todo].

# Notes

Also some low priority things that don't really need to be fixed but I'm just noting it so I won't:

- There are potential SQL injection vulnerabilities in `.Source/server/src/controllers/helper/process_cart.js`.
- There are potential race conditions in `./Source/server/src/controllers/entity/shopping_cart.js`.
  - This is because conditional logic is being performed on the server side instead of the database side.
  - This can be fixed by using transactions in the database.
- Updating profile pictures won't work when hosted on `localhost`.
  - This is because the client depends on the Imgur API which requires a domain to be whitelisted. Since the website is on `localhost`, the Imgur API will reject all requests. Therefore, the profile picture feature will not work locally.
  - This functionality will work when the website is deployed though.
  - A workaround is for testing profile picture functionality is to manually visit `http://0.0.0.0:3000` in the browser instead.
    - However, a new issue arises. Attemping to sign in to the locally hosted site on `http://0.0.0.0`, doesn't work in Chrome. The browser will block the request because it's considered a `CORS` violation.
    - To fix this, see [this StackOverflow post](https://stackoverflow.com/questions/66534759/cors-error-on-request-to-localhost-dev-server-from-remote-site).
    - In short, setting `chrome://flags/#block-insecure-private-network-requests` to `Disabled` will allow the request to go through.
- Passwords aren't actually hashed for development convenience.
- Email notifications for package deliveries reference `localhost:3000`.
  - This should be replaced with the domain name and port number of the actual website when it's hosted.
  - To change this, update the trigger in the `tracking_history` table.
- Inside `./Source/database/backup`, there is an SQL dump file.
  - When attempting to import this file, it will fail because the order of the views aren't properly exported.
  - To fix this, move the create statements for `package_view`, `branch_view`, `route_view`, and `receipt_view` down to the bottom, such that the last 4 views created are in that order.
- Some parts of the database are unused.
  - The `employee_schedule` table is unused.
  - The `preferred_branch_id` and `preferred_communication_method` columns in the `customer` table are unused.
- Employees shouldn't be able to buy products on their accounts. If they would like to purchase something, they should do so using a customer account.
- In the manager's dashboard, the date picker on the reports panel will make the `endDate`'s time exactly `00:00:00`. This may cause some confusion since it doesn't include the entire day (up to `23:59:59`).
- Billing information doesn't have a uniqueness constraint.
  - Multiple customers can have the same billing information.
  - A side effect of this is that a customer can have multiple billing entries that are identical (except for the billing information's ID).
  - To remediate this:
    - A uniqueness constraint should be added to the billing information table.
    - If a customer tries to add a billing information entry that already exists, the existing entry should be used instead.
- Whenever a manager deletes an employee, the employee isn't automatically signed out.
  - The employee's session still remains active until either their JWT expires or they log out.
- Package status can be one of the following:
  - `Standby`: The order has been placed, and a shipping label has been created, but it hasn't been loaded onto a truck yet.
    - A package may be in this state multiple times.
    - For example, if a package is transferred between branches, it would be marked as `Standby` again upon arriving at each branch.
  - `Pending`: The package has been loaded onto a truck but has not been accepted by a driver.
    - A package may be in this state multiple times.
    - For example, if the package is loaded onto a new truck, it would be marked as `Pending` again for each new truck.
  - `Shipping`: The package has been accepted by a driver and is on the move.
    - A package may be in this state multiple times.
    - The package may be dropped off at another branch and transferred onto another truck.
  - `Delivered`: The package has been delivered to the final destination.
    - A package may be in this state exactly once.
    - After a package is marked as `Delivered`, it cannot obtain a new status.
  - `Lost`: The package was lost during its transit.
    - A package may be in this state exactly once.
    - After a package is marked as `Lost`, it cannot obtain a new status.
