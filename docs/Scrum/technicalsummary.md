# LU LOO LAND – FULL SYSTEM DOCUMENTATION
---
## 1. General Description
Lu Loo Land is a full-stack web platform designed for an amusement park management system.
It allows users to:
- View park information
- Explore games, restaurants, and events
- Purchase memberships
- Validate park access
- Send messages to administrators (future feature)
The system integrates frontend, backend, and relational database architecture.
---
## 2. System Objective
To develop a digital platform that centralizes amusement park operations, improving user experience and
administrative control through a scalable web system.
---
## 3. System Architecture
### Type
- Full Stack Web Application
- Client-Server Architecture
- REST API-based communication
### Frontend
- HTML
- CSS
- JavaScript (Fetch API)
### Backend
- Node.js
- Express.js
### Database
- MySQL / MariaDB
### Communication
- JSON over HTTP (REST)
---
## 4. DATABASE MODEL
### users
id | username | email | phone | password | role | created_at
### affiliation
id | name | price | duration | description | benefits | created_at
### subscription
id | start_date | finish_date | state | id_user | id_affiliation | used | used_at | created_at
### payments
id | amount | id_subscription | payment_date | created_at
### games
id | name | description | image | status | created_at
### restaurants
id | name | type | description | image
### events
id | name | start_date | end_date | description | image | created_at
### messages
id | user_id | message | timestamp | from_admin | response | status | answered_at
### park_info
id | park_name | location | description | open_time | close_time | open_days | phone | email | updated_at
---
## 5. RELATIONSHIPS
- users → subscription (1:N)
- affiliation → subscription (1:N)
- subscription → payments (1:N)
- users → messages (1:N)
---
## 6. SYSTEM REQUIREMENTS
### Functional Requirements
- User registration and login
- Park information display
- Games, restaurants, and events browsing
- Membership purchase system
- Payment registration
- Access validation system
- Messaging system (user ↔ admin)
- Admin dashboard
---
### Agile Requirements
- Scrum-based development
- Sprint-based delivery
- Prioritized backlog
- Continuous feedback loop
- Incremental deployment
---
### UI/UX Requirements
- Responsive design (mobile-first)
- Clean navigation system
- Card-based UI for content
- Fast interaction (no page reloads)
- Theme-based park aesthetic
---
### Non-Functional Requirements / Restrictions
- Password encryption using bcrypt
- No JWT authentication (current version)
- Relational database only
- No microservices architecture
- Moderate scalability (academic project)
---
## 7. PRODUCT BACKLOG
### EPICS
1. User Management
2. Membership System
3. Payments
4. Park Catalog
5. Events
6. Messaging System
7. Administration Panel
8. Access Validation
---
## 8. USER STORIES
### Story 1 – User Registration
As a user, I want to register so that I can access the system.
Priority: High
Story Points: 8
Given the user is on the registration form
When they enter valid username, email, phone, and password
Then the system creates a new user in the database
And confirms successful registration
---
### Story 2 – Login
As a user, I want to log in to access my account.
Priority: High
Story Points: 8
Given the user is on the login page
When they enter correct credentials
Then the system grants access to the dashboard
---
### Story 3 – Purchase Membership
As a user, I want to buy a membership.
Priority: High
Story Points: 13
Given the user selects a membership plan
When payment is confirmed
Then a subscription is created and activated
And a payment record is stored
---
### Story 4 – Park Access Validation
As a user, I want my ticket to be validated.
Priority: High
Story Points: 8
Given the user presents their membership
When the subscription is active and not expired
Then access is granted to the park
---
### Story 5 – Messaging System
As a user, I want to contact support.
Priority: Medium
Story Points: 5
Given the user is in the messaging section
When they send a message
Then it is stored with status "pending"
---
## 9. PRODUCT BACKLOG SUMMARY
- High priority: login, registration, membership, payments, access validation
- Medium priority: messaging, events, catalog
- Low priority: UI improvements
---
## 10. DEPENDENCIES
- users → subscription
- subscription → payments
- affiliation → subscription
- messages → users
---
## 11. DEVELOPMENT TEAM
- Frontend Developer
- Backend Developer
- Database Engineer
- UI/UX Designer
- QA Tester
---
# 12. SPRINTS
In this section of the documentation, we will find the sprints of the project development process using
the sprint documentation method.
---
## Sprint 0
| Sprint No. | Activity | Who will do it | Start time | End time |
|------------|----------|----------------|------------|----------|
| 0 | Planning | Everyone | 6:10 P.M. | 7:30 P.M. |
We started planning our project and discussing how we were going to work on it. We decided how we
would build and develop it, assigned roles, and established a vision. We also began working on aspects
such as the HTML diagram and other documentation-related tasks.
---
## Sprint 1
| Activity | Who | Start | End |
|----------|-----|-------|-----|
| Interface design and planning of login and main window | Fernanda and Dana | 3:10 P.M. | 4:00 P.M. |
| AI prompt development | Gabriel | 3:10 P.M. | 4:00 P.M. |
| Database preparation and adjustments | Mónica | 3:10 P.M. | 4:00 P.M. |
| Documentation | Samantha and Eliud | 3:30 P.M. | 4:00 P.M. |
We shared progress and completed the planned objectives. However, we agreed that we should improve
our working methods to achieve better agility.
---
## Sprint 2
| Activity | Who | Start | End |
|----------|-----|-------|-----|
| UI design and creation of login and main window | Fernanda and Dana | 10:05 A.M. | 3:00 P.M. |
| AI task management and modifications | Gabriel | 1:00 P.M. | 2:30 P.M. |
| Coding development | Mónica and Samantha | 10:05 A.M. | 3:00 P.M. |
| Research and text ideas | Eliud | 10:05 A.M. | 3:00 P.M. |
We began executing planned tasks, achieving important progress in interface and database preparation.
---
## Sprint 3
| Activity | Who | Start | End |
|----------|-----|-------|-----|
| Linking login and registration with database | Mónica and Samantha | 10:05 A.M. | 10:05 A.M. |
| Database troubleshooting with AI and research | Gabriel | 2:00 P.M. | 5:00 P.M. |
| UI design research | Samantha and Eliud | 10:05 A.M. | 10:05 A.M. |
| Image downloading for UI | Dana and Fernanda | 10:05 A.M. | 10:05 A.M. |
We achieved major progress but faced code disorganization issues, which were later resolved
successfully.
---
## Sprint 4
| Activity | Who | Start | End |
|----------|-----|-------|-----|
| Interface design | Fernanda and Samantha | 10:05 A.M. | --- |
| Bug fixing | Mónica | 4:00 P.M. | 6:00 P.M. |
| UI refinement (colors, spelling, etc.) | Gabriel | 4:00 P.M. | 5:00 P.M. |
| Product image search | Dana | 10:05 A.M. | 10:05 A.M. |
| Database testing | Eliud | 4:30 P.M. | 10:05 A.M. |
Progress was moderate due to fatigue, but interface improvements were made.
---
## Sprint 5
| Activity | Who | Start | End |
|----------|-----|-------|-----|
| Code refinement and function updates | Samantha and Mónica | 10:05 A.M. | 10:05 A.M. |
| Function idea research | Gabriel | 12:00 P.M. | 2:00 P.M. |
| Logo design | Fernanda | 10:05 A.M. | 10:05 A.M. |
| Risk analysis | Eliud | 10:05 A.M. | 10:05 A.M. |
| Database crash review | Dana | 10:05 A.M. | 10:05 A.M. |
MySQL issues caused delays and prevented full completion of objectives.
---
## Sprint 6
| Activity | Who | Start | End |
|----------|-----|-------|-----|
| Interface linking and function programming | Mónica and Samantha | 10:05 A.M. | 3:00 P.M. |
| Color palette selection | Gabriel | 1:00 P.M. | 3:00 P.M. |
| UI verification and final planning | Fernanda | 10:05 A.M. | 3:00 P.M. |
| Error review and corrections | Eliud and Dana | 10:05 A.M. | 3:00 P.M. |
We recovered progress after database issues and completed pending tasks successfully.
---
## 13. SCOPE & LIMITATIONS
### Scope
- Full web platform for amusement park
- Membership and payment system
- Dynamic catalog system
### Limitations
- No microservices
- No JWT authentication
- Basic chat system
- Limited scalability
---
## CONCLUSION
Lu Loo Land is a full-stack academic system that simulates a real-world amusement park management
platform using modern web technologies.
---
# DIAGRAMA ER (MERMAID)
```mermaid
erDiagram
USERS ||--o{ SUBSCRIPTION : tiene
AFFILIATION ||--o{ SUBSCRIPTION : define
SUBSCRIPTION ||--o{ PAYMENTS : genera
USERS ||--o{ MESSAGES : envía
USERS {
int id
string username
string email
string phone
string password
string role
datetime created_at
}
AFFILIATION {
int id
string name
decimal price
string duration
string description
string benefits
datetime created_at
}
SUBSCRIPTION {
int id
date start_date
date finish_date
string state
int id_user
int id_affiliation
boolean used
datetime used_at
datetime created_at
}
PAYMENTS {
int id
decimal amount
int id_subscription
datetime payment_date
datetime created_at
}
MESSAGES {
int id
int user_id
string message
datetime timestamp
boolean from_admin
string response
string status
datetime answered_at
}
GAMES {
int id
string name
string description
string image
string status
datetime created_at
}
RESTAURANTS {
int id
string name
string type
string description
string image
}
EVENTS {
int id
string name
date start_date
date end_date
string description
string image
datetime created_at
}
PARK_INFO {
int id
string park_name
string location
string description
string open_time
string close_time
string open_days
string phone
string email
datetime updated_at
}