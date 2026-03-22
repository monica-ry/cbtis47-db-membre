CREATE DATABASE IF NOT EXISTS membership;
USE membership;


CREATE TABLE IF NOT EXISTS USER (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    mail VARCHAR(50) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS AFFILIATION (
    id_affiliation INT AUTO_INCREMENT PRIMARY KEY,
    plan_type VARCHAR(50) NOT NULL,
    description TEXT,
    pay DECIMAL(10,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS SUBSCRIPTION (
    id_subscription INT AUTO_INCREMENT PRIMARY KEY,
    start_date DATE NOT NULL,
    finish_date DATE NOT NULL,
    state VARCHAR(20) DEFAULT 'active',
    id_user INT NOT NULL,
    id_affiliation INT NOT NULL,
    folio VARCHAR(20) UNIQUE NOT NULL,
    FOREIGN KEY (id_user) REFERENCES USER(id_user),
    FOREIGN KEY (id_affiliation) REFERENCES AFFILIATION(id_affiliation)
);

CREATE TABLE IF NOT EXISTS PAY (
    id_pay INT AUTO_INCREMENT PRIMARY KEY,
    card_number VARCHAR(20),
    pay_date DATE NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    id_subscription INT NOT NULL,
    FOREIGN KEY (id_subscription) REFERENCES SUBSCRIPTION(id_subscription)
);

INSERT INTO AFFILIATION (plan_type, description, pay) VALUES
('Games & Food', 'Access to all rides and food', 50.00),
('Games Only', 'Access to all rides', 35.00),
('Food Only', 'Access to food and restaurants', 20.00);

INSERT INTO USER (name, mail, phone, password, is_admin)
VALUES ('Admin', 'admin@park.com', '0000000000', 'admin123', TRUE);