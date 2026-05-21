import express from 'express';
import morgan from 'morgan';
import axios from 'axios'

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World! from notification app');
});

app.get('/api/notification', async (req, res) => {
    const response = await axios.get("http://core-service/");
    res.status(200).json({ 
        message: "core-service route accessed successfully",
        mainServerData: response.data.message,
        timestamp: new Date().toISOString()
    });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`notification app is running on port ${PORT}`);
});
