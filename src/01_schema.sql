CREATE TABLE USER (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    mail VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(20),
    password VARCHAR(255) NOT NULL
);

CREATE TABLE AFFILIATION (
    id_affiliation INT AUTO_INCREMENT PRIMARY KEY,
    plan_type VARCHAR(50) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL
);

CREATE TABLE SUBSCRIPTION (
    id_subscription INT AUTO_INCREMENT PRIMARY KEY,
    start_date DATE NOT NULL,
    finish_date DATE,
    state VARCHAR(20) NOT NULL,
    id_user INT NOT NULL,
    id_affiliation INT NOT NULL,

    CONSTRAINT fk_user
        FOREIGN KEY (id_user)
        REFERENCES USER(id_user),

    CONSTRAINT fk_affiliation
        FOREIGN KEY (id_affiliation)
        REFERENCES AFFILIATION(id_affiliation)
);

CREATE TABLE PAY (
    id_pay INT AUTO_INCREMENT PRIMARY KEY,
    card_last4 CHAR(4) NOT NULL,
    pay_date DATE NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    id_subscription INT NOT NULL,

    CONSTRAINT fk_subscription
        FOREIGN KEY (id_subscription)
        REFERENCES SUBSCRIPTION(id_subscription)
);
