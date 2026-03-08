INSERT INTO users (username, email, phone, password)
VALUES
('Liz', 'liz@mail.com', '1234567890', '1234'),
('José', 'jose@mail.com', '0987654321', 'abcd');
INSERT INTO AFFILIATION (plan_type, description, price)
VALUES
('Basic', 'Basic plan', 100.00),
('Premium', 'Premium plan', 250.00);
INSERT INTO SUBSCRIPTION (start_date, fiish_date, state, id_user, id_affliation)
VALUES
('2026-03-01', '2026-06-01', 'active', 4, 1),
('2026-03-02', '2026-06-02', 'active', 5, 2);
INSERT INTO PAY (card_last4, pay_date, amount, id_subscription)
VALUES
('1111', '2026-03-01', 100.00, 1),
('2222', '2026-03-02', 250.00, 2);
