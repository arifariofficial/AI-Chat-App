# AI Chatbot Project Documentation

## Project Overview

This project is an AI-powered chatbot built using Next.js, TypeScript, PostgreSQL, Prisma, NextAuth, Docker, and Supabase vector-db. The app integrates with an AI SDK to generate responses, supports translation into three languages, and provides an interactive chat interface. The project is designed to be containerized using Docker for easy deployment and scaling.

### Tech Stack:

- **Frontend**: Next.js (App Router) + TypeScript
- **Backend**: NextAuth for authentication, Prisma ORM with PostgreSQL
- **AI Integration**: AI SDK (for chatbot capabilities), Supabase vector-db (for AI data storage)
- **Containerization**: Docker
- **Translations**: Supports three languages (English, Finnish, Swedish)

## Installation

### Prerequisites

- **Node.js** (version 14 or higher)
- **Docker** (for containerization)
- **PostgreSQL** (local or remote database setup)
- **Supabase account** (for vector-db setup)

### 1. Clone the Repository

```bash
git (https://gitlab.com/sipe3/sipe-frontend.git)
cd cd sipe-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables Setup

Get env.development

### 4. Database Setup

Set up the local database using the configuration from the `.env.development` file

Run Prisma migrations to set up the PostgreSQL database schema:

```bash
npx prisma migrate dev
```

### 5. Running Locally

```bash
npm run dev
```
