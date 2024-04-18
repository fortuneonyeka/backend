import { mockProducts, mockUsers } from "./constants.mjs";


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
