import express  from "express";

const app = express()

const PORT = 4000

app.use(express.json())

app.get("/", (req,res) => {
    console.log("snfkjn")
    console.log("jdkshfksj")
    console.log("jerfijse")
})

app.listen(PORT, () => {
    console.log(`connected to port ${PORT}`)
})