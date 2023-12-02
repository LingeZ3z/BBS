const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bbs'
})

connection.connect();

module.exports.query = (sql, params, work) => {
    connection.query(sql, params, (err, result) => {
        if(err) console.log(err);
        work(result);
    })
}

module.exports.update = (sql, params, work) => {
    connection.query(sql, params, (err, result) => {
        if(err) console.log(err);
        work(result);
    })
}