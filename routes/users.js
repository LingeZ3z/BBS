const express = require('express');
const router = express.Router();
const db = require('./../modules/database');
const md5 = require('md5')

router.post('/sign_in/action', (req, res) => {
    db.query("SELECT * FROM users WHERE name = ?", [req.body.name], (result) => {
        if(result[0] == null){
            res.render('default', {
                title: 'Sign In',
                brief: 'No Such Account',
                content: 'Your username is not correct.'
            })
        } else {
            var mpass = md5(req.body.password);
            if(result[0].password != mpass){
                res.render('default', {
                    title: 'Sign In',
                    brief: 'Wrong Password',
                    content: null
                })
            } else {
                req.session.status = 1;
                req.session.ide = result[0].id;
                res.render('default', {
                    title: 'Sign In',
                    brief: 'Success',
                    content: null
                })
            }
        }
    })
})

router.get('/sign_in', (req, res) => {
    if(req.session.status == 1){
        res.render('default', {
            title: 'Sign In',
            brief: 'You have signed in.',
            content: null
        })
    } else {
        res.render('sign_in', {});
    }
})

router.post('/sign_up/action', (req, res) => {
     db.query('SELECT * FROM users WHERE name = ?', [req.body.name], (result) => {
        if(result[0] != null) {
            res.render('default', {
                title: 'Sign Up',
                brief: 'Username conflict.',
                content: 'Please try another username.'
            });
            return;
        }
        db.query('INSERT INTO users (name, password, content) VALUES (?, ?, ?)', [
            req.body.name,
            md5(req.body.password),
            JSON.stringify({
                score: 0,
                quote: '',
                imgurl: '',
                bgurl: '',
                descr: ''
            })
        ], (result) => {
            console.log(typeof(result));
            if(typeof(result) == 'object'){
                res.render('default', {
                    title: 'Sign Up',
                    brief: 'Success',
                    content: 'Now you can sign in with this account.'
                });
            } else {
                res.render('default', {
                    title: 'Sign Up',
                    brief: 'Failed',
                    content: 'Maybe something wrong. You can try is again.'
                });
            }
        });
    })
})

router.get('/sign_up', (req, res) => {
    if(req.session.status == 1){
        res.render('default', {
            title: 'Sign Up',
            brief: 'You have signed in.',
            content: null
        })
    } else {
        res.render('sign_up', {});
    }
})

router.get('/sign_out', (req, res) => {
    req.session.status = 0;
    res.render('default', {
        title: 'Users',
        brief: "Success.",
        content: null
    })
})

router.get('/:id', (req, res) => {
    if(req.params.id == 0){
        if(req.session.status == 1){
            req.params.id = req.session.ide;
        } else {
            res.render('default', {
                title: 'Users',
                brief: "Haven't signed in.",
                content: null
            });
            return;
        }
    }
    db.query("SELECT * FROM users WHERE id = ?", [req.params.id], (result) => {
        if(result[0] != null){
            console.log(result[0].content);
            var content = JSON.parse(result[0].content);
            res.render('users', {
                name: result[0].name,
                quote: content.quote,
                descr: content.descr
            })
        } else res.render('default',{
            title: 'Users',
            brief: 'No Such Account',
            content: "We can't find any account."
        })
    })
})

module.exports = router;