import express from "express";

const app = express()
const PORT = process.env.PORT || 3000


const mockUser =[
    {userName:"Fortune",Pod:"Developer", id:1},
    {userName:"Val",Pod:"App Service", id:2}, 
    {userName:"Bose",Pod:"Developer", id:3},
]


const mockProducts =[
    {nameame:"Mango",Price:"200", id:1},
    {nameame:"Banana",Price:"700", id:2}, 
    {nameame:"Apples",Price:"1000", id:3},
]

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})


app.get("/", (req, res) => {
    try {
        if (res.status(200)) {
          return  res.status(200).send("Hello World")
        }
    } catch (error) {
        console.log(error);
    }
})


app.get("/api/users", (req, res) => {
    try {
        if (res.status(200)) {
          return  res.status(200).send(mockUser)
        }
    } catch (error) {
        console.log(error);
    }
})


app.get("/api/users/:id", (req, res) => {
 
    const parsedId = parseInt(req.params.id)
    if (isNaN(parsedId)) return res.status(400).send({message: `Bad request: ${req.params.id} is not a valid ID`})

    const findUser = mockUser.find((user) => user.id === parsedId);
    if (!findUser) return res.status(404).send({message: 'This user does not exists'})

    return res.status(200).send(findUser)
})


app.get("/api/products", (req, res) => {
    try {
        if (!res.status(200)) {
         return res.send("Error fetching api")
        }
        return  res.status(200).send(mockProducts)
    } catch (error) {
        console.log(error);
    }
})


app.get("/api/products/:id", (req, res) => {
    const parsedId = parseInt(req.params.id)
    if(isNaN(parsedId)) return res.status(400).send({message: `Bad request: ${req.params.id} is not a valid ID`})

    const findProduct = mockProducts.find((product) => product.id === parsedId)
    if(!findProduct) return res.status(404).send({message: `This product does not exist`})

    return res.status(200).send(findProduct)
})