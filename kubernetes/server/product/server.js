import express from 'express';
import morgan from 'morgan';
import axios from 'axios';

const app = express();

const MAIN_SERVER_URL = process.env.MAIN_SERVER_URL || "http://main-server-service/";

app.use(morgan('dev'));
app.use(express.json());

app.get("/product", async (req, res) => {
    const response = await axios.get(MAIN_SERVER_URL);
    res.status(200).json({ 
        message: "Product route accessed successfully",
        mainServerData: response.data.message,
        timestamp: new Date().toISOString()
    });
});

const port = 3001;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
