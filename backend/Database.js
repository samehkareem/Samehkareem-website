const sqlite = require('sqlite3');
const db = new sqlite.Database('PureStitch.db'); // Path to your SQLite database

// Create USER table
const createUserTable = `
CREATE TABLE IF NOT EXISTS USER (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    NAME TEXT NOT NULL,
    EMAIL TEXT UNIQUE NOT NULL,
    PASSWORD TEXT NOT NULL,
    ISADMIN INT
)`;

// Create CLOTHING table
const createClothingTable = `
CREATE TABLE IF NOT EXISTS CLOTHING (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    NAME TEXT NOT NULL,
    BRAND TEXT NOT NULL,
    PRICE REAL NOT NULL,
    DESCRIPTION TEXT,
    QUANTITY INT NOT NULL
)`;

// Create PURCHASES table
const createPurchaseTable = `
CREATE TABLE IF NOT EXISTS PURCHASES (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    USER_ID INT NOT NULL,
    CLOTHING_ID INT NOT NULL,
    QUANTITY INT NOT NULL,
    FOREIGN KEY (USER_ID) REFERENCES USER(ID),
    FOREIGN KEY (CLOTHING_ID) REFERENCES CLOTHING(ID)
)`;

// Initialize the tables
db.serialize(() => {
    db.run(createUserTable, (err) => {
        if (err) console.log('Error creating USER table: ' + err);
    });
    db.run(createClothingTable, (err) => {
        if (err) console.log('Error creating CLOTHING table: ' + err);
    });
    db.run(createPurchaseTable, (err) => {
        if (err) console.log('Error creating PURCHASES table: ' + err);
    });
});

module.exports = { db, createUserTable, createClothingTable, createPurchaseTable };