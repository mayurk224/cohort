import express from 'express';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
});

app.get('/api/data', (req, res) => {
    const data = {
        id: 1,
        name: 'Yashk',
        age: 20
    }
    res.status(200).json(data);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});