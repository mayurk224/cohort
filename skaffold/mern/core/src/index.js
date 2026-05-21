import express from 'express';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
    let sum = 0;
    for (let i = 0; i < 1000000; i++) {
        sum += i;
    }
    res.status(200).json({ message: "Sum: " + sum });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`core app is running on port ${PORT}`);
});
