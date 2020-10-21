CREATE DATABASE SIDEKICK_EXPENSES;
USE SIDEKICK_EXPENSES;

CREATE TABLE transactions(
    transaction_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    description VARCHAR(255),
    transaction_type INT,
    transaction_mode INT, 
    transaction_value REAL
);

CREATE TABLE summary(
    user_id INT NOT NULL,
    cash REAL,
    bank REAL,
    ewallet REAL,
    total REAL
);