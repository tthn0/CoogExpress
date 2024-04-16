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

### Temporary Todo List

- **GIT COMMIT AMEND AND FORCE PUSH**.
- **Backup database on every commit**.
  - Move `package_view`, `branch_view`, `route_view` down.
- Trying to sign in while on `0.0.0.0` doesn't work in Chrome. Remediate this.
- Before presentation:
  - Merge `secondary` branch.
  - Test everything works.
  - Host on Oracle Cloud.
  - Test everything works again.
- Add Nikolas's triggers to GitHub.
- Reports:
  - https://jsreport.net.
- Update README:
  - Include deploy instructions.

### Email Template

Email both the sender and the receiver.

Subject: **Update on Your Package Delivery Status**

> Dear [User],
>
> We are writing to inform you of an update regarding the status of your package delivery. To obtain more detailed information about your package, visit the following link: http://XXX.XXX.XXX.XXX:####/package/1.
>
> Should you have any inquiries or require further assistance, please do not hesitate to contact us. Thank you for choosing our services.

# About

[Todo].

**Short miniworld description**: CoogExpress is a delivery company that delivers packages to all locations in the continental United States. The company has multiple branches, each with its own set of employees. Customers can place orders to send packages between branches. The website is where customers can track their packages or purchase items, retail associates can place orders, drivers can accept shipment routes, and managers can track the activity at their respective branches.

# Screenshots

[Todo].

# Project Requirements

[Todo].

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

- Install git on your machine if you haven't already.
- Make sure the latest version of [Node.js](https://nodejs.org/en/) installed on your machine. Some features may not work on older versions of Node.js.

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
> A new window will automatically open in your default browser on `http://localhost:3000`. All features of the website should be functional except for updating the profile picture. This is because the client depends on the Imgur API which requires a domain to be whitelisted. Since the website is hosted on `localhost`, the Imgur API will reject all requests. Therefore, the profile picture feature will not work locally. However, it will work when the website is deployed. A workaround is for testing profile picture functionality is to manually visit `http://0.0.0.0:3000` in the browser instead.

### Starting The Server

```bash
cd Source/server # If not already in the server directory.
npm i -y         # Install dependencies.
npm start        # Start the server.
```

# Hosting On A Linux Server

[Todo].

# Notes

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
