# Architecture Decisions

This file will contain all the decisions made during the project development.

## Server (backend of Pressie)

### 22-05-2025 - Using PRISMA ORM

- Decision: We are going to use Prisma ORM for PostgreSQL queries in Pressie backend
- Reason: Prisma will provide type safety for backend interactions

### 25-05-2025 - Using Passport with JWT Strategy

- Decision: We are going to use Passport with JWT Strategy for authentication process
- Reason: JWT allows stateless and scalable authentication
