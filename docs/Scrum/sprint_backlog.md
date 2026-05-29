# LU LOO LAND – SPRINT BACKLOG

# SPRINT 1 – DATABASE CREATION, SYSTEM CONNECTION, AND INITIAL VISUAL DESIGN

## Time Allocation

**Duration:** 4 Weeks

### Sprint Goal

Build the initial infrastructure of the Lu Loo Land platform by configuring the development environment, creating the relational database, establishing communication between the backend and MySQL, implementing authentication modules, and developing the first visual prototype using a pastel color palette.

---

## User Stories

### US-LUL-01-01 — Secure User Registration

**As a** visitor,

**I want** to register using a username, email address, phone number, and password,

**so that** I can access the platform and manage future memberships.

### US-LUL-01-02 — Secure Login

**As a** registered user,

**I want** to log in using my username or email and password,

**so that** I can securely access my account information.

### US-LUL-06-03 — Initial User Dashboard

**As a** logged-in user,

**I want** to access a dashboard containing the system's main functionalities,

**so that** I can easily navigate through the platform.

---

# Tasks

| ID   | Task                                 | Detailed Description                                                                                                                               | Estimation |
| ---- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| T-01 | Development Environment Setup        | Installation and configuration of Node.js, npm, Visual Studio Code, Git, and project dependencies required for development.                        | 4 Hours    |
| T-02 | Backend Project Initialization       | Creation of the Node.js project, installation of Express.js, and organization of folders for routes, controllers, configuration files, and assets. | 5 Hours    |
| T-03 | MySQL Installation and Configuration | Installation of MySQL Server and phpMyAdmin, configuration of database users, permissions, and security settings.                                  | 4 Hours    |
| T-04 | Initial Database Modeling            | Analysis of system requirements and creation of the first Entity-Relationship model for users, subscriptions, payments, and related entities.      | 6 Hours    |
| T-05 | Lu Loo Land Database Creation        | Creation of the primary database and initial configuration for future tables and relationships.                                                    | 5 Hours    |
| T-06 | Users Table Development              | Creation of the users table including username, email, phone, encrypted password, role, and timestamps.                                            | 4 Hours    |
| T-07 | Node.js and MySQL Integration        | Installation of mysql2 and dotenv packages, configuration of environment variables, and testing communication between the backend and database.    | 6 Hours    |
| T-08 | Password Encryption Implementation   | Installation and implementation of bcrypt to securely encrypt user passwords before database storage.                                              | 3 Hours    |
| T-09 | Registration Module Development      | Development of registration forms, validation logic, duplicate account prevention, and secure user creation.                                       | 8 Hours    |
| T-10 | Login Module Development             | Development of authentication processes and credential validation against database records.                                                        | 6 Hours    |
| T-11 | Session Management Setup             | Creation and configuration of user session handling and protected route access.                                                                    | 5 Hours    |
| T-12 | Initial Visual Design                | Creation of the first visual proposal using pastel colors including soft pink, light blue, soft yellow, and white tones.                           | 8 Hours    |
| T-13 | Landing Page Design                  | Development of the welcome page containing navigation, login access, registration options, and park information.                                   | 5 Hours    |
| T-14 | Authentication Screen Design         | Creation of registration and login interfaces following the project's first visual style.                                                          | 5 Hours    |
| T-15 | Initial Dashboard Development        | Creation of a basic user dashboard to display available platform modules.                                                                          | 6 Hours    |
| T-16 | Functional Testing                   | Testing database communication, registration, login, sessions, and overall system stability.                                                       | 5 Hours    |

---

## Activity Estimation Through Time

### Week 1

* Installation of Node.js, npm, Visual Studio Code, and Git.
* Backend project initialization.
* MySQL and phpMyAdmin installation.
* Initial database design.
* Creation of the Lu Loo Land database.

### Week 2

* Creation of the users table.
* Configuration of database connection.
* Installation of mysql2 and dotenv.
* Implementation of bcrypt encryption.
* Registration module development.

### Week 3

* Login module implementation.
* Session management development.
* Credential validation.
* Authentication testing.

### Week 4

* Development of the first user interface.
* Application of the pastel color palette.
* Dashboard creation.
* Functional testing and bug fixing.

---

## Impediments and Dependencies

* Correct installation of Node.js and MySQL.
* Proper database credentials configuration.
* Stable development environment.
* Potential backend-database communication issues.
* Dependency on successful database modeling.

---

## Definition of Done

* [x] Node.js installed and configured.
* [x] Express.js configured successfully.
* [x] MySQL installed and operational.
* [x] Database created successfully.
* [x] Users table implemented.
* [x] Backend connected to MySQL.
* [x] Password encryption implemented with bcrypt.
* [x] User registration operational.
* [x] User login operational.
* [x] Session management functioning.
* [x] Initial user interface completed.
* [x] Dashboard available.
* [x] Functional tests completed.
* [x] Critical bugs resolved.

---

# SPRINT 2 – DATABASE COMPLETION, CORE FUNCTIONALITIES, AND INITIAL DOCUMENTATION

## Time Allocation

**Duration:** 4 Weeks

### Sprint Goal

Complete the database structure, implement membership management, payment registration, park catalog modules, dashboard functionality, and begin the project's technical documentation.

---

## User Stories

### US-LUL-02-07 — Membership Purchase

**As a** user,

**I want** to purchase memberships,

**so that** I can access park benefits and services.

### US-LUL-02-17 — Automatic Membership Code Generation

**As a** user,

**I want** to automatically receive a unique access code after purchasing a membership,

**so that** I can validate my access to the park.

### US-LUL-03-08 — Secure Payment Processing

**As a** user,

**I want** secure payment processing,

**so that** my membership purchases are completed safely.

---

# Tasks

| ID   | Task                               | Detailed Description                                                                        | Estimation |
| ---- | ---------------------------------- | ------------------------------------------------------------------------------------------- | ---------- |
| T-17 | Membership Database Design         | Creation of database structures for memberships, subscriptions, and payment records.        | 5 Hours    |
| T-18 | Affiliation Table Development      | Creation of membership plans including pricing, duration, benefits, and descriptions.       | 5 Hours    |
| T-19 | Subscription Table Development     | Creation of user subscription records including activation, expiration, and usage tracking. | 6 Hours    |
| T-20 | Payments Table Development         | Creation of payment records linked to user subscriptions.                                   | 5 Hours    |
| T-21 | Games Table Development            | Creation of park games catalog storage.                                                     | 4 Hours    |
| T-22 | Restaurants Table Development      | Creation of restaurant catalog storage.                                                     | 4 Hours    |
| T-23 | Events Table Development           | Creation of events management storage.                                                      | 4 Hours    |
| T-24 | Park Information Table Development | Creation of park information management structure.                                          | 4 Hours    |
| T-25 | Membership Catalog Interface       | Development of the membership catalog showing available plans and benefits.                 | 7 Hours    |
| T-26 | Membership Purchase System         | Development of membership purchasing functionality linked to subscriptions.                 | 8 Hours    |
| T-27 | Payment Registration Module        | Recording and storing payment information associated with memberships.                      | 7 Hours    |
| T-28 | Automatic Subscription Creation    | Automatic activation of subscriptions after successful payment confirmation.                | 6 Hours    |
| T-29 | Membership Validation Rules        | Implementation of expiration and status validation logic.                                   | 5 Hours    |
| T-30 | Dashboard Expansion                | Display of active memberships, purchase history, and subscription information.              | 6 Hours    |
| T-31 | Games Catalog Development          | Creation of interfaces for viewing available games.                                         | 5 Hours    |
| T-32 | Restaurant Catalog Development     | Creation of interfaces for viewing restaurants.                                             | 5 Hours    |
| T-33 | Events Catalog Development         | Creation of interfaces for viewing upcoming events.                                         | 5 Hours    |
| T-34 | Initial Technical Documentation    | Creation of ER diagrams, architecture documentation, and technical specifications.          | 8 Hours    |
| T-35 | Functional Testing                 | Testing memberships, payments, and dashboard modules.                                       | 7 Hours    |

---

## Activity Estimation Through Time

### Week 1

* Creation of affiliation, subscription, and payments tables.
* Completion of the database structure.
* Validation of relationships.

### Week 2

* Membership catalog development.
* Membership purchase functionality.
* Payment registration implementation.

### Week 3

* Subscription activation.
* Membership validation.
* Dashboard expansion.
* Development of games, restaurants, and events catalogs.

### Week 4

* Technical documentation creation.
* Architecture documentation.
* Functional testing.
* Bug corrections.

---

## Impediments and Dependencies

* Dependency on Sprint 1 completion.
* Database relationship integrity.
* Payment module stability.
* Potential data consistency issues.
* Dashboard integration dependencies.

---

## Definition of Done

* [ ] Database structure completed.
* [ ] Affiliation table implemented.
* [ ] Subscription table implemented.
* [ ] Payments table implemented.
* [ ] Membership catalog operational.
* [ ] Purchase functionality operational.
* [ ] Payment registration operational.
* [ ] Subscription activation operational.
* [ ] Dashboard expanded successfully.
* [ ] Games catalog available.
* [ ] Restaurants catalog available.
* [ ] Events catalog available.
* [ ] Initial documentation completed.
* [ ] Functional tests executed.
* [ ] Critical defects corrected.

---

# SPRINT 3 – FINAL REDESIGN, SYSTEM COMPLETION, AND FINAL DOCUMENTATION

## Time Allocation

**Duration:** 4 Weeks

### Sprint Goal

Redesign the platform with a modern visual identity, implement access validation and messaging systems, improve security monitoring, optimize performance, and complete all project documentation.

---

## User Stories

### US-LUL-07-20 — Access Code Validation

**As an** administrator,

**I want** to validate user memberships,

**so that** only authorized visitors can access the park.

### US-LUL-09-16 — Messaging Between User and Administrator

**As a** user,

**I want** to communicate with administrators,

**so that** I can request support and receive assistance.

### US-LUL-08-01 — User Interface Redesign

**As a** user,

**I want** a modern and visually attractive interface,

**so that** my experience feels more engaging and intuitive.

---

# Tasks

| ID   | Task                               | Detailed Description                                                                                                          | Estimation |
| ---- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ---------- |
| T-36 | Complete UI Redesign               | Replacement of the initial pastel theme with a dark-themed interface featuring stronger pink, purple, and neon-style accents. | 10 Hours   |
| T-37 | Animation Implementation           | Development of transitions, hover effects, loading animations, and interactive visual elements.                               | 7 Hours    |
| T-38 | Responsive Design Optimization     | Adaptation of the platform for mobile phones, tablets, and different screen resolutions.                                      | 6 Hours    |
| T-39 | Messages Table Development         | Creation of the messaging database structure.                                                                                 | 4 Hours    |
| T-40 | Messaging System Development       | Development of user-to-administrator communication functionality.                                                             | 8 Hours    |
| T-41 | Message Status Management          | Implementation of pending, answered, and closed message statuses.                                                             | 5 Hours    |
| T-42 | Access Validation System           | Development of membership validation and park access verification functionality.                                              | 8 Hours    |
| T-43 | Expired Membership Detection       | Automatic detection of expired memberships and access restrictions.                                                           | 5 Hours    |
| T-44 | Suspicious Activity Monitoring     | Logging invalid login attempts, access validation failures, and unusual activity.                                             | 6 Hours    |
| T-45 | Security Log Development           | Creation of internal records for security monitoring and auditing.                                                            | 5 Hours    |
| T-46 | Performance Optimization           | Improvement of database queries, page loading times, and frontend efficiency.                                                 | 6 Hours    |
| T-47 | Bug Resolution                     | Correction of issues detected during previous sprints.                                                                        | 8 Hours    |
| T-48 | User Manual Creation               | Development of documentation explaining platform usage.                                                                       | 6 Hours    |
| T-49 | Technical Documentation Completion | Finalization of architecture, database, and implementation documentation.                                                     | 8 Hours    |
| T-50 | Final System Testing               | End-to-end testing of all platform modules and features.                                                                      | 10 Hours   |

---

## Activity Estimation Through Time

### Week 1

* User interface redesign.
* Dark theme implementation.
* Neon color palette implementation.
* Animation development.

### Week 2

* Responsive optimization.
* Access validation system development.
* Membership expiration controls.
* Security monitoring implementation.

### Week 3

* Messaging system implementation.
* Status management.
* Security log creation.
* Performance optimization.

### Week 4

* Final documentation.
* User manual creation.
* Final testing.
* Bug fixing and project closure.

---

## Impediments and Dependencies

* Dependency on all previous sprint deliverables.
* Responsive design compatibility challenges.
* Potential performance bottlenecks.
* Security validation complexity.
* Documentation completion deadlines.

---

## Definition of Done

* [ ] Final redesign completed.
* [ ] Dark theme implemented.
* [ ] Animations functioning correctly.
* [ ] Responsive design operational.
* [ ] Messaging system operational.
* [ ] Access validation system operational.
* [ ] Expired membership detection functioning.
* [ ] Security monitoring active.
* [ ] Security logs implemented.
* [ ] Performance optimization completed.
* [ ] User manual completed.
* [ ] Technical documentation finalized.
* [ ] Final testing completed.
* [ ] Critical issues resolved.
* [ ] Project ready for delivery.
