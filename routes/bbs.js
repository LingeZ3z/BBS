const express = require('express');
const router = express.Router();
const db = require('./../modules/database');

router.get('/', (req, res) => {
    db.query("SELECT * FROM `post` ORDER BY `post_time` DESC", null, (result) => {
        res.render('bbs', {
            post: result
        });
    })
})

module.exports = router;