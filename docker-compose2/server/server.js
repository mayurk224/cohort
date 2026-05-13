import express from 'express';

const app = express();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello World!" });
})

app.get("/api/users", (req, res) => {
    const users = [
        {
            id: 1,
            name: "Yashk",
            age: 20,
            email: "yashk@example.com"
        },
        {
            id: 2,
            name: "John Doe",
            age: 30,
            email: "john@example.com"
        },
        {
            id: 3,
            name: "Jane Doe",
            age: 25,
            email: "jane@example.com"
        },
    ]
    res.status(200).json(users);
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})