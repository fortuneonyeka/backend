export const mockUsers = [
    { username: "fortune", pod: "developer", id: 1 },
    { username: "val", pod: "app service", id: 2 },
    { username: "bose", pod: "developer", id: 3 },
    { username: "mathew", pod: "developer", id: 4 },
]



export const mockProducts = [
    { name: "Mango", Price: "200", id: 1 },
    { name: "Banana", Price: "700", id: 2 },
    { name: "Apples", Price: "1000", id: 3 },
]


export const resolveIndexByProductId = (req, res, next) => {
    const { params: { id } } = req;

    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return res.sendStatus(400)

    const findProductIndex = mockProducts.findIndex((user) => user.id === parsedId)

    if (findProductIndex === -1) return res.sendStatus(404)
    req.findProductIndex = findProductIndex;
    next()
}


export const resolveIndexByUserId = (req, res, next) => {
    const { params: { id } } = req;

    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return res.sendStatus(400)

    const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId)

    if (findUserIndex === -1) return res.sendStatus(404)
    req.findUserIndex = findUserIndex;
    next()
}
