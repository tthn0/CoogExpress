# CoogExpress

[Write a little description about this project later].

### Run Client Locally

> [!IMPORTANT]
> Make sure `Source/client/example.env` is renamed to `.env` and is properly configured.

```bash
cd Source/client
npm i
npm start
```

### Run Server Locally

> [!IMPORTANT]
> Make sure `Source/server/example.env` is renamed to `.env` and is properly configured.

```bash
cd Source/server
npm i
npm start
```

### Temporary Todo List

- **Thomas**:
  - Customer dashboard UI.
    - Fix CSS leak.
    - Fetch real package data.
  - Backup database on every commit.
  - Test deployment.
    - Update environment variables.
- **Everyone**:
  - Brainstorm triggers.
  - Brainstorm business rules / semantic constraints.
    - Password format.
    - For a customer to ship a package, they must have a card on file.
