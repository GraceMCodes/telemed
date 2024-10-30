const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../config/db'); // Adjust path if necessary

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
