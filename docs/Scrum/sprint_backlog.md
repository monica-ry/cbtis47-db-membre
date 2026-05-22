# LU LOO LAND — SOFTWARE REQUIREMENTS SPECIFICATION (SRS)

# 1. Introduction

## 1.1 Purpose
This document defines the functional and non-functional requirements of the **Lu Loo Land** web system, as well as the necessary characteristics for its development using Scrum methodology.

---

## 1.2 System Goal
The system aims to allow users to navigate through the platform, view attractions, restaurants, events, and park services, encouraging them to purchase memberships offered by Lu Loo Land.

---

# 2. Functional Requirements

## FR-01 — User Registration
The system must allow users to register by entering:
- Username
- Email
- Phone number
- Password

The information must be stored in the MySQL database.

---

## FR-02 — User Login
The system must allow users to log in using:
- Username or email
- Password

The password must be validated using bcrypt.

---

## FR-03 — Park Information Display
The system must display information related to:
- Attractions
- Games
- Restaurants
- Events
- General park information

---

## FR-04 — Membership System
Users must be able to:
- View memberships
- Purchase memberships
- Check membership benefits

---

## FR-05 — Payment System
The system must:
- Register payments
- Associate payments with memberships
- Confirm transactions

---

## FR-06 — Dashboard
The system must display a main page where users can navigate through the different system modules.

---

## FR-07 — Messaging System
Users must be able to send messages to administrators for support or contact purposes.

---

## FR-08 — Admin Panel
Administrators must be able to:
- Manage games
- Manage restaurants
- Manage events
- Manage promotions
- Manage messages

---

## FR-09 — Promotions System
The system must allow active promotions to be displayed within the platform.

---

## FR-10 — Notifications System
The system must display notifications related to:
- Memberships
- Payments
- Events
- Promotions

---

# 3. Non-Functional Requirements

## NFR-01 — Responsive Design
The platform must adapt correctly to:
- Computers
- Tablets
- Mobile devices

---

## NFR-02 — Security
Passwords must be stored using bcrypt encryption.

---

## NFR-03 — Performance
Navigation must be fast and minimize page reloads using Fetch API.

---

## NFR-04 — Compatibility
The system must work correctly in modern web browsers.

---

## NFR-05 — Architecture
The system will use:
- Node.js
- Express.js
- MySQL
- REST API

---

## NFR-06 — Technical Restrictions
The project:
- Does not currently use JWT authentication
- Does not use microservices
- Uses MySQL as the primary database

---

# 4. UI/UX Requirements

## UXR-01 — Modern Interface
The platform must provide a modern and visually attractive interface.

---

## UXR-02 — Clear Navigation
Navigation between sections must be simple and intuitive.

---

## UXR-03 — Card and Carousel-Based Design
Information must be displayed using:
- Cards
- Carousels
- Dynamic visual sections

---

# 5. Agile Requirements

## AR-01 — Scrum Methodology
The project will be developed using real Scrum methodology.

---

## AR-02 — Incremental Development
The system will be developed through multiple incremental sprints.

---

## AR-03 — Sprint Backlog
Each sprint must include:
- User stories
- Technical tasks
- Sprint goals

---

# 6. Current Project Status

| Module | Status |
|---|---|
| Registration | Functional |
| Login | Functional |
| Memberships | Functional |
| Restaurants | Functional |
| Games | Functional |
| Payments | Functional |
| UI/UX Design | Under Reconstruction |
| Carousels | Being Repaired |
| Messaging System | Pending |
| Admin Panel | Pending |
| Promotions | Pending |
| Notifications | Pending |

---

# 7. Technologies Used

- Node.js
- Express.js
- MySQL
- HTML5
- CSS3
- JavaScript
- Fetch API
- bcrypt

---

# 8. Conclusion

Lu Loo Land is a full-stack web project focused on improving user experience inside an amusement park through a modern, responsive, and scalable platform developed using Scrum methodology.
