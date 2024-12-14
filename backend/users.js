const sqlite = require('sqlite3');
const db = new sqlite.Database('PureStitch.db'); // Path to your SQLite database
 
// Function to view all users in the USER table
function viewUsers() {
    db.all('SELECT * FROM USER', (err, rows) => {
        if (err) {
            console.error('Error fetching data:', err);
            return;
        }
        if (rows.length === 0) {
            console.log('No users found in the database.');
        } else {
            console.log('Users in the database:');
            rows.forEach((row) => {
                console.log(`ID: ${row.ID}, Name: ${row.NAME}, Email: ${row.EMAIL}`);
            });
        }
    });
}
 
// Function to view all clothes in the clothing table
function viewClothing() {
    db.all('SELECT * FROM CLOTHING', (err, rows) => {
        if (err) {
            console.error('Error fetching data:', err);
            return;
        }
        if (rows.length === 0) {
            console.log('No clothing found in the database.');
        } else {
            console.log('Clothing in the database:');
            rows.forEach((row) => {
                console.log(`ID: ${row.ID}, Name: ${row.NAME}, Brand: ${row.BRAND}, Price: ${row.PRICE}, Quantity: ${row.QUANTITY}`);
            });
        }
    });
}
 
// Function to view all purchases in the PURCHASES table
function viewPurchases() {
    db.all('SELECT * FROM PURCHASES', (err, rows) => {
        if (err) {
            console.error('Error fetching data:', err);
            return;
        }
        if (rows.length === 0) {
            console.log('No purchases found in the database.');
        } else {
            console.log('Purchases in the database:');
            rows.forEach((row) => {
                console.log(`ID: ${row.ID}, User ID: ${row.USER_ID}, Perfume ID: ${row.PERFUME_ID}, Quantity: ${row.QUANTITY}`);
            });
        }
    });
}
 
// Call the function to view all users
viewUsers();
// Call the function to view all the clothes
viewClothing();
// Call the function to view all purchases
viewPurchases();
 
// Close the database connection after the query
db.close();