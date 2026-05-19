# LU LOO LAND – PRODUCT BACKLOG

## 1. PRODUCT VISION

Lu Loo Land is a full-stack web platform developed for amusement park management.  
The system centralizes park services such as memberships, payments, games, events, restaurants, and administrative control through a scalable and responsive web application.

The platform is designed to improve user experience while providing administrators with efficient tools for managing park operations.

---

# 2. SYSTEM ROLES

## User
Permissions:
- Register and log into the system
- View games, restaurants, and events
- Purchase memberships
- Make payments
- Access dashboard
- Validate park access
- Manage personal information

## Admin
Permissions:
- Manage games
- Manage restaurants
- Manage events
- Manage memberships
- Monitor payments
- Validate user access
- Access administration dashboard

## Super Admin (Future Version)
Permissions:
- Full system control
- Manage admins
- Access advanced analytics
- Configure system settings
- Monitor platform activity

---

# 3. TECHNOLOGY STACK

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

# 4. EPICS

| ID | Epic | Description |
|----|------|-------------|
| EP-01 | User Management | User registration, login, and role management |
| EP-02 | Membership System | Membership creation and administration |
| EP-03 | Payments | Payment registration and validation |
| EP-04 | Park Catalog | Games, restaurants, and park information |
| EP-05 | Events Management | Event visualization and management |
| EP-06 | Dashboard System | User and admin dashboards |
| EP-07 | Access Validation | Membership validation for park access |
| EP-08 | UI/UX Redesign | Complete redesign of system interface |
| EP-09 | Messaging System | Communication between users and admins |

---

# 5. PRODUCT BACKLOG

| ID | User Story | Priority | Story Points | Sprint | Status |
|----|------------|----------|--------------|---------|--------|
| US-01 | As a user, I want to register so I can access the platform | High | 8 | Sprint 1 | Completed |
| US-02 | As a user, I want to log in securely | High | 8 | Sprint 1 | Completed |
| US-03 | As a user, I want to view the dashboard after login | High | 5 | Sprint 2 | Completed |
| US-04 | As a user, I want to browse games available in the park | Medium | 5 | Sprint 2 | Completed |
| US-05 | As a user, I want to browse restaurants | Medium | 5 | Sprint 2 | Completed |
| US-06 | As a user, I want to view upcoming events | Medium | 5 | Sprint 3 | Completed |
| US-07 | As a user, I want to purchase memberships | High | 13 | Sprint 3 | Completed |
| US-08 | As a user, I want to register payments | High | 8 | Sprint 3 | Completed |
| US-09 | As an admin, I want to manage games | High | 8 | Sprint 4 | In Progress |
| US-10 | As an admin, I want to manage restaurants | Medium | 8 | Sprint 4 | In Progress |
| US-11 | As an admin, I want to manage events | Medium | 8 | Sprint 4 | In Progress |
| US-12 | As an admin, I want to validate memberships | High | 8 | Sprint 5 | In Progress |
| US-13 | As a user, I want responsive navigation on mobile devices | High | 5 | Sprint 5 | Planned |
| US-14 | As a user, I want a redesigned modern interface | High | 13 | Sprint 6 | Planned |
| US-15 | As an admin, I want an improved administration dashboard | Medium | 8 | Sprint 6 | Planned |
| US-16 | As a user, I want to contact administrators through messages | Medium | 5 | Sprint 7 | Planned |
| US-17 | As a super admin, I want to manage administrators | Low | 13 | Future | Future Version |

---

# 6. DETAILED USER STORIES

---

## US-01 — User Registration

### Description
As a user, I want to register so that I can access the platform.

### Priority
High

### Story Points
8

### Acceptance Criteria
- User can enter username, email, phone, and password
- Password must be encrypted using bcrypt
- Duplicate emails are not allowed
- User data must be stored in MySQL
- Registration confirmation message is displayed

### Technical Tasks
- Create registration interface
- Create POST `/register` endpoint
- Connect backend with MySQL
- Implement bcrypt encryption
- Validate empty fields
- Validate duplicate users

### Definition of Done
- Registration works correctly
- Data is stored successfully
- Password is encrypted
- No console errors
- UI is responsive

---

## US-02 — User Login

### Description
As a user, I want to securely log in to access my account.

### Priority
High

### Story Points
8

### Acceptance Criteria
- User can log in with email and password
- System validates encrypted password
- User is redirected to dashboard
- Invalid credentials show error message

### Technical Tasks
- Create login interface
- Create POST `/login` endpoint
- Implement bcrypt comparison
- Create session handling
- Redirect to dashboard

### Definition of Done
- Login works correctly
- Sessions persist correctly
- Invalid credentials are handled
- No critical bugs

---

## US-07 — Purchase Membership

### Description
As a user, I want to purchase a membership so I can access park services.

### Priority
High

### Story Points
13

### Acceptance Criteria
- User can select a membership
- Payment is registered
- Subscription is created automatically
- Membership status becomes active

### Technical Tasks
- Create membership catalog
- Create payment logic
- Insert subscription into database
- Connect payment and subscription tables
- Validate membership duration

### Definition of Done
- Membership purchase works
- Payment is recorded
- Subscription activates correctly
- Database relationships work properly

---

## US-12 — Access Validation

### Description
As an admin, I want to validate memberships before granting access.

### Priority
High

### Story Points
8

### Acceptance Criteria
- Admin can search memberships
- System verifies expiration date
- Used memberships cannot be reused
- Access status is updated

### Technical Tasks
- Create validation panel
- Create validation query
- Update used status
- Register validation timestamp

### Definition of Done
- Membership validation works
- Expired memberships are rejected
- Used memberships cannot be reused
- Validation updates database correctly

---

# 7. DEPENDENCIES

| Module | Depends On |
|--------|-------------|
| Subscription | Users, Affiliation |
| Payments | Subscription |
| Dashboard | Login |
| Access Validation | Subscription |
| Messaging | Users |
| Admin Panel | Authentication |

---

# 8. RISKS

| Risk | Impact |
|------|--------|
| MySQL connection failures | High |
| UI redesign delays | Medium |
| Backend route conflicts | Medium |
| Poor code organization | High |
| Responsive issues | Medium |

---

# 9. CURRENT PROJECT STATUS

| Module | Status |
|--------|--------|
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
- Add carousel animation
- Add a promotions section
- Add animation to the page

---

# 12. CONCLUSION

Lu Loo Land represents a scalable academic full-stack system that applies Scrum methodology, REST architecture, responsive design principles, and relational database management to simulate a real amusement park management platform.
