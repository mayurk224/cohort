import express from 'express'

const app = express()

const port = process.env.PORT || 3000

app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.get("/api/users", (req, res) => {
    let users = [
        { id: 1, name: "Yashk" },
        { id: 2, name: "Rashk" },
        { id: 3, name: "Shashk" }
    ]

    res.status(200).json(users)
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})