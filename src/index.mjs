import express from "express";
import { query, validationResult, body, matchedData } from "express-validator"

const app = express()
app.use(express.json())
const PORT = process.env.PORT || 3000



const resolveIndexByUserId = (req, res, next) => {
    const { params: { id } } = req;

    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return res.sendStatus(400)

    const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId)

    if (findUserIndex === -1) return res.sendStatus(404)
    req.findUserIndex = findUserIndex;
    next()
}


const resolveIndexByProductId = (req, res, next) => {
    const { params: { id } } = req;

    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return res.sendStatus(400)

    const findProductIndex = mockProducts.findIndex((user) => user.id === parsedId)

    if (findProductIndex === -1) return res.sendStatus(404)
    req.findProductIndex = findProductIndex;
    next()
}


const mockUsers = [
    { username: "fortune", pod: "developer", id: 1 },
    { username: "val", pod: "app service", id: 2 },
    { username: "bose", pod: "developer", id: 3 },
    { username: "mathew", pod: "developer", id: 4 },
]



const mockProducts = [
    { name: "Mango", Price: "200", id: 1 },
    { name: "Banana", Price: "700", id: 2 },
    { name: "Apples", Price: "1000", id: 3 },
]


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



app.get("/api/users", query("filter").isString().notEmpty().withMessage("Must not be empty").isLength({ min: 3, max: 15 }).withMessage("Must be at least 3-10 characters"), (req, res) => {
    const result = validationResult(req)
    console.log(result);
    const { query: { filter, value } } = req;

    // When filter and value are defined, filter mockUsers
    // query params
    if (filter && value) {
        const filteredUsers = mockUsers.filter((user) => user[filter].includes(value));
        return res.send(filteredUsers);
    }

    return res.send(mockUsers);
});


app.get("/api/users/:id", resolveIndexByUserId, (req, res) => {

    const { findUserIndex } = req
    const findUser = mockUsers[findUserIndex]
    if (!findUser) return res.status(404).send({ message: 'This user does not exists' })

    return res.status(200).send(findUser)
})




app.post("/api/users", [body("username").isString().notEmpty().withMessage("username cannot be empty").isLength({ min: 5, max: 32 }).withMessage("username must be 5-32 characters").isLowercase().withMessage("username must be in lowercase"), 
body("pod").isString().notEmpty().withMessage("pod must not be empty").isLength({min:3, max:15}).withMessage("pod must be 3 - 15 characters").isLowercase().withMessage("pod must be in lowercase"),], (req, res) => {
    const result = validationResult(req)

    if(!result.isEmpty()) return res.status(400).send({errors: result.array()})

    const data = matchedData(req)
    
    const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...data }
    mockUsers.push(newUser)
    return res.status(201).send(newUser);
})



app.put("/api/users/:id",[body("username").isString().notEmpty().withMessage("username cannot be empty").isLength({ min: 5, max: 32 }).withMessage("username must be 5-32 characters").isLowercase().withMessage("username must be in lowercase"), 
body("pod").isString().notEmpty().withMessage("pod must not be empty").isLength({min:3, max:15}).withMessage("pod must be 3 - 15 characters").isLowercase().withMessage("pod must be in lowercase"),], resolveIndexByUserId, (req, res) => {
    const { findUserIndex } = req;
    const result = validationResult(req)
    if(!result.isEmpty()) return res.status(400).send({errors: result.array()})

    const data = matchedData(req)

    mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...data }
    return res.sendStatus(200)
})


app.patch("/api/users/:id", resolveIndexByUserId, (req, res) => {
    const { body, findUserIndex } = req;
    mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body }
    return res.sendStatus(200)
})
app.delete("/api/users/:id", resolveIndexByUserId, (req, res) => {
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



app.get("/api/products", (req, res) => {
    try {
        if (!res.status(200)) {
            return res.send("Error fetching api")
        }
        return res.status(200).send(mockProducts)
    } catch (error) {
        console.log(error);
    }
})



app.get("/api/products/:id", resolveIndexByProductId, (req, res) => {
    const { findProductIndex } = req
    const findProduct = mockProducts[findProductIndex]

    if (!findProduct) return res.status(404).send({ message: `This product does not exist` })

    return res.status(200).send(findProduct)
})