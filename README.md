# Lu Loo Land 

![Build Status](https://img.shields.io/badge/build-active-success)
![Version](https://img.shields.io/badge/version-2.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

Lu Loo Land is a full-stack amusement park management platform designed to centralize memberships, park information, events, restaurants, and access validation into a modern web application.

---

# Table of Contents

- [Getting Started](#-getting-started)
- [Usage Examples](#-usage-examples)
- [Architecture & Tech Stack](#️-architecture--tech-stack)
- [Features](#-features)
- [Running Tests](#-running-tests)
- [Contributing](#-contributing)
- [Development Team](#-development-team)
- [License](#-license)

---

# Getting Started

Follow these instructions to set up the project locally for development and testing.

## Prerequisites

Before running the project, make sure you have installed:

- Git
- Node.js
- npm
- MySQL or MariaDB

---

## Installation

### Clone the repository

```bash
git clone https://github.com/monica-ry/cbtis47-db-membre.git
```

### Navigate to the project directory

```bash
cd cbtis47-db-membre
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env` file and configure your database credentials.

Example:

```env
PORT=4000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD= -
DB_NAME=membership_park
```

### Run the server

```bash
node server.js
```

---

# Usage Examples

Once the server is running, users can:

- Register and log into the system
- Browse games, restaurants, and events
- Purchase memberships
- Validate park access
- View park information

Example API request:

```javascript
fetch("http://localhost:4000/api/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    email: "user@example.com",
    password: "123456"
  })
});
```

---

# Architecture & Tech Stack

Lu Loo Land follows a Client-Server Architecture using REST API communication.

## Technologies Used

| Technology | Purpose |
|---|---|
| HTML | Frontend structure |
| CSS | Styling and responsive design |
| JavaScript | Frontend logic |
| Node.js | Backend runtime |
| Express.js | Server framework |
| MySQL / MariaDB | Relational database |

---

## Architecture

- Full Stack Web Application
- REST API communication
- JSON over HTTP
- Relational database system
- Responsive mobile-first interface

---

# Features

- User registration and login
- Membership purchase system
- Event catalog
- Restaurant catalog
- Park information display
- Access validation system
- Responsive user interface
- Administrative management structure

---

# Running Tests

Currently, automated tests are not implemented in this version of the project.

---

# Contributing

We welcome contributions to improve Lu Loo Land.

## Contribution Workflow

1. Fork the repository

2. Create a new branch

```bash
git checkout -b feature/AmazingFeature
```

3. Commit your changes

```bash
git commit -m "feat: add amazing feature"
```

4. Push the branch

```bash
git push origin feature/AmazingFeature
```

5. Open a Pull Request

---

# Development Team

| Role | Member |
|---|---|
| The Analyst & Designer (Architect) | Fernanda Velasco Parraguirre |
| The SQL Developer (Builder) | Mónica Ramírez Pérez |
| The Database Administrator (Guardian) | Danna Karen Suarez Gonzalez |
| The Query Master (Manipulator) | Samantha Galvez Castillo |
| The SQL Tester (QA / Breaker) | Eliud |
| Scrum Master | Gabriel Córdoba Pérez |

---

# License

Distributed under the MIT License.

See the `LICENSE` file for more information.
