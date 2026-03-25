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