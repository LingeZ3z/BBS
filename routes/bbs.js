const express = require('express');
const router = express.Router();
const db = require('./../modules/database');

router.get('/', (req, res) => {
    res.send('Welcome!');
})

module.exports = router;