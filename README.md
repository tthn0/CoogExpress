<div align="center">
  <picture>
    <source
      width="50%"
      media="(prefers-color-scheme: light), (prefers-color-scheme: no-preference)"
      srcset="Images/Logos/logo-chromatic-black@3x.svg"
    />
    <source
      width="50%"
      media="(prefers-color-scheme: dark)"
      srcset="Images/Logos/logo-chromatic-white@3x.svg"
    />
    <img alt="Logo">
  </picture>
</div>

<hr/>

# Temporary Todo List

- **Thomas**:
  - Finish driver dashboard.
    - Whenever a route is picked up by a driver, mark all packages in the route as `Shipping`.
    - Update the driver employee ID in the database.
    - Update the start time of the route in the database.
    - Refactor
  - Separate triggers.
  - Finish manager dashboard.
  - Add proper input validation.
  - Finish tracking history.
  - Change customer dashboard UI to light mode.
  - Backup database on every commit.
  - Update README:
    - Include deploy instructions.
- **Others**:
  - Find todos on Discord.

# About

This project was created for our Database Systems course (COSC 3380) at the University of Houston. Our task was to create a database system and website for a fictional post office. CoogExpress is a delivery company that delivers packages to all locations in the continental United States. The company has multiple branches, each with its own set of employees. The company also has customers who can place orders to send packages between branches. The website is where customers can track their packages or purchase items, retail associates can place orders, drivers can accept shipment routes, and managers can track the activity at their respective branches.

# Screenshots

[Todo].

# Technologies

[Todo].

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

- Package status can be one of the following:
  - `Standby`: The order has been placed but not yet loaded onto a truck.
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
