import { Router } from "express";
import userRouter from "./users.mjs"
import productRouter from "./products.mjs"
import defaultRouter from "./default.mjs"


const router = Router()

router.use(defaultRouter)
router.use(userRouter)
router.use(productRouter)

export default router