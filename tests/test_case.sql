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
VALUES ('test@mail.com', '5555555555', '1234');Test 1:
-- Inserts a subscription with a user ID that likely does NOT exist (99999).
-- Purpose: test referential integrity (foreign key constraints) and handling of orphan records.
INSERT INTO subscription (start_date, finish_date, state, id_user, id_affiliation, used)
VALUES ('2026-01-01', '2026-01-10', 'active', 99999, 1, false);
-- Test 2:
-- Inserts a subscription with inconsistent dates:
-- finish_date is earlier than start_date.
-- Purpose: test business logic validation for date constraints.
INSERT INTO subscription (start_date, finish_date, state, id_user, id_affiliation, used)
VALUES ('2026-02-10', '2026-01-01', 'active', 1, 1, false);
-- Test 3:
-- Inserts a user with all NULL values in required fields.
-- Purpose: test NOT NULL constraints and user data validation rules.
INSERT INTO users (username, email, phone, password, role)
VALUES (NULL, NULL, NULL, NULL, NULL);