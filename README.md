# **Pressie: Privacy-First Delivery Address System**

**Pressie** revolutionizes the way we handle delivery addresses by replacing traditional printed formats with a secure Pressie ID. It empowers users with full control over who sees their address, when, and to what extent—through **just-in-time**, **role-based**, and **segment-wise** access.

---

## **Table of Contents**

- [Overview](#overview)
- [Mission](#mission)
- [Tech Stack](#tech-stack)
- [Key Features](#key-features)
- [Security Architecture](#security-architecture)
- [Installation & Setup](#installation--setup)
- [Contributing](#contributing)
- [License](#license)

---

## **Overview**

In a world where personal data privacy is increasingly under threat, **Pressie** introduces a new standard for delivery systems. By transforming static addresses into dynamic, encrypted identifiers, we ensure **privacy**, **security**, and **granular control** over address visibility. Pressie breaks down an address into discrete segments (e.g., country, city, street, house) and grants access based on trust levels and delivery roles.

---

## **Mission**

- **Universal Pressie ID**: A globally unique, scannable ID that replaces printed addresses on parcels.
- **Address as Personal Data**: Treat addresses with the same care as other sensitive personal data—no more full addresses exposed on packaging.
- **Segmented Architecture**: Addresses are split into hierarchical segments (country → state → district → locality → street → house).
- **Role-Based Access**: Different delivery roles (e.g., courier, driver, customer support) get access only to the segments they need.
- **Time-Bound & Revocable Access**: Permissions are granted temporarily and can be revoked instantly via user or system policies.

---

## **Tech Stack**

### 🧠 Backend

- **NestJS (TypeScript)** — Modular, scalable, and testable backend framework.
- **Prisma ORM** — Type-safe database access with schema migration support.
- **PostgreSQL** — Relational database for structured and hierarchical address data.
- **HashiCorp Vault** — Enterprise-grade secret management; used for AES-256 encryption of address segments.
- **JWT & RBAC** — JSON Web Tokens and Role-Based Access Control for secure session and permission management.

### 💻 Frontend

- **Next.js (TypeScript)** — Hybrid static & server-rendered React framework for performance and SEO.
- **Chakra UI** — Elegant and accessible component library for building responsive UIs.
- **React QR Code Renderer** — For generating Pressie QR codes.

---

## **Key Features**

1. **Pressie ID:**

   - Each address is replaced by a unique Pressie ID, replacing the need to expose an actual address on packaging.
   - Pressie IDs are securely generated and expire after a specific window.

2. **Segmented Address Management:**

   - Addresses are stored in fine-grained segments (country, state, locality, etc.).
   - Each segment is encrypted individually, allowing selective decryption based on access level.

3. **Role-Based & Time-Bound Access:**

   - Delivery agents, carriers, and support staff receive only the information necessary to complete their task.
   - Access to each segment can be **revoked**, **logged**, and **audited**.

4. **Vault-Powered Encryption:**

   - AES-256 encryption with keys managed by **HashiCorp Vault**.
   - Decryption keys are never exposed to the application directly—zero trust design.

---

## **Security Architecture**

- **Segment-Wise AES-256 Encryption:** Each address component is independently encrypted with Vault-managed keys.
- **Zero Trust Backend:** Application services only request access tokens from Vault; they do not store or manipulate raw keys.
- **Role Tokenization:** Every role (e.g., driver, handler) is assigned a JWT with limited address scope.
- **Temporal Access Policies:** Vault leases are used to time-limit access to address segments.

---

## **Installation & Setup**

> This section will be expanded as development progresses.

---

## **Contributing**

We welcome high-quality contributions to enhance the scalability and security of Pressie. Please submit well-tested pull requests for bug fixes, features, or improvements. For major updates, open an issue to discuss proposed changes before submitting a pull request.

---

## **License**

This project is licensed under the [MIT License](LICENSE).
