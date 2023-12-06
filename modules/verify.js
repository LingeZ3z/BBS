const db = require('./../modules/database');

module.exports.verifySignin = (req, res, next) => {
    if(!req.session.ide) {
        res.status(401).render('default', {
            title: 'Message',
            brief: "Haven't signed in.",
            content: null
        });
        return;
    }
    db.query("SELECT * FROM users WHERE id = ?", [req.session.ide], (result) => {
        if(result[0] == null) {
            res.status(401).render('default', {
                title: 'Message',
                brief: "Haven't signed in.",
                content: null
            });
            return;
        }
    })
    next();
}