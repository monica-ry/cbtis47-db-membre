# LU LOO LAND – SPRINT BACKLOG

# SPRINT 1 — DATABASE CREATION, CONNECTION, AND INITIAL DESIGN

## Time Allocation
Total Duration: 4 weeks

---

## User Stories

### US-LUL-01-01 — Secure User Registration

### US-LUL-01-02 — Secure Login

### US-LUL-06-03 — Basic User Dashboard

---

## Tasks

| ID | Task | Description | Estimation |
|---|---|---|---|
| T-01 | Create initial database | Create the primary MySQL database | 6 hours |
| T-02 | Create users table | Create table with username, email, phone number, password, and role | 5 hours |
| T-03 | Create sessions table | Store active session information | 4 hours |
| T-04 | Configure backend-database connection | Connect the web system with MySQL | 5 hours |
| T-05 | Configure project structure | Organize folders, routes, and main files | 4 hours |
| T-06 | Design home screen | Create the first welcome interface | 6 hours |
| T-07 | Design registration form | Create registration user interface | 5 hours |
| T-08 | Design login form | Create login user interface | 5 hours |
| T-09 | Validate required fields | Ensure no required field is empty | 4 hours |
| T-10 | Validate email addresses | Detect invalid or duplicate emails | 4 hours |
| T-11 | Implement bcrypt | Encrypt passwords before saving them | 5 hours |
| T-12 | Implement functional login | Validate credentials and allow access | 6 hours |
| T-13 | Create basic dashboard | Display the user's main menu | 6 hours |
| T-14 | Configure session management | Maintain active user sessions | 5 hours |
| T-15 | Perform initial testing | Test registration, login, and database connection | 6 hours |

---

## Activity Estimation Through Time

| Week | Activities |
|---|---|
| Week 1 | Database creation, tables, and connection |
| Week 2 | Initial interface design |
| Week 3 | Registration, login, and validations |
| Week 4 | Dashboard, sessions, and testing |

---

## Impediments and Dependencies
- Dependency on proper MySQL installation.
- Dependency on backend server configuration.
- Possible connection errors.
- Risk of validation issues.
- Dependency on correct bcrypt implementation.

---

## Definition of Done
- Database successfully created.
- System connected to MySQL.
- Functional and secure registration system.
- Functional login system.
- Password encryption implemented.
- Basic dashboard working.
- Validations implemented.
- Initial visual design completed.
- Initial tests completed without critical errors.

---

# SPRINT 2 — COMPLETE DATABASE, FINALIZE INITIAL DESIGN, AND START DOCUMENTATION

## Time Allocation
Total Duration: 4 weeks

---

## User Stories

### US-LUL-02-07 — Membership Purchase

### US-LUL-02-17 — Automatic Membership Code Generation

### US-LUL-03-08 — Secure Payment Processing

---

## Tasks

| ID | Task | Description | Estimation |
|---|---|---|---|
| T-16 | Create memberships table | Store membership types and prices | 5 hours |
| T-17 | Create purchases table | Store completed purchases | 5 hours |
| T-18 | Create payments table | Store transaction information | 5 hours |
| T-19 | Create codes table | Store unique access codes | 4 hours |
| T-20 | Design memberships catalog | Display available memberships | 6 hours |
| T-21 | Implement membership purchases | Allow users to select and purchase memberships | 8 hours |
| T-22 | Integrate payment gateway | Connect payment services with the platform | 10 hours |
| T-23 | Validate rejected payments | Detect invalid payment attempts | 5 hours |
| T-24 | Generate automatic codes | Create unique codes after payment approval | 7 hours |
| T-25 | Validate duplicate codes | Prevent duplicate access codes | 5 hours |
| T-26 | Display active memberships | Show user memberships in dashboard | 6 hours |
| T-27 | Finalize main design | Complete overall platform design | 8 hours |
| T-28 | Begin technical documentation | Document structure and system functions | 6 hours |
| T-29 | Perform functional testing | Test payments and memberships | 7 hours |

---

## Activity Estimation Through Time

| Week | Activities |
|---|---|
| Week 1 | Complete database structure and tables |
| Week 2 | Membership and purchase system |
| Week 3 | Payment integration and code generation |
| Week 4 | Final design completion and initial documentation |

---

## Impediments and Dependencies
- Dependency on payment gateway services.
- Dependency on stable internet connection.
- Risk of external payment failures.
- Possible issues with unique code generation.
- Dependency on successful Sprint 1 completion.

---

## Definition of Done
- Database structure completed.
- Membership system fully functional.
- Payments working correctly.
- Unique access codes automatically generated.
- Initial platform design completed.
- Dashboard updated.
- Initial technical documentation completed.
- Functional testing completed successfully.

---

# SPRINT 3 — FINAL REDESIGN, SYSTEM COMPLETION, AND DOCUMENTATION

## Time Allocation
Total Duration: 4 weeks

---

## User Stories

### US-LUL-07-20 — Access Code Validation

### US-LUL-09-16 — Messaging Between User and Administrator

### US-LUL-08-01 — Interface Redesign

### US-LUL-10-01 — Security Monitoring

---

## Tasks

| ID | Task | Description | Estimation |
|---|---|---|---|
| T-30 | Redesign main interface | Improve the visual appearance of the platform | 10 hours |
| T-31 | Improve responsive design | Adapt the system for mobile devices and tablets | 7 hours |
| T-32 | Implement access code validation | Verify active memberships | 8 hours |
| T-33 | Detect invalid codes | Block incorrect access attempts | 5 hours |
| T-34 | Detect suspicious attempts | Register multiple failed attempts | 6 hours |
| T-35 | Implement messaging system | Allow communication between users and administrators | 7 hours |
| T-36 | Validate empty messages | Prevent empty message submissions | 4 hours |
| T-37 | Implement security logs | Register suspicious activities | 6 hours |
| T-38 | Optimize performance | Reduce loading times | 6 hours |
| T-39 | Fix detected errors | Resolve identified bugs | 8 hours |
| T-40 | Complete technical documentation | Finalize all system documentation | 8 hours |
| T-41 | Perform final testing | Test the complete system | 10 hours |

---

## Activity Estimation Through Time

| Week | Activities |
|---|---|
| Week 1 | Visual redesign and responsive improvements |
| Week 2 | Access validation and security implementation |
| Week 3 | Messaging system, optimization, and bug fixing |
| Week 4 | Final documentation and complete testing |

---

## Impediments and Dependencies
- Dependency on previously completed functionalities.
- Risk of redesign-related issues.
- Possible performance problems.
- Dependency on complete technical documentation.
- Risk of errors detected during final testing.

---

## Definition of Done
- Fully functional system completed.
- Final redesign implemented.
- Responsive design functioning correctly.
- Access validation implemented.
- Messaging system functional.
- Security and monitoring active.
- Performance optimization completed.
- Final documentation completed.
- System tested without critical errors.
