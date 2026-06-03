# LU LOO LAND – SPRINT 1

## Database Creation, System Connection, and Initial Visual Design

### Duration
**4 Weeks**

### Total Estimated Hours
**85 Hours**

---

# User Story US-LUL-01-01

## Secure User Registration

**As a visitor,**

I want to register using a username, email address, phone number, and password,

So that I can access the platform and manage future memberships.

### Related Tasks

| ID | Task | Responsible | Description | Hours |
|------|------|------|------|------:|
| T-01 | Development Environment Setup | Ramírez Pérez Mónica (SQL Developer) | Install Node.js, npm, Git, VS Code, and project dependencies. | 4 |
| T-02 | Backend Project Initialization | Ramírez Pérez Mónica (SQL Developer) | Configure Express.js and the initial backend structure. | 5 |
| T-03 | MySQL Installation and Configuration | Suarez Gonzalez Danna Karen (Database Administrator) | Install and configure MySQL Server and phpMyAdmin. | 4 |
| T-04 | Initial Database Modeling | Velasco Parraguirre Marías Fernanda (Analyst & Designer) | Create the ERD and database structure proposal. | 6 |
| T-05 | Lu Loo Land Database Creation | Ramírez Pérez Mónica (SQL Developer) | Create the database schema. | 5 |
| T-06 | Users Table Development | Ramírez Pérez Mónica (SQL Developer) | Create the users table with constraints and relationships. | 4 |
| T-07 | Node.js and MySQL Integration | Ramírez Pérez Mónica (SQL Developer) | Configure backend communication with the database. | 6 |
| T-08 | Password Encryption Implementation | Martinez Gaytan Francisco Eliud (SQL Tester) | Validate and test bcrypt password encryption. | 3 |
| T-09 | Registration Module Development | Galvez Castillo Samantha (Query Master) | Create registration forms, validations, and data insertion processes. | 8 |

### Total
**45 Hours**

### Acceptance Criteria

- User can register successfully.
- Duplicate email addresses are not allowed.
- Passwords are encrypted using bcrypt.
- Required fields are validated.
- User information is stored correctly.
- Success and error messages are displayed appropriately.

---

# User Story US-LUL-01-02

## Secure Login

**As a registered user,**

I want to log in using my username or email and password,

So that I can securely access my account information.

### Related Tasks

| ID | Task | Responsible | Description | Hours |
|------|------|------|------|------:|
| T-10 | Login Module Development | Galvez Castillo Samantha (Query Master) | Implement authentication and credential validation. | 6 |
| T-11 | Session Management Setup | Ramírez Pérez Mónica (SQL Developer) | Configure user sessions and protected routes. | 5 |
| T-16 | Functional Testing | Martinez Gaytan Francisco Eliud (SQL Tester) | Validate authentication processes and login security. | 5 |

### Total
**16 Hours**

### Acceptance Criteria

- User can log in using username or email.
- Password validation works correctly.
- A valid session is created.
- Protected routes require authentication.
- Invalid credentials display appropriate error messages.

---

# User Story US-LUL-06-03

## Initial User Dashboard

**As a logged-in user,**

I want to access a dashboard containing the system’s main functionalities,

So that I can easily navigate through the platform.

### Related Tasks

| ID | Task | Responsible | Description | Hours |
|------|------|------|------|------:|
| T-12 | Initial Visual Design | Velasco Parraguirre Marías Fernanda (Analyst & Designer) | Create the first visual proposal and UI guidelines. | 8 |
| T-13 | Landing Page Design | Velasco Parraguirre Marías Fernanda (Analyst & Designer) | Design the landing page structure and navigation flow. | 5 |
| T-14 | Authentication Screen Design | Velasco Parraguirre Marías Fernanda (Analyst & Designer) | Design login and registration interfaces. | 5 |
| T-15 | Initial Dashboard Development | Galvez Castillo Samantha (Query Master) | Develop the dashboard interface and navigation menu. | 6 |

### Total
**24 Hours**

### Acceptance Criteria

- Dashboard is displayed after login.
- Navigation menu functions correctly.
- Design follows the established visual identity.
- Interface is intuitive and user-friendly.
- No visual or functional errors are present.

---

# Weekly Planning

| Week | Activities Completed | Hours |
|--------|--------|------:|
| Week 1 | T-01 Development Environment Setup, T-02 Backend Project Initialization, T-03 MySQL Installation and Configuration, T-04 Initial Database Modeling, T-05 Database Creation | 24 |
| Week 2 | T-06 Users Table Development, T-07 Node.js and MySQL Integration, T-08 Password Encryption Implementation, T-09 Registration Module Development | 21 |
| Week 3 | T-10 Login Module Development, T-11 Session Management Setup, T-16 Functional Testing | 16 |
| Week 4 | T-12 Initial Visual Design, T-13 Landing Page Design, T-14 Authentication Screen Design, T-15 Initial Dashboard Development | 24 |

### Sprint Total
**85 Hours**

---

# Definition of Done

* [x] Node.js configured.
* [x] Express.js configured successfully.
* [x] MySQL operational.
* [x] Database created.
* [x] Users table implemented.
* [x] Backend connected to MySQL.
* [x] Password encryption implemented.
* [x] User registration operational.
* [x] User login operational.
* [x] Session management functioning.
* [x] Initial user interface completed.
* [x] Dashboard available.
* [x] Functional tests completed.
* [x] Critical bugs resolved.
