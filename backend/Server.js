const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const db_access = require('./Database.js');
const db = db_access.db;
const server = express();
const port = 555;

server.use(cors());
server.use(express.json());

// User Login Route
server.post('/user/login', (req, res) => {
    const { email, password } = req.body;

    db.get(`SELECT * FROM USER WHERE EMAIL=?`, [email], (err, row) => {
        if (err) {
            console.log('Error retrieving user data:', err);
            return res.status(500).send('Error retrieving user data.');
        }
        if (!row) {
            return res.status(404).send('User not found');
        }

        bcrypt.compare(password, row.PASSWORD, (err, isMatch) => {
            if (err) {
                console.log('Error comparing passwords:', err);
                return res.status(500).send('Error comparing passwords.');
            }
            if (!isMatch) {
                return res.status(401).send('Invalid credentials');
            }

            res.cookie('username', row.NAME, {
                httpOnly: true,
                maxAge: 36000000, // 10 hours
            });
            return res.status(200).send('Login successful');
        });
    });
});

// User Registration Route
server.post('/user/register', (req, res) => {
    const { name, email, password } = req.body;

    db.get(`SELECT * FROM USER WHERE EMAIL = ?`, [email], (err, row) => {
        if (err) {
            console.log('Error checking email in database:', err);
            return res.status(500).send('Error checking email.');
        }
        if (row) {
            console.log(`Email already in use: ${email}`);
            return res.status(400).send('Email already in use.');
        }

        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                console.log('Error hashing password:', err);
                return res.status(500).send('Error hashing password');
            }

            db.run(
                `INSERT INTO USER (NAME, EMAIL, PASSWORD, ISADMIN) VALUES (?, ?, ?, ?)`,
                [name, email, hashedPassword, 0], // `0` this sign represents a non admin user
                (err) => {
                    if (err) {
                        console.log('Error inserting user into DB:', err.message);
                        return res.status(500).send('Error registering user');
                    }
                    console.log(`User registered: ${name}`);
                    return res.status(200).send('Registration successful');
                }
            );
        });
    });
});

// Add Clothing Item
server.post('/clothing', (req, res) => {
    const { name, brand, price, description, quantity } = req.body;

    // Check if all the required fields are provided
    if (!name || !brand || !price || !quantity) {
        return res.status(400).send('All fields except description are required.');
    }

    // Insert the clothing item into the database
    db.run(
        `INSERT INTO CLOTHING (NAME, BRAND, PRICE, DESCRIPTION, QUANTITY) VALUES (?, ?, ?, ?, ?)`,
        [name, brand, price, description, quantity],
        function (err) {
            if (err) {
                return res.status(500).send('Failed to add clothing item.');
            }
            res.status(200).send('Clothing item added successfully!');
        }
    );
});

// Fetch All Clothing Items
server.get('/clothing', (req, res) => {
    db.all(`SELECT * FROM CLOTHING`, (err, rows) => {
        if (err) {
            console.log('Error fetching clothing items:', err);
            return res.status(500).send('Error fetching clothing items.');
        }
        return res.status(200).json(rows);
    });
});

// Checkout the API'S
server.post('/checkout', (req, res) => {
    const { userID, cartItems } = req.body;

    if (!userID || !cartItems || cartItems.length === 0) {
        return res.status(400).send('Invalid checkout request. User ID and cart items are required.');
    }

    const query = `
        INSERT INTO PURCHASES (USER_ID, CLOTHING_ID, QUANTITY)
        VALUES (?, ?, ?)
    `;

    const dbOperations = cartItems.map(item => {
        return new Promise((resolve, reject) => {
            db.run(query, [userID, item.clothingID, item.quantity], (err) => {
                if (err) {
                    console.error('Error inserting purchase:', err);
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    });

    Promise.all(dbOperations)
        .then(() => {
            console.log('All purchases recorded successfully.');
            res.status(200).send('Checkout successful!');
        })
        .catch(err => {
            console.error('Error during checkout:', err);
            res.status(500).send('Failed to complete the checkout.');
        });
});


// Server Initialization
server.listen(port, () => {
    console.log(`Server started at port ${port}`);
});
