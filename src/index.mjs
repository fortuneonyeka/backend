import express from "express";
import routes from "./routes/index.mjs";
import cookieParser from "cookie-parser";

const app = express()
app.use(express.json())
app.use(cookieParser("helloworld"))
app.use(routes)
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})



