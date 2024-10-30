// Implement Patient Registration

const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../config/db'); 

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO patients (name, email, password) VALUES (?, ?, ?)';
    db.query(query, [name, email, hashedPassword], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: 'Patient registered successfully!' });
    });
});

module.exports = router;

// Implement Patient Login

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM patients WHERE email = ?';
    db.query(query, [email], async (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

        const patient = results[0];
        const match = await bcrypt.compare(password, patient.password);
        if (!match) return res.status(401).json({ message: 'Invalid credentials' });

        req.session.patientId = patient.id; // Start session
        res.json({ message: 'Login successful!' });
    });
});

