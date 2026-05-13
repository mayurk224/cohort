import express from "express"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

const port = process.env.PORT || 3000

app.use(express.static("public"))

app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.get("/api/users", (req, res) => {
    const user = [
        {
            id: 1,
            name: "yashk",
            email: "yashk@example.com"
        },
        {
            id: 2,
            name: "yashk2",
            email: "yashk2@example.com"
        }
    ]
    res.status(200).json(user)
})

app.use("*name", (req, res) => {
    res.sendFile("public/index.html", { root: __dirname })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})