const mysql = require('mysql')

const databaseConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'lezzoostore'
});

databaseConnection.connect((error) => {
    if (!error) {
        console.log('connection with database successfully');

    } else {
        console.log('server can\'t connect into database please Make sure you are put lezzoostore.sql from databaseFile in root directory, export into MYSQL!');

    }

})

module.exports = databaseConnection