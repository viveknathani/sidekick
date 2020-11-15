CREATE DATABASE SIDEKICK_GRADES;
USE SIDEKICK_GRADES;

CREATE TABLE grades(
    grades_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    subject_name VARCHAR(255),
    date DATE,
    max_marks REAL,
    scored_marks REAL
);