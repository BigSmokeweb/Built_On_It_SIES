CREATE DATABASE build_on_it;
USE build_on_it;

CREATE TABLE problems (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE solutions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    problem_id INT,
    text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (problem_id) REFERENCES problems(id) ON DELETE CASCADE
);

USE build_on_it;

ALTER TABLE problems 
ADD COLUMN status ENUM('open', 'in-progress', 'completed') DEFAULT 'open' AFTER description,
ADD COLUMN taken_by VARCHAR(100) DEFAULT NULL AFTER status;

