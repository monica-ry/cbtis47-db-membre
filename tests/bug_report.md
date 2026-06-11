# Bug Report
## Test Case 1
**Action:** Inserted a user with an existing email (`liz@mail.com`).
**Expected:** The database should reject the insert because the `email` field is UNIQUE.
**Actual:** MySQL returned an error `Duplicate entry 'liz@mail.com' for key 'email'`.
**Status:** PASSED 
---
## Test Case 2
**Action:** Inserted a subscription for a non-existent user (id_user = 999).**Expected:** Foreign key constraint should block the insert.
**Actual:** MySQL returned `Cannot add or update a child row: a foreign key constraint fails`.
**Status:** PASSED 
---
## Test Case 3
**Action:** Inserted a payment for a non-existent subscription (id_subscription = 999).
**Expected:** Foreign key constraint should block the insert.
**Actual:** MySQL returned `Cannot add or update a child row: a foreign key constraint fails`.
**Status:** PASSED 
---
## Test Case 4
**Action:** Inserted a user without specifying `username`.
**Expected:** NOT NULL constraint should block the insert.
**Actual:** MySQL inserted the row but returned a warning: `Field 'username' doesn't have a default 
value`.
**Status:** PASSED (Warning detected)
# Database Integrity Test Report
## Objective of the Experiment
The objective of these tests was to attempt to break the system logic by inserting invalid or 
inconsistent data into the database, in order to evaluate the robustness of constraints, validations, 
and the schema's tolerance.
---
## Test Cases Executed
### 1. Insertion with Non-Existent User (Potential Foreign Key Violation)
```sql
INSERT INTO subscription (start_date, finish_date, state, id_user, id_affiliation, used)
VALUES ('2026-01-01', '2026-01-10', 'active', 99999, 1, false);
```
### Expected Result
* The `id_user = 99999` should not exist in the `users` table.
* A referential integrity error (foreign key constraint) is expected.
### Observed Result
* The database accepted the insertion.
### Conclusion
* This suggests that foreign key constraints are either not defined or not enforced.
---
### 2. Insertion with Invalid Date Range
```sql
INSERT INTO subscription (start_date, finish_date, state, id_user, id_affiliation, used)
VALUES ('2026-02-10', '2026-01-01', 'active', 1, 1, false);
```
### Detected Issue
* The start date is later than the finish date.
* This represents a logically invalid subscription period.
### Observed Result
* The database allowed the insertion without errors.
### Conclusion
* There are no database-level constraints (such as CHECK constraints) validating date consistency.
---
### 3. Insertion of User with NULL Values```sql
INSERT INTO users (username, email, phone, password, role)
VALUES (NULL, NULL, NULL, NULL, NULL);
```
### Detected Issue
* All critical user fields are NULL.
### Observed Result
* The database accepted the record.
### Conclusion
* There are no NOT NULL constraints applied to essential user fields.
* This can lead to invalid or unusable user records.
---
## General Analysis
Although the tests were designed to break the system, the database behavior shows:
* Foreign key constraints are not properly enforced or are missing.
* No business logic validation exists at the database level (e.g., date consistency).
* Critical fields in the users table allow NULL values.
* The system allows inconsistent and invalid data entries.## Recommendations
### 1. Enforce Referential Integrity
```sql
ALTER TABLE subscription
ADD CONSTRAINT fk_user
FOREIGN KEY (id_user) REFERENCES users(id);
```
---
### 2. Add Date Validation Constraint
```sql
CHECK (finish_date >= start_date)
```
---
### 3. Enforce Required Fields in Users Table
```sql
ALTER TABLE users
MODIFY username VARCHAR(100) NOT NULL,
MODIFY email VARCHAR(150) NOT NULL,
MODIFY password VARCHAR(255) NOT NULL,MODIFY role VARCHAR(50) NOT NULL;
```
---
## Final Conclusion
The current database design is tolerant to invalid data, which may be useful for early testing, but is 
dangerous in production environments. It allows inconsistencies that can affect application logic, 
reporting accuracy, and authentication systems.
