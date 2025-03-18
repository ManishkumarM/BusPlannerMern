
const express = require('express');
const { ensureAuthenticated } = require('../Middleware/auth');

const router = express.Router();

router.get('/',ensureAuthenticated, (req, res) => {
    res.status(200).json([
        {
            "mobile": "Samsung",
            "Price": "12000"
        },
        {
            "mobile": "Tv",
            "Price": "320000"
        }
    ])
});

module.exports = router;
