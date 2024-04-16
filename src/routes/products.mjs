import { Router } from "express";
import { mockProducts } from "../utils/constants.mjs";
import { resolveIndexByProductId } from "../utils/constants.mjs"
import { createValidationSchema } from "../utils/validationShemas.mjs"


const router = Router()

router.get("/api/products", (req, res) => {
    try {
        if (!res.status(200)) {
            return res.send("Error fetching api")
        }
        return res.status(200).send(mockProducts)
    } catch (error) {
        console.log(error);
    }
})


router.get("/api/products/:id", resolveIndexByProductId, (req, res) => {
    const { findProductIndex } = req
    const findProduct = mockProducts[findProductIndex]

    if (!findProduct) return res.status(404).send({ message: `This product does not exist` })

    return res.status(200).send(findProduct)
})


export default router