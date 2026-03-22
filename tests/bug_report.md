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
