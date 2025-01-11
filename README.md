# SuperDM Task Server

A server repository for SuperDM task management system. This project is bootstrapped with Node.js, Express, TypeScript, and uses Drizzle as the ORM.

## Prerequisites

- Node.js
- Docker
- Make (for running convenience scripts)
- npm

## Tech Stack

- Node.js with Express
- TypeScript
- Drizzle ORM
- PostgreSQL
- Docker (for development database)

## Getting Started

### 1. Clone the Repository

```bash
git clone [repository-url]
cd superdm-server
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

1. Create a new `.env` file in the root directory
2. Copy the contents from `.env.local` into your newly created `.env` file

### 4. Database Setup

1. Start PostgreSQL using Docker:
```bash
make postgres
```
This will start a PostgreSQL instance with:
- Username: root
- Password: secret

2. Create the database:
```bash
make createdb
```
This command will create a new database named `superdm-db`

3. Run migrations:
```bash
make createmigration
```
This will create all the necessary database tables

4. Seed the database with demo data:
```bash
npm run seed
```
This will populate the database with initial demo data

### 5. Start the Development Server

```bash
npm run dev
```

Your server should now be running and ready to accept connections!