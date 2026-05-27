# LU LOO LAND – PRODUCT BACKLOG

## 1. PRODUCT OBJECTIVE

Develop a modern, secure, and scalable web platform for Lu Loo Land that allows users to manage their experience inside the park, including memberships, payments, events, and access validation, while also providing administrators with efficient control tools.

The system must handle both successful and failed scenarios, ensuring strong security, strict data validation, authentication protection, and safe error handling for situations such as invalid inputs, failed payments, expired memberships, duplicate requests, and unauthorized access attempts.

---

# 2. EPICS

| ID | Epic | Description |
|----|------|-------------|
| EP-01 | User Management | Secure registration, authentication, and account management. |
| EP-02 | Membership System | Membership purchases, expiration, and code generation. |
| EP-03 | Payment Processing | Secure and resilient payment management. |
| EP-04 | Park Catalog | Information about rides, restaurants, and parks. |
| EP-05 | Event Management | Event listing and event management. |
| EP-06 | Dashboard System | User and administrator dashboards. |
| EP-07 | Access Validation | Membership and access code validation. |
| EP-08 | UI/UX Redesign | Modern and responsive user interface. |
| EP-09 | Messaging System | User-administrator communication. |
| EP-10 | Security and Monitoring | Security logs, suspicious activity detection, and monitoring. |

---

# 3. USER STORIES AND SCENARIOS

# EP-01 — User Management

## US-01 — Secure User Registration

### Scenario: Successful user registration

```gherkin
Given the user is on the registration page
And the email address does not exist in the system
And the password meets all security requirements
When the user submits the registration form
Then the system must create the user account
And the password must be encrypted using bcrypt
And the user information must be stored in the database
And the user must be redirected to the login page
```

### Scenario: Registration fails because the email already exists

```gherkin
Given an account already exists with the email "user@email.com"
When the user attempts to register using the same email
Then the system must reject the registration
And the system must display the message "Email already registered"
And no new account must be created
```

### Scenario: Registration fails because the password is weak

```gherkin
Given the user is on the registration page
When the user submits the password "123456"
Then the system must reject the registration
And the system must display the password security requirements
And no account must be stored in the database
```

### Scenario: Registration fails because required fields are empty

```gherkin
Given the user is on the registration page
When the user submits the form with empty required fields
Then the system must reject the request
And validation messages must be displayed
And no account must be created
```

### Scenario: Registration fails due to a database failure

```gherkin
Given the registration service is available
And the database connection becomes unavailable
When the user submits a valid registration form
Then the system must not create the account
And the system must return a generic error message
And the system must not expose internal server information
And the error must be logged internally
```

### Scenario: Registration fails because the email format is invalid

```gherkin
Given the user is on the registration page
When the user submits the email "user@email"
Then the system must reject the registration
And the system must display the message "Invalid email format"
And no account must be created
```

### Scenario: Registration fails because the password lacks numbers or special characters

```gherkin
Given the user is on the registration page
When the user submits a password without numbers or special characters
Then the system must reject the registration
And the system must display the password requirements
```

### Scenario: Registration rejects an SQL injection attempt

```gherkin
Given the user is on the registration page
When the user submits malicious SQL code in the form fields
Then the system must sanitize the input
And the system must reject the request
And the attempt must be logged as suspicious activity
And the database integrity must remain unchanged
```

### Scenario: Registration prevents duplicate form submissions

```gherkin
Given the user completed the registration form correctly
When the user submits the form multiple times
Then the system must process only one request
And only one account must be created
And duplicate requests must be ignored
```

---

## US-02 — Secure Login

### Scenario: Successful login

```gherkin
Given an active account exists
And the provided password is correct
When the user submits the login form
Then the system must authenticate the user
And the system must create a secure session
And the user must be redirected to the dashboard
```

### Scenario: Login fails because the password is incorrect

```gherkin
Given an account exists
When the user submits an incorrect password
Then the system must deny access
And the system must display the message "Invalid credentials"
And the failed attempt must be logged
```

### Scenario: Login fails because the account is suspended

```gherkin
Given the user account is suspended
When the user attempts to log in
Then the system must deny access
And the system must display the message "Account suspended"
And no session must be created
```

### Scenario: Account is temporarily locked after multiple failed attempts

```gherkin
Given five consecutive failed login attempts were detected
When the user attempts to log in again
Then the system must temporarily lock the account
And the system must deny authentication
And the suspicious activity must be logged
```

### Scenario: Login fails because the user does not exist

```gherkin
Given no account exists with the provided email
When the user attempts to log in
Then the system must deny access
And the system must display the message "Invalid credentials"
And the system must not reveal whether the account exists
```

### Scenario: Session expires automatically

```gherkin
Given the user has an active session
And the maximum inactivity time has been reached
When the system detects inactivity
Then the session must expire automatically
And the user must be redirected to the login page
And the session token must be invalidated
```

### Scenario: Access denied because the token is invalid

```gherkin
Given the user attempts to access the system using a manipulated token
When the system validates the token
Then the system must deny access
And the session must be invalidated
And the attempt must be logged
```

### Scenario: Unauthorized access to protected routes

```gherkin
Given the user is not authenticated
When the user attempts to access a protected route
Then the system must deny access
And the user must be redirected to the login page
And the attempt must be logged
```

---

# EP-02 — Membership System

## US-07 — Purchase Membership

### Scenario: Successful membership purchase

```gherkin
Given the user is authenticated
And the selected membership is available
When the payment gateway approves the transaction
Then the membership must be activated
And the purchase must be stored in the database
And the user must receive a purchase confirmation
```

### Scenario: Membership is not activated after a failed payment

```gherkin
Given the user is authenticated
When the payment gateway rejects the transaction
Then the membership must not be activated
And no access code must be generated
And the failed transaction must be logged
```

### Scenario: Duplicate payment confirmation is ignored

```gherkin
Given a successful payment has already been processed
When the payment gateway sends the same confirmation again
Then the system must ignore the duplicate confirmation
And only one membership record must exist
And no duplicate charge must be generated
```

### Scenario: Membership purchase fails because the session expired

```gherkin
Given the user's session has expired
When the user attempts to purchase a membership
Then the system must reject the request
And the user must be redirected to the login page
```

### Scenario: Membership purchase fails because the membership does not exist

```gherkin
Given the selected membership does not exist
When the user attempts to purchase the membership
Then the system must reject the operation
And no payment must be processed
```

### Scenario: Membership purchase detects price manipulation

```gherkin
Given the user attempts to modify the membership price from the client side
When the system validates the payment amount
Then the system must reject the transaction
And the incident must be logged as fraudulent activity
```

---

## US-17 — Automatic Membership Code Generation

### Scenario: Access code generated successfully

```gherkin
Given the membership payment was approved
When the activation process begins
Then the system must generate a unique access code
And the code must be associated with the membership
And the code must be stored in the database
And the code must be visible in the user dashboard
```

### Scenario: Duplicate code generation is prevented

```gherkin
Given the generated code already exists
When the system attempts to assign the duplicate code
Then the system must reject the duplicate code
And the system must automatically generate a new unique code
And the duplication attempt must be logged
```

### Scenario: Code generation fails because the database is unavailable

```gherkin
Given the membership payment was approved
And the database connection becomes unavailable
When the system attempts to store the access code
Then the membership status must remain as "Code Pending"
And the system must retry the operation automatically
And no invalid code must be assigned
```

---

# EP-03 — Payment Processing

## US-08 — Secure Payment Processing

### Scenario: Payment processed successfully

```gherkin
Given the user is authenticated
And the payment information is valid
When the user confirms the payment
Then the system must process the payment through a secure gateway
And the membership must be activated
```

### Scenario: Payment fails because the payment gateway is unavailable

```gherkin
Given the user attempts to process a payment
And the payment gateway is unavailable
When the response timeout limit is reached
Then the transaction must be marked as failed
And no membership must be activated
And the user must receive a controlled error message
```

### Scenario: Payment fails because the card information is invalid

```gherkin
Given the user submits invalid card information
When the payment gateway processes the request
Then the transaction must be rejected
And no membership must be activated
```

### Scenario: User cancels the payment

```gherkin
Given the payment process has started
When the user cancels the transaction
Then the system must cancel the process
And no membership must be activated
And the cancellation must be logged
```

---

# EP-06 — Dashboard System

## US-03 — User Dashboard

### Scenario: Dashboard loads successfully

```gherkin
Given the user logged in successfully
When the user accesses the dashboard
Then the system must display the user information
And active memberships must be displayed correctly
And the dashboard must load without errors
```

### Scenario: Partial dashboard failure does not damage the system

```gherkin
Given the user accesses the dashboard
When an internal service fails
Then the dashboard must continue operating partially
And only available modules must be displayed
And no sensitive error information must be exposed
```

### Scenario: Standard user attempts to access the admin dashboard

```gherkin
Given the user has a standard role
When the user attempts to access the administrator dashboard
Then the system must deny access
And the system must display the message "Unauthorized access"
And the incident must be logged
```

---

# EP-07 — Access Validation

## US-20 — Access Code Validation

### Scenario: Access code validation succeeds

```gherkin
Given a valid access code exists
And the associated membership is active
When the code is scanned or entered
Then the system must validate the code correctly
And access must be granted
```

### Scenario: Access denied because the code is invalid

```gherkin
Given the entered code does not exist
When the system validates the code
Then the system must deny access
And the system must display the message "Invalid code"
And the attempt must be logged
```

### Scenario: Access denied because the membership is suspended

```gherkin
Given the code belongs to a suspended membership
When the system validates the code
Then access must be denied
And the incident must be logged
```

### Scenario: Simultaneous code reuse is detected

```gherkin
Given the access code is already being used in another active access
When the system detects a simultaneous validation attempt
Then the system must reject the second validation
And the incident must be logged as suspicious activity
```

### Scenario: Multiple invalid attempts trigger suspicious activity detection

```gherkin
Given multiple invalid access attempts were detected from the same device
When the maximum allowed attempts are exceeded
Then the system must temporarily block additional validations
And the activity must be logged as suspicious
And administrators must be able to review the incident
```

---

# EP-09 — Messaging System

## US-16 — Messaging Between User and Administrator

### Scenario: Message sent successfully

```gherkin
Given the user is authenticated
When the user sends a message to the administrator
Then the message must be stored in the database
And the administrator must receive the notification
And the user must receive a confirmation message
```

### Scenario: Message fails because the content is empty

```gherkin
Given the user is on the messaging form
When the user attempts to send an empty message
Then the system must reject the request
And the system must display the message "Message is required"
And no message must be stored
```

### Scenario: Spam detection limits messaging activity

```gherkin
Given the user sends multiple messages within a short period of time
When the system detects suspicious behavior
Then the system must temporarily limit messaging activity
And the incident must be logged
And administrators must be able to review the suspicious activity
```
