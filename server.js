const path = require('path');
const express = require('express');
const cors = require('cors');

const app = express();

const pathOfClient = '../build/';

app.use(express.static(path.resolve(pathOfClient)));
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;


app.get('/', (req, res) => {
    res.sendFile(path.resolve(pathOfClient + '/index.html'))
});

app.listen(port, () => {
    console.log(`Server runing on port ${port}`);
})