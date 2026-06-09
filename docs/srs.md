# Software Requirements Specification (SRS)
# Lu Loo Land – Amusement Park Management Platform

---

## Table of Contents

1. [Introduction](#1-introduction)
   - 1.1 [Purpose](#11-purpose)
   - 1.2 [Scope](#12-scope)
   - 1.3 [Definitions, Acronyms, and Abbreviations](#13-definitions-acronyms-and-abbreviations)
   - 1.4 [References](#14-references)
   - 1.5 [Overview](#15-overview)
2. [Overall Description](#2-overall-description)
   - 2.1 [Product Perspective](#21-product-perspective)
   - 2.2 [Product Functions](#22-product-functions)
   - 2.3 [User Classes and Characteristics](#23-user-classes-and-characteristics)
   - 2.4 [Operating Environment](#24-operating-environment)
   - 2.5 [Design and Implementation Constraints](#25-design-and-implementation-constraints)
   - 2.6 [Assumptions and Dependencies](#26-assumptions-and-dependencies)
3. [System Features](#3-system-features)
   - 3.1 [User Registration and Authentication](#31-user-registration-and-authentication)
   - 3.2 [Membership Purchase System](#32-membership-purchase-system)
   - 3.3 [Payment Processing](#33-payment-processing)
   - 3.4 [Park Catalog](#34-park-catalog)
   - 3.5 [Event Management](#35-event-management)
   - 3.6 [Access Validation](#36-access-validation)
   - 3.7 [Messaging System](#37-messaging-system)
   - 3.8 [Dashboard System](#38-dashboard-system)
4. [External Interface Requirements](#4-external-interface-requirements)
   - 4.1 [User Interfaces](#41-user-interfaces)
   - 4.2 [Hardware Interfaces](#42-hardware-interfaces)
   - 4.3 [Software Interfaces](#43-software-interfaces)
   - 4.4 [Communication Interfaces](#44-communication-interfaces)
5. [Non-Functional Requirements](#5-non-functional-requirements)
   - 5.1 [Performance Requirements](#51-performance-requirements)
   - 5.2 [Security Requirements](#52-security-requirements)
   - 5.3 [Reliability Requirements](#53-reliability-requirements)
   - 5.4 [Usability Requirements](#54-usability-requirements)
   - 5.5 [Maintainability Requirements](#55-maintainability-requirements)
6. [Database Requirements](#6-database-requirements)
7. [Constraints and Limitations](#7-constraints-and-limitations)

---

## 1. Introduction

### 1.1 Purpose

This Software Requirements Specification (SRS) document describes the functional and non-functional requirements for **Lu Loo Land**, a full-stack web platform designed to manage and centralize operations for an amusement park. It is intended for the development team, stakeholders, and evaluators of the system.

This document follows the IEEE 830 standard for software requirements specifications and serves as a formal agreement between the development team and the project's expected behavior.

---

### 1.2 Scope

**Lu Loo Land** is a full-stack web application that allows users to:

- Register and log in to the platform securely.
- Browse park information, games, restaurants, and events.
- Purchase and manage memberships.
- Validate access to the park using a membership code.
- Send messages to administrators for support.

The system is aimed at both end users (park visitors) and administrators who need tools to manage the platform's content and user activity.

This project is developed as an academic software engineering exercise and is **not** intended for commercial deployment in its current version.

---

### 1.3 Definitions, Acronyms, and Abbreviations

| Term | Definition |
|------|------------|
| SRS | Software Requirements Specification |
| API | Application Programming Interface |
| REST | Representational State Transfer |
| HTTP | Hypertext Transfer Protocol |
| JSON | JavaScript Object Notation |
| UI | User Interface |
| UX | User Experience |
| DB | Database |
| CRUD | Create, Read, Update, Delete |
| bcrypt | Password hashing algorithm |
| JWT | JSON Web Token (not used in current version) |
| Membership | A purchased plan that grants access to the amusement park |
| Subscription | The active record linking a user to a purchased membership plan |
| Affiliation | The membership plan type (e.g., monthly, annual) |

---

### 1.4 References

| Document | Description |
|----------|-------------|
| README.md | Project setup, team, and architecture overview |
| erd_diagram.md | Entity-Relationship Diagram (Mermaid format) |
| dictionary.md | Database field definitions and constraints |
| product_backlog.md | Epics, user stories, and Gherkin scenarios |
| technicalsummary.md | Full system documentation and sprint history |

---

### 1.5 Overview

This document is organized into the following sections:

- **Section 2** provides a general description of the product, its users, and its environment.
- **Section 3** defines the system features and their functional requirements.
- **Section 4** describes all external interfaces.
- **Section 5** lists the non-functional requirements.
- **Section 6** covers the database structure requirements.
- **Section 7** outlines project constraints and limitations.

---

## 2. Overall Description

### 2.1 Product Perspective

Lu Loo Land is an independent, self-contained web application. It follows a **Client-Server Architecture** using **REST API** communication between the frontend and backend. It is not part of a larger system but is designed to be extensible for future integrations.

```
[ Browser / Client ]
        |
     HTTP/JSON
        |
[ Express.js Backend (Node.js) ]
        |
     SQL Queries
        |
[ MySQL / MariaDB Database ]
```

---

### 2.2 Product Functions

The main functions of the system are:

- **User management:** Registration, login, session handling, and role-based access.
- **Membership system:** Browsing plans, purchasing memberships, and tracking subscription status.
- **Payment processing:** Recording and validating payment transactions.
- **Park catalog:** Displaying information about games, restaurants, and general park details.
- **Event management:** Listing current and upcoming park events.
- **Access validation:** Validating membership codes for park entry.
- **Messaging system:** Communication channel between users and administrators.
- **Dashboard:** Personalized views for users and administrators.

---

### 2.3 User Classes and Characteristics

| User Class | Description | Technical Level |
|------------|-------------|-----------------|
| **Guest** | Unauthenticated visitor who can view public park information | Low |
| **Registered User** | Authenticated user who can purchase memberships and access the dashboard | Low to Medium |
| **Administrator** | Staff member with elevated privileges to manage content and respond to messages | Medium |

---

### 2.4 Operating Environment

| Component | Requirement |
|-----------|-------------|
| **Server OS** | Any OS supporting Node.js |
| **Runtime** | Node.js (latest LTS version) |
| **Database** | MySQL 8.x or MariaDB 10.x |
| **Client Browser** | Chrome, Firefox, Edge, Safari (modern versions) |
| **Network** | Standard HTTP/HTTPS connection |
| **Device Support** | Desktop and mobile browsers (responsive design) |

---

### 2.5 Design and Implementation Constraints

- The system must use **Node.js** and **Express.js** as the backend framework.
- The database must be **MySQL or MariaDB** (relational).
- Passwords must be encrypted using **bcrypt** before storage.
- **JWT authentication is not used** in the current version; sessions are handled server-side.
- The frontend must be built with plain **HTML, CSS, and JavaScript** (no frontend frameworks).
- No microservices architecture is implemented.
- The system is designed for **moderate scalability** (academic scope).
- All API communication must use **JSON over HTTP**.

---

### 2.6 Assumptions and Dependencies

- The server has Node.js and npm installed.
- A MySQL or MariaDB instance is accessible and properly configured.
- The `.env` file is correctly set up with valid database credentials.
- Users access the system via a modern web browser with JavaScript enabled.
- Internet connection is available for API communication.

---

## 3. System Features

### 3.1 User Registration and Authentication

#### Description
The system allows new users to create an account and existing users to log in securely.

#### Functional Requirements

| ID | Requirement |
|----|-------------|
| FR-01 | The system shall allow users to register with a unique email, username, phone, and password. |
| FR-02 | The system shall encrypt passwords using bcrypt before storing them in the database. |
| FR-03 | The system shall reject registration if the email is already in use. |
| FR-04 | The system shall validate that passwords meet minimum security requirements. |
| FR-05 | The system shall validate that all required registration fields are filled. |
| FR-06 | The system shall sanitize all user inputs to prevent SQL injection. |
| FR-07 | The system shall allow users to log in with their registered email and password. |
| FR-08 | The system shall create a secure session upon successful login. |
| FR-09 | The system shall deny login after 5 consecutive failed attempts and temporarily lock the account. |
| FR-10 | The system shall expire sessions automatically after a defined period of inactivity. |
| FR-11 | The system shall redirect unauthenticated users to the login page when accessing protected routes. |
| FR-12 | The system shall not reveal whether an account exists when login fails. |

---

### 3.2 Membership Purchase System

#### Description
Authenticated users can view available membership plans and purchase one, generating an active subscription.

#### Functional Requirements

| ID | Requirement |
|----|-------------|
| FR-13 | The system shall display all available membership plans (affiliations) with name, price, duration, and benefits. |
| FR-14 | The system shall allow authenticated users to select and purchase a membership plan. |
| FR-15 | The system shall create a subscription record upon successful payment. |
| FR-16 | The system shall not activate a membership if payment fails. |
| FR-17 | The system shall prevent duplicate subscription creation from repeated payment confirmations. |
| FR-18 | The system shall reject membership purchases if the session has expired. |
| FR-19 | The system shall validate the payment amount server-side to prevent price manipulation. |
| FR-20 | The system shall generate a unique access code upon membership activation. |

---

### 3.3 Payment Processing

#### Description
The system manages the recording and validation of payment transactions linked to subscriptions.

#### Functional Requirements

| ID | Requirement |
|----|-------------|
| FR-21 | The system shall process payments and store a payment record in the database. |
| FR-22 | The system shall mark a transaction as failed if the payment gateway is unavailable. |
| FR-23 | The system shall reject transactions with invalid card information. |
| FR-24 | The system shall allow users to cancel a payment before it is confirmed. |
| FR-25 | The system shall not expose internal payment errors to the user. |

---

### 3.4 Park Catalog

#### Description
The system displays information about the park, games, and restaurants to all users (authenticated or not).

#### Functional Requirements

| ID | Requirement |
|----|-------------|
| FR-26 | The system shall display general park information (name, location, hours, contact). |
| FR-27 | The system shall display a list of available games with name, description, image, and status. |
| FR-28 | The system shall display a list of restaurants with name, type, description, and image. |
| FR-29 | The system shall reflect real-time status of games (e.g., available, under maintenance). |

---

### 3.5 Event Management

#### Description
The system allows users to view current and upcoming park events.

#### Functional Requirements

| ID | Requirement |
|----|-------------|
| FR-30 | The system shall display a list of events with name, start date, end date, description, and image. |
| FR-31 | The system shall allow administrators to create, edit, and delete events. |
| FR-32 | The system shall display events sorted by start date. |

---

### 3.6 Access Validation

#### Description
The system validates membership access codes at park entry points to grant or deny access.

#### Functional Requirements

| ID | Requirement |
|----|-------------|
| FR-33 | The system shall validate access codes against active subscriptions in the database. |
| FR-34 | The system shall deny access if the code does not exist or is invalid. |
| FR-35 | The system shall deny access if the associated membership is expired or suspended. |
| FR-36 | The system shall detect and reject simultaneous use of the same access code. |
| FR-37 | The system shall log all access validation attempts. |
| FR-38 | The system shall temporarily block a device after exceeding the maximum number of invalid attempts. |

---

### 3.7 Messaging System

#### Description
Authenticated users can send messages to administrators, who can respond through the platform.

#### Functional Requirements

| ID | Requirement |
|----|-------------|
| FR-39 | The system shall allow authenticated users to send messages to administrators. |
| FR-40 | The system shall store each message with its content, timestamp, and status ("pending"). |
| FR-41 | The system shall reject empty messages and display a validation error. |
| FR-42 | The system shall notify the administrator when a new message is received. |
| FR-43 | The system shall allow administrators to respond to user messages. |
| FR-44 | The system shall detect and limit spam messaging behavior. |

---

### 3.8 Dashboard System

#### Description
The system provides personalized dashboards for both users and administrators.

#### Functional Requirements

| ID | Requirement |
|----|-------------|
| FR-45 | The system shall display the user's active memberships and subscription details on their dashboard. |
| FR-46 | The system shall display the user's generated access code on their dashboard. |
| FR-47 | The system shall continue displaying available modules even if a secondary service fails. |
| FR-48 | The system shall deny standard users access to the administrator dashboard. |
| FR-49 | The system shall provide administrators with a management panel to oversee users, memberships, and messages. |

---

## 4. External Interface Requirements

### 4.1 User Interfaces

- The UI must be responsive and function correctly on both desktop and mobile browsers.
- Navigation must be intuitive with a clear menu structure.
- Content must be displayed using a card-based layout.
- Forms must include real-time input validation and clear error messages.
- The design must follow a theme consistent with an amusement park aesthetic.

---

### 4.2 Hardware Interfaces

- No specialized hardware is required.
- The system runs on any standard server capable of executing Node.js.
- Client devices need only a modern browser and an internet connection.

---

### 4.3 Software Interfaces

| Interface | Description |
|-----------|-------------|
| **MySQL / MariaDB** | Relational database storing all system data |
| **Node.js** | Backend runtime environment |
| **Express.js** | HTTP server and routing framework |
| **bcrypt** | Password hashing library |
| **Fetch API** | Frontend-to-backend HTTP communication |

---

### 4.4 Communication Interfaces

- All communication between client and server uses **HTTP/HTTPS**.
- Data is exchanged in **JSON** format.
- The backend exposes a **RESTful API** at the configured port (default: `4000`).

---

## 5. Non-Functional Requirements

### 5.1 Performance Requirements

| ID | Requirement |
|----|-------------|
| NFR-01 | API responses for standard requests shall complete within 2 seconds under normal load. |
| NFR-02 | The system shall handle multiple simultaneous users without crashing. |
| NFR-03 | Pages shall load without full reloads using asynchronous data fetching. |

---

### 5.2 Security Requirements

| ID | Requirement |
|----|-------------|
| NFR-04 | All passwords must be encrypted using bcrypt before storage. |
| NFR-05 | All user inputs must be sanitized to prevent SQL injection attacks. |
| NFR-06 | The system must not expose sensitive server information in error messages. |
| NFR-07 | Suspicious activity (failed logins, invalid access attempts, injection attempts) must be logged internally. |
| NFR-08 | Session tokens must be invalidated upon logout or expiration. |
| NFR-09 | Role-based access control must be enforced on all protected routes. |
| NFR-10 | Payment amounts must be validated server-side to prevent client-side manipulation. |

---

### 5.3 Reliability Requirements

| ID | Requirement |
|----|-------------|
| NFR-11 | The system must handle database connection failures gracefully without crashing. |
| NFR-12 | Failed operations must return descriptive error messages without exposing internal details. |
| NFR-13 | The system must prevent duplicate records caused by repeated form submissions. |

---

### 5.4 Usability Requirements

| ID | Requirement |
|----|-------------|
| NFR-14 | The interface must be accessible and functional on screen widths from 375px (mobile) to 1920px (desktop). |
| NFR-15 | All error and validation messages must be clearly visible and understandable to non-technical users. |
| NFR-16 | The registration and login flows must be completable in under 3 minutes by a first-time user. |

---

### 5.5 Maintainability Requirements

| ID | Requirement |
|----|-------------|
| NFR-17 | Backend code must be organized into separate route and controller files. |
| NFR-18 | Environment variables must be stored in a `.env` file and not hardcoded. |
| NFR-19 | The database schema must be documented in the data dictionary. |

---

## 6. Database Requirements

The system uses a **MySQL / MariaDB** relational database named `membership_park`. The following tables are required:

| Table | Purpose |
|-------|---------|
| `users` | Stores registered user accounts and roles |
| `affiliation` | Defines available membership plan types |
| `subscription` | Records active and historical user subscriptions |
| `payments` | Stores payment transaction records |
| `games` | Catalog of available park games/attractions |
| `restaurants` | Catalog of park restaurants |
| `events` | Park events with dates and descriptions |
| `messages` | User-to-admin communication records |
| `park_info` | General park information (hours, contact, location) |

For detailed field definitions, data types, and constraints, refer to the [Data Dictionary](dictionary.md).

For entity relationships, refer to the [ER Diagram](erd_diagram.md).

---

## 7. Constraints and Limitations

| Constraint | Description |
|------------|-------------|
| **No JWT** | Session authentication does not use JSON Web Tokens in the current version. |
| **No microservices** | The system is a monolithic application. |
| **No automated tests** | Automated test coverage is not implemented in this version. |
| **No real payment gateway** | Payment processing is simulated; no real financial transactions are processed. |
| **Academic scalability** | The system is designed for academic use and is not optimized for large-scale production traffic. |
| **Plain frontend** | The frontend uses HTML, CSS, and vanilla JavaScript with no frontend framework. |
| **Basic chat** | The messaging system does not support real-time communication (no WebSockets). |

---

*Document prepared by the Lu Loo Land Development Team.*
*Version 2.0.0 — Lu Loo Land Amusement Park Management Platform*
