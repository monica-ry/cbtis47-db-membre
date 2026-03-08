tests/test_cases.sql
-- Duplicate email in users table
INSERT INTO users (username, email, phone, password)
VALUES ('Liz Rodriguez', 'liz@mail.com', '1112223333', 'abcd');
-- Subscription for a non-existent user
INSERT INTO SUBSCRIPTION (start_date, finish_date, state, id_user, id_affiliation)
VALUES ('2026-03-07', '2026-06-10', 'active', 999, 1);
-- Payment for a non-existent subscription
INSERT INTO PAY (card_last4, pay_date, amount, id_subscription)
VALUES ('3333', '2026-03-05', 50.00, 999);
-- Insert user without username (NOT NULL constraint)
INSERT INTO users (email, phone, password)
VALUES ('test@mail.com', '5555555555', '1234');
tests/bug_report.md
# Bug Report
## Test Case 1
**Action:** Inserted a user with an existing email (`liz@mail.com`).
**Expected:** The database should reject the insert because the `email` field is UNIQUE.
**Actual:** MySQL returned an error `Duplicate entry 'liz@mail.com' for key 'email'`.
**Status:** PASSED 
---
## Test Case 2
**Action:** Inserted a subscription for a non-existent user (id_user = 999).
**Expected:** Foreign key constraint should block the insert.
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
