import express from "express"

const app = express()

app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.get("/api/data", (req, res) => {
    const data = {
        id: 1,
        name: "Yashk",
        age: 25
    }
    res.status(200).json(data)
})

app.get("/api/users", (req, res) => {
    const users = [
        {
            id: 1,
            name: "Yashk",
            age: 25
        },
        {
            id: 2,
            name: "Yashk2",
            age: 26
        }
    ]
    res.status(200).json(users)
})

export default app