import express from "express";

const app = express()
app.use(express.json())
const PORT = process.env.PORT || 3000


const mockUsers = [
    { username: "fortune", Pod: "developer", id: 1 },
    { username: "val", Pod: "app service", id: 2 },
    { username: "bose", Pod: "developer", id: 3 },
    { username: "mathew", Pod: "developer", id: 4 },
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



app.get("/api/users", (req, res) => {
    const { query: { filter, value } } = req;

    // When filter and value are defined, filter mockUsers
    // query params
    if (filter && value) {
        const filteredUsers = mockUsers.filter((user) => user[filter].includes(value));
        return res.send(filteredUsers);
    }

    return res.send(mockUsers);
});



app.post("/api/users", (req, res) => {
    const { body } = req
    const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body }
    mockUsers.push(newUser)
    return res.status(201).send(newUser);
})



app.put("/api/users/:id", (req, res) => {
    const { body, params: { id } } = req;

    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return res.sendStatus(400)

    const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId)

    if (findUserIndex === -1) return res.sendStatus(404)

    mockUsers[findUserIndex] = { id: parsedId, ...body }

    return res.sendStatus(200)
})


app.patch("/api/users/:id", (req, res) => {
    const { body, params: { id } } = req;

    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return res.sendStatus(400)

    const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId)

    if (findUserIndex === -1) return res.sendStatus(404)
    mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body}

        return res.sendStatus(200)
})

app.delete("/api/users/:id", (req, res) => {
    const {params:{id}} = req
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return res.sendStatus(400)
    const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId)
    if(findUserIndex === -1) return res.statusCode(404)
    mockUsers.splice(findUserIndex)

    return res.sendStatus(200)
})



app.get("/api/users/:id", (req, res) => {

    const parsedId = parseInt(req.params.id)
    if (isNaN(parsedId)) return res.status(400).send({ message: `Bad request: ${req.params.id} is not a valid ID` })

    const findUser = mockUsers.find((user) => user.id === parsedId);
    if (!findUser) return res.status(404).send({ message: 'This user does not exists' })

    return res.status(200).send(findUser)
})



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



app.get("/api/products/:id", (req, res) => {
    const parsedId = parseInt(req.params.id)
    if (isNaN(parsedId)) return res.status(400).send({ message: `Bad request: ${req.params.id} is not a valid ID` })

    const findProduct = mockProducts.find((product) => product.id === parsedId)
    if (!findProduct) return res.status(404).send({ message: `This product does not exist` })

    return res.status(200).send(findProduct)
})