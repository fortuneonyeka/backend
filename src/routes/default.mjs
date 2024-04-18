import { Router } from "express"

const router = Router()


router.get("/", (req, res) => {
    
    res.cookie("hello", "world", {maxAge:20000, signed: true})
    res.status(201).send({mesage:"Hello World"})

})
export default router