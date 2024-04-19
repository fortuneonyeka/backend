import express from "express";
import routes from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";

const app = express()
app.use(express.json())
app.use(cookieParser("helloworld"))
app.use(session({
    secret: "anson the dev",
    saveUninitialized: false,
    resave:false,
    cookie: {
        maxAge: 60000 * 60
    }
}))
app.use(routes)
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})



