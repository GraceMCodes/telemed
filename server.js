const express = require('express');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
}));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
