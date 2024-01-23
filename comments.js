// Create web server

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/comments', (req, res) => {
    fs.readFile('./comments.json', 'utf-8', (err, data) => {
        if (err) throw err;
        res.send(JSON.parse(data));
    });
});

app.post('/comments', (req, res) => {
    fs.readFile('./comments.json', 'utf-8', (err, data) => {
        if (err) throw err;

        const comments = JSON.parse(data);

        comments.push(req.body);

        fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
            if (err) throw err;
        });

        res.send(comments);
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});