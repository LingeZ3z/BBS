const express = require('express');
const router = express.Router();

router.all('/', (req, res) => {
    res.send('Welcome To BBS');
})

module.exports = router;