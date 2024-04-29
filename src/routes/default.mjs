import { Router } from "express"
import session from "express-session";

const router = Router()


router.get("/", (req, res) => {
    req.session.visited = true;
    res.cookie("hello", "world", {maxAge:20000, signed: true})
    res.status(201).send({mesage:"Hello World"})

})
export default router