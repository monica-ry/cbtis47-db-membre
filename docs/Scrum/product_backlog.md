# LU LOO LAND – PRODUCT BACKLOG

# 1. PRODUCT VISION

Lu Loo Land is a full-stack web platform developed for amusement park management.  
The system centralizes park services such as memberships, payments, games, events, restaurants, and administrative control through a scalable and responsive web application.

The platform is designed to improve user experience while providing administrators with efficient tools for managing park operations.

---

# 2. PRODUCT GOAL

Develop a modern and scalable web platform that allows users to manage their experience inside Lu Loo Land, including memberships, payments, events, and park access, while providing administrators with efficient operational management and system control tools.

---

# 3. SYSTEM ROLES

## User

### Permissions
- Register and log into the system
- View games, restaurants, and events
- Purchase memberships
- Make payments
- Access dashboard
- Validate park access
- Manage personal information

---

## Admin

### Permissions
- Manage games
- Manage restaurants
- Manage events
- Manage memberships
- Monitor payments
- Validate user access
- Access administration dashboard

---

## Super Admin (Future Version)

### Permissions
- Full system control
- Manage admins
- Access advanced analytics
- Configure system settings
- Monitor platform activity

---

# 4. TECHNOLOGY STACK

## Frontend
- HTML5
- CSS3
- JavaScript
- Fetch API

## Backend
- Node.js
- Express.js

## Database
- MySQL / MariaDB

## Security
- bcrypt password encryption

## Architecture
- REST API
- Client-Server Architecture
- Full Stack Web Application

---

# 5. EPICS

| ID | Epic | Description |
|---|---|---|
| EP-01 | User Management | User registration, login, and role management |
| EP-02 | Membership System | Membership purchase and administration |
| EP-03 | Payments | Payment registration and validation |
| EP-04 | Park Catalog | Games, restaurants, and park information |
| EP-05 | Events Management | Event visualization and management |
| EP-06 | Dashboard System | User and admin dashboards |
| EP-07 | Access Validation | Membership validation for park access |
| EP-08 | UI/UX Redesign | Complete redesign of the system interface |
| EP-09 | Messaging System | Communication between users and admins |

---

# 6. USER STORIES

---

# EP-01 — User Management

## US-01 — User Registration

### User Story
As a user, I want to register so that I can access the platform.

### Acceptance Criteria

#### Gherkin
```gherkin
Given the user is on the registration page
When the user enters valid information
And submits the registration form
Then the account should be created successfully
And the user data should be stored in MySQL
And the password should be encrypted using bcrypt
```

---

## US-02 — User Login

### User Story
As a user, I want to securely log in so that I can access my account.

### Acceptance Criteria

#### Gherkin
```gherkin
Given the user has a registered account
When the user enters a valid email and password
Then the system should validate the encrypted password
And redirect the user to the dashboard
```

---

# EP-02 — Membership System

## US-07 — Purchase Membership

### User Story
As a user, I want to purchase memberships so that I can access park services.

### Acceptance Criteria

#### Gherkin
```gherkin
Given the user is viewing available memberships
When the user selects a membership
And completes the payment
Then the membership should become active
And the subscription should be stored in the database
```

---

# EP-03 — Payments

## US-08 — Payment Registration

### User Story
As a user, I want to register payments so that my membership can be activated.

### Acceptance Criteria

#### Gherkin
```gherkin
Given the user has selected a membership
When the payment is processed successfully
Then the payment should be registered
And the membership status should change to active
```

---

# EP-04 — Park Catalog

## US-04 — Browse Games

### User Story
As a user, I want to browse games available in the park so that I can plan my visit.

### Acceptance Criteria

#### Gherkin
```gherkin
Given the user is on the games section
When the system loads available games
Then the games list should be displayed correctly
And each game should show its information
```

---

## US-05 — Browse Restaurants

### User Story
As a user, I want to browse restaurants so that I can see food options inside the park.

### Acceptance Criteria

#### Gherkin
```gherkin
Given the user enters the restaurants section
When the restaurants are loaded
Then the system should display restaurant information correctly
```

---

# EP-05 — Events Management

## US-06 — View Events

### User Story
As a user, I want to view upcoming events so that I can participate in park activities.

### Acceptance Criteria

#### Gherkin
```gherkin
Given the user accesses the events section
When events are available
Then the system should display upcoming events
And show their dates and descriptions
```

---

# EP-06 — Dashboard System

## US-03 — User Dashboard

### User Story
As a user, I want to view the dashboard after login so that I can quickly access platform features.

### Acceptance Criteria

#### Gherkin
```gherkin
Given the user has logged in successfully
When the dashboard loads
Then the system should display user information
And provide navigation to system modules
```

---

## US-15 — Admin Dashboard

### User Story
As an admin, I want an improved administration dashboard so that I can manage the system efficiently.

### Acceptance Criteria

#### Gherkin
```gherkin
Given the admin logs into the system
When the admin dashboard is opened
Then administrative modules should be accessible
And system statistics should be displayed
```

---

# EP-07 — Access Validation

## US-12 — Membership Validation

### User Story
As an admin, I want to validate memberships so that only valid users can access the park.

### Acceptance Criteria

#### Gherkin
```gherkin
Given the admin searches for a membership
When the membership is active and not expired
Then access should be approved
And the validation timestamp should be stored
```

---

# EP-08 — UI/UX Redesign

## US-14 — Modern Interface

### User Story
As a user, I want a redesigned modern interface so that the platform feels more attractive and easier to use.

### Acceptance Criteria

#### Gherkin
```gherkin
Given the user accesses the platform
When the new interface loads
Then the design should be responsive
And navigation should be intuitive
```

---

# EP-09 — Messaging System

## US-16 — Messaging System

### User Story
As a user, I want to contact administrators through messages so that I can receive support.

### Acceptance Criteria

#### Gherkin
```gherkin
Given the user opens the messaging section
When the user sends a message
Then the administrator should receive the message
And the conversation should be stored
```

---

# 7. DEPENDENCIES

| Module | Depends On |
|---|---|
| Subscription | Users, Authentication |
| Payments | Subscription |
| Dashboard | Login |
| Access Validation | Subscription |
| Messaging | Users |
| Admin Panel | Authentication |

---

# 8. RISKS

| Risk | Impact |
|---|---|
| MySQL connection failures | High |
| UI redesign delays | Medium |
| Backend route conflicts | Medium |
| Poor code organization | High |
| Responsive issues | Medium |

---

# 9. CURRENT PROJECT STATUS

| Module | Status |
|---|---|
| Login | Completed |
| Dashboard | Completed |
| Memberships | Completed |
| Payments | Completed |
| Events | Completed |
| Restaurants | Completed |
| Games | Completed |
| UI Redesign | In Progress |
| Messaging System | Planned |
| Super Admin | Future Version |

---

# 10. FUTURE IMPROVEMENTS

- Super Admin Panel
- Real-time messaging
- Notifications system
- Carousel animations
- Promotions section
- Better animations and UI effects

---

# 11. CONCLUSION

Lu Loo Land represents a scalable academic full-stack system that applies Scrum methodology, REST architecture, responsive design principles, and relational database management to simulate a real amusement park management platform.
