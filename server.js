const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'list',
    port: 5432
});

// Create table if not exists
pool.query(`
    CREATE TABLE IF NOT EXISTS data (
        id INTEGER PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        status BOOLEAN NOT NULL
    );
`, (err) => {
    if (err) console.error('Error creating table:', err);
    else console.log('Table created or exists');
});

// Serve index.html at root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Fetch all data
app.get('/data', async (req, res) => {
    try {
        // Modified: Remove ORDER BY to prevent sorting by id
        const result = await pool.query('SELECT * FROM data');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Server error');
    }
});

// Save data
app.post('/data', async (req, res) => {
    try {
        const data = req.body;
        for (const item of data) {
            // Modified: If originalId exists, delete old record before inserting new one
            if (item.originalId && item.originalId !== item.id) {
                await pool.query('DELETE FROM data WHERE id = $1', [item.originalId]);
            }
            await pool.query(
                'INSERT INTO data (id, name, status) VALUES ($1, $2, $3) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, status = EXCLUDED.status',
                [item.id, item.name, item.status ?? false]
            );
        }
        res.json('Data saved successfully');
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).send('Server error');
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});