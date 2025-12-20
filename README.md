# Kiosk – Frontend Developer Case Study

## Prerequisites

- Node.js v23.3+
- pnpm 10.0+
- Docker and Docker Compose

## Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Start the Database

```bash
docker-compose up
```

This will start a PostgreSQL database with the following credentials:

- **Host**: localhost:5438 (configurable via `POSTGRES_PORT` in `.env`)
- **Database**: csrd_db
- **User**: csrd
- **Password**: csrd_password

**Note**: If you already have a database running on port 5438, you can change the port by editing the `POSTGRES_PORT` variable in your `.env` file.

### 3. Run Migrations

```bash
pnpm migrate
```

### 4. Generate Prisma Client

```bash
pnpm prisma generate
```

### 5. Start Development Server

```bash
pnpm dev
```

The application will be available at `http://localhost:5173`.

## Next improvements
  - Services to get different lists: countries, employee types, contracts... and more detailed data.
  - More detailed CreateQuestionAnswerDTO.answer (especially for number inputs) from:
  ```json
  // Example with S1-6_05
  {
    "fra": "0",
  }
  ```
  To:
  ```json
  {
    "fra": {
      "type": "number",
      "unit": null,
      "value": 0,
    }
  }
  ```
  It could also be formatted properly when fetched depending on the use case.
  - More DDD approach for the table component and its context
  - Deletable rows for tables with variable rows
  - Internationalisation
  - Better toaster messages
