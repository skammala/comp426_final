// This ensures that things do not fail silently but will throw errors instead.
"use strict";
// Require better-sqlite.
const Database = require('better-sqlite3');

// Connect to a database or create one if it doesn't exist yet.
const db = new Database('user.db');

// Is the database initialized or do we need to initialize it?
const stmt = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='userinfo';`);
let row = stmt.get();
if (row === undefined) {
// Echo information about what you are doing to the console.
    console.log('Your database appears to be empty. I will initialize it now.');
// Set a const that will contain your SQL commands to initialize the database.
    const sqlInit = `
        CREATE TABLE userinfo ( id INTEGER PRIMARY KEY, user TEXT, email TEXT, pass TEXT );
        CREATE TABLE interactions ( user TEXT, lastLogin TEXT, score INT );
		INSERT INTO userinfo (user, email, pass) VALUES ('cole','cole@gmail.com','bdc87b9c894da5168059e00ebffb9077'), ('cooper','cooper@gmail.com','9241818c20435c6672dac2c4b6e6c071');
		INSERT INTO interactions (user, lastLogin, score) VALUES ('cole','11/27/2021',0), ('cooper','11/27/2021',0)
    `;
// Execute SQL commands that we just wrote above.
    db.exec(sqlInit);
// Echo information about what we just did to the console.
    console.log('Your database has been initialized with two new tables and two entries containing users with no scores');
} else {
// Since the database already exists, echo that to the console.
    console.log('Database exists.')
}
// Export all of the above as a module so that we can use it elsewhere.
module.exports = db