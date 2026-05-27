# LU LOO LAND – PRODUCT BACKLOG

---

# 1. PRODUCT GOAL

Develop a modern, secure, and scalable web platform for Lu Loo Land that allows users to manage their experience inside the park, including memberships, payments, events, and access validation, while providing administrators with efficient control tools.

The system must handle success and failure scenarios, ensuring strong security, strict data validation, authentication protection, and safe handling of system errors such as invalid inputs, failed payments, expired memberships, duplicate requests, and unauthorized access attempts.

# 2. EPICS

| ID | Epic | Description |
|---|---|---|
| EP-01 | User Management | Secure registration, authentication, and account management |
| EP-02 | Membership System | Membership purchases, expiration, and code generation |
| EP-03 | Payment Processing | Secure and resilient payment handling |
| EP-04 | Park Catalog | Games, restaurants, and park information |
| EP-05 | Events Management | Event listing and event management |
| EP-06 | Dashboard System | User and administrator dashboards |
| EP-07 | Access Validation | Membership and access code validation |
| EP-08 | UI/UX Redesign | Responsive and modern user interface |
| EP-09 | Messaging System | User-administrator communication |
| EP-10 | Security & Monitoring | Security logging, suspicious activity detection, and monitoring |

---

# 3. USER STORIES

# EP-01 — User Management

## US-01 — Secure User Registration

### Scenario: Successful user registration

```gherkin
Scenario: Successful user registration
Given the user is on the registration page
And the email address does not exist in the system
And the password meets all security requirements
When the user submits the registration form
Then the system must create the user account
And the password must be encrypted using bcrypt
And the user information must be stored in the database
And the user must be redirected to the login page
```

---

### Scenario: Registration fails because email already exists

```gherkin
Scenario: Registration fails because email already exists
Given an account already exists with the email "user@email.com"
When the user attempts to register using the same email
Then the system must reject the registration
And the system must display the message "Email already registered"
And no new account must be created
```

---

### Scenario: Registration fails because password is weak

```gherkin
Scenario: Registration fails because password is weak
Given the user is on the registration page
When the user submits the password "123456"
Then the system must reject the registration
And the system must display password security requirements
And no account must be stored in the database
```

---

### Scenario: Registration fails because required fields are empty

```gherkin
Scenario: Registration fails because required fields are empty
Given the user is on the registration page
When the user submits the form with empty required fields
Then the system must reject the request
And validation messages must be displayed
And no account must be created
```

---

### Scenario: Registration fails due to database failure

```gherkin
Scenario: Registration fails due to database failure
Given the registration service is available
And the database connection becomes unavailable
When the user submits a valid registration form
Then the system must not create the account
And the system must return a generic error message
And the system must not expose internal server information
And the error must be logged internally
```

---

### Scenario: Registration fails because email format is invalid

```gherkin
Scenario: Registration fails because email format is invalid
Given the user is on the registration page
When the user submits the email "user@email"
Then the system must reject the registration
And the system must display the message "Invalid email format"
And no account must be created
```

---

### Scenario: Registration fails because password has no special character

```gherkin
Scenario: Registration fails because password has no special character
Given the user is on the registration page
When the user submits a password without special characters
Then the system must reject the registration
And the system must display password requirements
```

---

### Scenario: Registration fails because password has no number

```gherkin
Scenario: Registration fails because password has no number
Given the user is on the registration page
When the user submits a password without numbers
Then the system must reject the registration
And the system must display password requirements
```

---

### Scenario: Registration rejects SQL injection attempt

```gherkin
Scenario: Registration rejects SQL injection attempt
Given the user is on the registration page
When the user submits malicious SQL code in the form fields
Then the system must sanitize the input
And the system must reject the request
And the attempt must be logged as suspicious activity
And the database integrity must remain unaffected
```

---

### Scenario: Registration prevents duplicate form submission

```gherkin
Scenario: Registration prevents duplicate form submission
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
Scenario: Successful login
Given an active account exists
And the password provided is correct
When the user submits the login form
Then the system must authenticate the user
And the system must create a secure session
And the user must be redirected to the dashboard
```

---

### Scenario: Login fails because password is incorrect

```gherkin
Scenario: Login fails because password is incorrect
Given an account exists
When the user submits an incorrect password
Then the system must deny access
And the system must display the message "Invalid credentials"
And the failed attempt must be logged
```

---

### Scenario: Login fails because account is suspended

```gherkin
Scenario: Login fails because account is suspended
Given the user account is suspended
When the user attempts to log in
Then the system must deny access
And the system must display the message "Account suspended"
And no session must be created
```

---

### Scenario: Account is temporarily locked after multiple failed attempts

```gherkin
Scenario: Account is temporarily locked after multiple failed attempts
Given five consecutive failed login attempts were detected
When the user attempts another login
Then the system must temporarily lock the account
And the system must deny authentication
And the suspicious activity must be logged
```

---

### Scenario: Login fails because user does not exist

```gherkin
Scenario: Login fails because user does not exist
Given no account exists with the provided email
When the user attempts to log in
Then the system must deny access
And the system must display the message "Invalid credentials"
And the system must not reveal whether the account exists
```

---

### Scenario: Session expires automatically

```gherkin
Scenario: Session expires automatically
Given the user has an active session
And the maximum inactivity time has been reached
When the system detects inactivity
Then the session must expire automatically
And the user must be redirected to the login page
And the session token must be invalidated
```

---

### Scenario: Access denied because token is invalid

```gherkin
Scenario: Access denied because token is invalid
Given the user attempts to access the system using a manipulated token
When the system validates the token
Then the system must deny access
And the session must be invalidated
And the attempt must be logged
```

---

### Scenario: Unauthorized access to protected routes

```gherkin
Scenario: Unauthorized access to protected routes
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
Scenario: Successful membership purchase
Given the user is authenticated
And the selected membership is available
When the payment gateway approves the transaction
Then the membership must be activated
And the purchase must be stored in the database
And the user must receive a purchase confirmation
```

---

### Scenario: Membership is not activated after failed payment

```gherkin
Scenario: Membership is not activated after failed payment
Given the user is authenticated
When the payment gateway rejects the transaction
Then the membership must not be activated
And no access code must be generated
And the failed transaction must be logged
```

---

### Scenario: Duplicate payment confirmation is ignored

```gherkin
Scenario: Duplicate payment confirmation is ignored
Given a successful payment was already processed
When the payment gateway sends the same confirmation again
Then the system must ignore the duplicate confirmation
And only one membership record must exist
And no duplicate charge must be generated
```

---

### Scenario: Membership purchase fails because session expired

```gherkin
Scenario: Membership purchase fails because session expired
Given the user session has expired
When the user attempts to purchase a membership
Then the system must reject the request
And the user must be redirected to the login page
```

---

### Scenario: Membership purchase fails because membership does not exist

```gherkin
Scenario: Membership purchase fails because membership does not exist
Given the selected membership does not exist
When the user attempts to purchase the membership
Then the system must reject the operation
And no payment must be processed
```

---

### Scenario: Membership purchase detects price manipulation

```gherkin
Scenario: Membership purchase detects price manipulation
Given the user attempts to modify the membership price from the client side
When the system validates the payment amount
Then the system must reject the transaction
And the incident must be logged as fraudulent activity
```

---

## US-17 — Automatic Membership Code Generation

### Scenario: Access code generated successfully

```gherkin
Scenario: Access code generated successfully
Given the membership payment was approved
When the activation process starts
Then the system must generate a unique access code
And the code must be associated with the membership
And the code must be stored in the database
And the code must be visible in the user dashboard
```

---

### Scenario: Duplicate code generation is prevented

```gherkin
Scenario: Duplicate code generation is prevented
Given the generated code already exists
When the system attempts to assign the duplicated code
Then the system must reject the duplicated code
And the system must generate a new unique code automatically
And the duplication attempt must be logged
```

---

### Scenario: Code generation fails because database is unavailable

```gherkin
Scenario: Code generation fails because database is unavailable
Given the membership payment was approved
And the database connection becomes unavailable
When the system attempts to store the access code
Then the membership status must remain as "Pending Code"
And the system must retry the operation automatically
And no invalid code must be assigned
```

---

# EP-03 — Payment Processing

## US-08 — Secure Payment Processing

### Scenario: Payment processed successfully

```gherkin
Scenario: Payment processed successfully
Given the user is authenticated
And the payment information is valid
When the user confirms the payment
Then the system must process the payment through a secure gateway
And the membership must be activated
```

---

### Scenario: Payment fails because payment gateway is unavailable

```gherkin
Scenario: Payment fails because payment gateway is unavailable
Given the user attempts to process a payment
And the payment gateway is unavailable
When the maximum response timeout is reached
Then the transaction must be marked as failed
And no membership must be activated
And the user must receive a controlled error message
```

---

### Scenario: Payment fails because card information is invalid

```gherkin
Scenario: Payment fails because card information is invalid
Given the user submits invalid card information
When the payment gateway processes the request
Then the transaction must be rejected
And no membership must be activated
```

---

### Scenario: Payment is canceled by the user

```gherkin
Scenario: Payment is canceled by the user
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
Scenario: Dashboard loads successfully
Given the user logged in successfully
When the user accesses the dashboard
Then the system must display the user information
And active memberships must be displayed correctly
And the dashboard must load without errors
```

---

### Scenario: Partial dashboard failure does not break the system

```gherkin
Scenario: Partial dashboard failure does not break the system
Given the user accesses the dashboard
When one internal service fails
Then the dashboard must continue operating partially
And only available modules must be displayed
And sensitive error information must not be exposed
```

---

### Scenario: Standard user attempts to access admin dashboard

```gherkin
Scenario: Standard user attempts to access admin dashboard
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
Scenario: Access code validation succeeds
Given a valid access code exists
And the associated membership is active
When the code is scanned or entered
Then the system must validate the code successfully
And access must be granted
```

---

### Scenario: Access denied because code is invalid

```gherkin
Scenario: Access denied because code is invalid
Given the entered code does not exist
When the system validates the code
Then the system must deny access
And the system must display the message "Invalid code"
And the attempt must be logged
```

---

### Scenario: Access denied because membership is suspended

```gherkin
Scenario: Access denied because membership is suspended
Given the code belongs to a suspended membership
When the system validates the code
Then access must be denied
And the incident must be logged
```

---

### Scenario: Simultaneous code reuse is detected

```gherkin
Scenario: Simultaneous code reuse is detected
Given the access code is already being used in another active access
When the system detects a simultaneous validation attempt
Then the system must reject the second validation
And the incident must be logged as suspicious activity
```

---

### Scenario: Multiple invalid attempts trigger suspicious activity detection

```gherkin
Scenario: Multiple invalid attempts trigger suspicious activity detection
Given multiple invalid access attempts were detected from the same device
When the maximum allowed attempts are exceeded
Then the system must temporarily block further validations
And the activity must be registered as suspicious
And administrators must be able to review the incident
```

---

# EP-09 — Messaging System

## US-16 — User-Administrator Messaging

### Scenario: Message sent successfully

```gherkin
Scenario: Message sent successfully
Given the user is authenticated
When the user sends a message to the administrator
Then the message must be stored in the database
And the administrator must receive the notification
And the user must receive a confirmation message
```

---

### Scenario: Message fails because content is empty

```gherkin
Scenario: Message fails because content is empty
Given the user is on the messaging form
When the user attempts to send an empty message
Then the system must reject the request
And the system must display the message "Message is required"
And no message must be stored
```

---

### Scenario: Spam detection limits messaging activity

```gherkin
Scenario: Spam detection limits messaging activity
Given the user sends multiple messages in a short period of time
When the system detects suspicious behavior
Then the system must temporarily limit messaging activity
And the incident must be logged
And administrators must be able to review the suspicious activity
```

---
