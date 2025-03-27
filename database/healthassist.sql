CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    gender ENUM('Male', 'Female') NOT NULL,
    birthday DATE NOT NULL,
    phone_number BIGINT NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    user_type ENUM('Admin', 'Normal') NOT NULL DEFAULT 'Normal',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE appointments (
    appointment_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    checkup_name ENUM(
        'General Health Checkup', 
        'Dental Checkup', 
        'Eye Checkup', 
        'Postnatal Care', 
        'Prenatal Checkup', 
        'Immunization', 
        'X-Ray Diagnosis'
    ) NOT NULL,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(user_id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE
);

CREATE TABLE payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    payment_date DATE NOT NULL,
    payment_method ENUM('Credit Card', 'Debit Card', 'Cash', 'Insurance') NOT NULL,
    card_number VARCHAR(16), -- Stores the card number (last 4 digits recommended for security)
    expiry_date VARCHAR(5),  -- Format: MM/YY
    cvv VARCHAR(3),          -- Store temporarily or encrypt if needed
    CONSTRAINT fk_payment_user FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Inserting an admin user with a hashed password
INSERT INTO users (user_name, gender, birthday, phone_number, email, username, password, user_type)
VALUES ('Admin', 'Male', '1980-01-01', 1234567890, 'admin@example.com', 'admin', '$2b$10$G9a3IKuwJ0NEXAs64jxi8eaMag6r05MKZFDSXJZJ3Aq9YIJZWe.iy', 'Admin');
