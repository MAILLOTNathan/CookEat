const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

var app = express();

var postgresUser = process.env.POSTGRES_USER
var postgresPassword = process.env.POSTGRES_PASSWORD
var postgresHost = process.env.POSTGRES_HOST

var Client;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


app.post('/items', function (req, res) {
    const { name, url } = req.body;
    if (!name || !url) {
        return res.status(400).send('Name and URL are required');
    }
    Client.query('INSERT INTO items(name, url) VALUES($1, $2)', [name, url], (err, result) => {
        if (err) {
            return console.error('Error executing query', err.stack)
        }
        res.send('Item added');
    });
});

app.get('/items', function (req, res) {
    Client.query('SELECT * FROM items', (err, result) => {
        if (err) {
            return console.error('Error executing query', err.stack)
        }
        res.send(result.rows);
    });
});

app.listen(3000, function () {
    const pool = new Pool({
        user: postgresUser,
        host: postgresHost,
        database: process.env.POSTGRES_DB,
        password: postgresPassword,
        port: 5432,
    });

    setTimeout(() => {
        pool.connect((err, client, release) => {
            if (err) {
                return console.error('Error acquiring client', err.stack)
            }
            Client = client
            console.log('Connected to PostgreSQL');
        });
    }, 5000);
    console.log('Example app listening on port 3000!');
});

