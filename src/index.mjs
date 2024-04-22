import express from "express";
import routes from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import { mockUsers } from "./utils/constants.mjs";

const app = express()
app.use(express.json())
app.use(cookieParser("helloworld"))
app.use(session({
    secret: "anson the dev",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000 * 60
    }
}))
app.use(routes)
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

app.post("/api/auth", (req, res) => {
    const { body: { username, password } } = req

    const findUser = mockUsers.find((user) => user.username === username)

    if (!findUser || findUser.password !== password) return res.status(401).send({ message: "Bad Credentioanls" })

    req.session.user = findUser;
    return res.status(200).send(findUser)

})

app.get("/api/auth/status", (req, res) => {
    req.sessionStore.get(req.sessionID, (err, session) => { console.log(session);})
    return req.session.user ? res.status(200).send(req.session.user) : res.status(401).send({ message: "Not Authenticated" })
})


