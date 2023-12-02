const express = require('express');
const router = express.Router();
const db = require('./../modules/database');
const md5 = require('md5')

router.post('/login/action', (req, res) => {
    console.log(req.body.name);
    db.query("SELECT * FROM users WHERE name = ?", [req.body.name], (result) => {
        if(result[0] == null){
            res.render('default', {
                title: 'Login',
                brief: 'No Such Account',
                content: 'Your username is not correct.'
            })
        } else {
            var mpass = md5(req.body.password);
            if(result[0].password != mpass){
                res.render('default', {
                    title: 'Login',
                    brief: 'Wrong Password',
                    content: null
                })
            } else {
                req.session.status = 1;
                req.session.ide = result[0].id;
                res.render('default', {
                    title: 'Login',
                    brief: 'Login Success',
                    content: '<a href="./../0">Click here</a>'
                })
            }
        }
    })
})

router.get('/login', (req, res) => {
    if(req.session.status == 1){
        res.render('default', {
            title: 'Login',
            brief: 'You have loged in.'
        })
    } else {
        res.render('login', {});
    }
})

router.get('/:id', (req, res) => {
    if(req.params.id == 0){
        if(req.session.status == 1){
            req.params.id = req.session.ide;
        }
    }
    db.query("SELECT * FROM users WHERE id = ?", [req.params.id], (result) => {
        if(result[0] != null)
            res.render('default',{
                title: 'Users',
                brief: result[0].name,
                content: result[0].content
            })
        else res.render('default',{
            title: 'Users',
            brief: 'No Such Account',
            content: "We can't find any account."
        })
    })
})

module.exports = router;