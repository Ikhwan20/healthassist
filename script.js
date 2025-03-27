const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'your_secret_key'; // Replace with a secure key

// Middleware

app.use(express.json()); // Parse JSON bodies
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files (HTML, CSS, JS)

// MySQL Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'healthassist',
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        process.exit(1);
    }
    console.log('Database connected!');
});

// API: Register a User
app.post('/register', async (req, res) => {
    const { name, username, gender, email, birthday, password, phoneNumber } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        const sql = 'INSERT INTO users (user_name, username, gender, email, birthday, password, phone_number) VALUES (?, ?, ?, ?, ?, ?, ?)';
        db.query(sql, [name, username, gender, email, birthday, hashedPassword, phoneNumber || 'user'], (err) => {
            if (err) {
                console.error('Error during registration:', err);
                return res.status(500).send('User registration failed.');
            }
            res.status(201).send('User registered successfully!');
        });
    } catch (error) {
        console.error('Error hashing password:', error);
        res.status(500).send('An error occurred. Please try again.');
    }
});

// API: Login a User
app.post('/login', (req, res) => {
    const { emailOrUsername, password } = req.body;

    // Determine whether the input is an email or username
    const isEmail = emailOrUsername.includes('@');
    const column = isEmail ? 'email' : 'username';

    const sql = `SELECT * FROM users WHERE ${column} = ?`;
    db.query(sql, [emailOrUsername], async (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Server error');
        }

        if (results.length > 0) {
            const user = results[0];
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                // Create JWT token
                const token = jwt.sign(
                    { user_id: user.user_id, user_type: user.user_type },
                    SECRET_KEY,
                    { expiresIn: '1h' }
                );
                res.status(200).json({ token });
            } else {
                res.status(401).send('Invalid credentials');
            }
        } else {
            res.status(404).send('User not found');
        }
    });
});

// Middleware: Authenticate JWT
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Token required' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });

        req.user = user; // Add user data to the request
        next();
    });
};

// API: Submit Payment (Protected Route)
app.post('/api/payments', authenticateJWT, (req, res) => {
    const { payment_date, payment_method, card_number, expiry_date, cvv } = req.body;
    const user_id = req.user.user_id; // Get user ID from decoded token

    // Validate required fields
    if (!payment_date || !payment_method) {
        return res.status(400).json({ error: 'Payment date and method are required' });
    }

    // Additional validation for card details if payment method is "Credit Card" or "Debit Card"
    if (
        (payment_method === 'Credit Card' || payment_method === 'Debit Card') &&
        (!card_number || !expiry_date || !cvv)
    ) {
        return res
            .status(400)
            .json({ error: 'Card details are required for Credit Card or Debit Card payments' });
    }

    // Query to insert payment details
    const query = `
        INSERT INTO payments (user_id, payment_date, payment_method, card_number, expiry_date, cvv)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    console.log(payment_method, card_number.slice(-4), expiry_date, cvv);
    // Insert card details only if the payment method is "Credit Card" or "Debit Card"
    const params = payment_method === 'CREDIT CARD' || payment_method === 'DEBIT CARD'
        ? [user_id, payment_date, payment_method, card_number.slice(-4), expiry_date, cvv]
        : [user_id, payment_date, payment_method, null, null, null];

    db.query(query, params, (err, result) => {
        if (err) {
            console.error('Error inserting payment:', err.message);
            return res.status(500).json({ error: 'Database error' });
        }

        res.status(201).json({
            message: 'Payment recorded successfully',
            payment_id: result.insertId,
        });
    });
});


// API: Create Appointment (Protected Route)
app.post('/api/appointments', authenticateJWT, (req, res) => {
    const { user_id, appointment_date, appointment_time, checkup_name } = req.body;

    if (!user_id || !appointment_date || !appointment_time || !checkup_name) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const query = `
        INSERT INTO appointments (user_id, appointment_date, appointment_time, checkup_name)
        VALUES (?, ?, ?, ?)
    `;
    console.log(user_id, appointment_date, appointment_time, checkup_name);
    db.query(query, [user_id, appointment_date, appointment_time, checkup_name], (err, result) => {
        if (err) {
            console.error('Error inserting appointment:', err.message);
            return res.status(500).json({ error: 'Database error' });
        }

        res.status(201).json({ message: 'Appointment created successfully', appointment_id: result.insertId });
    });
});

// Route to fetch appointments for a user
app.get("/api/appointments", (req, res) => {
    const userId = req.query.user_id; // Expecting user_id as a query parameter
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
  
    const query = `
      SELECT 
        appointment_date, 
        appointment_time, 
        checkup_name 
      FROM appointments 
      WHERE user_id = ?
    `;
    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error("Error fetching appointments:", err);
        return res.status(500).json({ error: "Database query failed" });
      }
      res.json(results); // Return appointments as JSON
    });
  });

  

app.post('/logout', (req, res) => {
    // Clear session or authentication info
    res.clearCookie('sessionID'); // If using cookies
    res.redirect('/login.html'); // Redirect to login page after logout
});


// Start the Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
