import express from 'express';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev'));
app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    let sum = 0;
    for (let i = 0; i < 1000000000; i++) {
        sum += i;
    }
    res.status(200).json({ message: "Sum: " + sum });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
