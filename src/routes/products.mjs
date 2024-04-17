import { Router } from "express";
import { mockProducts } from "../utils/constants.mjs";
import {query, validationResult, checkSchema, body, matchedData} from "express-validator"
import { resolveIndexByProductId } from "../utils/middleWares.mjs"
import { createValidationSchema } from "../utils/productsValidationSchema.mjs"


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




router.post("/api/products", checkSchema(createValidationSchema), (req, res) => {
    const result = validationResult(req)

    if(!result.isEmpty()) return res.status(400).send({errors: result.array()})

    const data = matchedData(req)
    
    const newProduct = { id: mockProducts[mockProducts.length - 1].id + 1, ...data }
    mockProducts.push(newProduct)
    return res.status(201).send(newProduct);
})


// router.put("/api/products/:id", resolveIndexByProductId, (req, res) => {

//     const { findProductIndex } = req
//     const findProduct = mockProducts[findProductIndex]
//     if (!findProduct) return res.status(404).send({ message: 'This product does not exists' })

//     return res.status(200).send(findProduct)
// })



router.put("/api/products/:id",checkSchema(createValidationSchema), resolveIndexByProductId, (req, res) => {
    const { findProductIndex } = req
    const result = validationResult(req)
    if(!result.isEmpty()) return res.status(400).send({errors: result.array()})

    const data = matchedData(req)

    mockProducts[ findProductIndex] = { id: mockProducts[ findProductIndex].id, ...data }
    return res.sendStatus(200)
})


router.patch("/api/products/:id", resolveIndexByProductId, (req, res) => {
    const { body, findProductIndex } = req;
    mockProducts[findProductIndex] = { ...mockProducts[findProductIndex], ...body }
    return res.sendStatus(200)
})


router.delete("/api/products/:id", resolveIndexByProductId, (req, res) => {
    const { findProductIndex } = req;


    mockProducts.splice(findProductIndex, 1);

    // Update the indices of remaining users in the array
    mockProducts.forEach((product, index) => {
        if (index >= findProductIndex) {
            product.id = index + 1;
        }
    });

    // Respond with a success message
    return res.status(200).json({ message: 'Product deleted successfully' });
});



export default router