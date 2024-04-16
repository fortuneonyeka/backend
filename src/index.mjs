import express from "express";
import userRouter from "./routes/users.mjs"
import productRouter from "./routes/products.mjs"


const app = express()
app.use(express.json())
app.use(userRouter)
app.use(productRouter)
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})


app.get("/", (req, res) => {
    try {
        if (res.status(200)) {
            return res.status(200).send("Hello World")
        }
    } catch (error) {
        console.log(error);
    }
})

