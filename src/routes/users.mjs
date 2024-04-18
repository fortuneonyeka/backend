import { Router } from "express";
import {query, validationResult, checkSchema, body, matchedData} from "express-validator"
import { createValidationSchema} from "../utils/userValidationShemas.mjs"
import {mockUsers} from "../utils/constants.mjs"
import {resolveIndexByUserId} from "../utils/middleWares.mjs"


const router = Router()

router.get("/api/users", query("filter").isString().notEmpty().withMessage("Must not be empty").isLength({ min: 3, max: 15 }).withMessage("Must be at least 3-10 characters"), (req, res) => {
    const result = validationResult(req)
    const { query: { filter, value } } = req;

    // When filter and value are defined, filter mockUsers
    // query params
    if (filter && value) {
        const filteredUsers = mockUsers.filter((user) => user[filter].includes(value));
        return res.send(filteredUsers);
    }

    return res.send(mockUsers);
})



router.get("/api/users/:id", resolveIndexByUserId, (req, res) => {

    const { findUserIndex } = req
    const findUser = mockUsers[findUserIndex]
    if (!findUser) return res.status(404).send({ message: 'This user does not exists' })

    return res.status(200).send(findUser)
})



router.post("/api/users", checkSchema(createValidationSchema), (req, res) => {
    const result = validationResult(req)

    if(!result.isEmpty()) return res.status(400).send({errors: result.array()})

    const data = matchedData(req)
    
    const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...data }
    mockUsers.push(newUser)
    return res.status(201).send(newUser);
})


router.put("/api/users/:id",checkSchema(createValidationSchema), resolveIndexByUserId, (req, res) => {
    const { findUserIndex } = req;
    const result = validationResult(req)
    if(!result.isEmpty()) return res.status(400).send({errors: result.array()})

    const data = matchedData(req)

    mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...data }
    return res.sendStatus(200)
})


router.patch("/api/users/:id", resolveIndexByUserId, (req, res) => {
    const { body, findUserIndex } = req;
    mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body }
    return res.sendStatus(200)
})
router.delete("/api/users/:id", resolveIndexByUserId, (req, res) => {
    const { findUserIndex } = req;


    mockUsers.splice(findUserIndex, 1);

    // Update the indices of remaining users in the array
    mockUsers.forEach((user, index) => {
        if (index >= findUserIndex) {
            user.id = index + 1;
        }
    });

    // Respond with a success message
    return res.status(200).json({ message: 'User deleted successfully' });
});




export default router