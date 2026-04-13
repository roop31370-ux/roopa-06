const mysql = require('mysql2');
require('dotenv').config();

// Create the connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME, 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000
});

// Bridge to use async/await
const promisePool = pool.promise();

// Improved Connection Test
async function testConnection() {
  try {
    const connection = await promisePool.getConnection();
    console.log('✅ MySQL Connected Successfully to:', process.env.DB_NAME);
    connection.release(); // Always release the connection back to the pool
  } catch (err) {
    console.error('❌ MySQL Connection Error!');
    console.error('Reason:', err.message);
    console.log('👉 Tip: Ensure XAMPP MySQL is START and DB name is correct.');
  }
}

testConnection();

module.exports = promisePool;