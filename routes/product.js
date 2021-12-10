const express = require('express')
const router = express.Router()
const connection = require('../databaseConnection')
const uploadImg = require("./muler_helper")

/**
 * @swagger
 * /products/:storeId/:catId/products/add:
 *  post:
 *    description: adding new item to a category of a store
 */
router.post('/:storeId/:catId/products/add', uploadImg.single('file'), (req, res) => {
    const storeId = req.params.storeId
    const catId = req.params.catId

    const name = req.body.name
    const price = req.body.price
    const description = req.body.description

    const img = 'http://' + req.get('host') + '/images/' + req.file.filename

    const query = "INSERT INTO `Product` (`Name`,`ImageUrl`, `Price`, `Description`, `CategoryId`,`StoreId`) VALUES ('" + name + "', '" + img + "', '" + price + "', '" + description + "', '" + catId + "', '" + storeId + "')"
    connection.query(query, (err, result) => {
        if (err) return res.status(404).json({message: err.message})
        if (result) return res.status(201).json({data: result})
        else return res.send('unknown error')
    })
})

/**
 * @swagger
 * /products/:storeId/:catId/itemInCat:
 *  get:
 *    description: get items in category and store
 */
router.get('/:storeId/:catId/itemInCat', (req, res) => {
    const storeId = req.params.storeId
    const catId = req.params.catId
    const query = "SELECT * FROM `Product` WHERE (StoreId='" + storeId + "' AND CategoryId='" + catId + "')  ORDER BY Id DESC "

    connection.query(query, (err, result) => {
        if (err) return res.status(404).json({message: err.message})
        if (result) return res.status(201).json({data: result})
        else return res.send('unknown error')
    })
})

/**
 * @swagger
 * /products/1/items?start=0&limit=2:
 *  get:
 *    description: get items by category; with pagination
 */
router.get('/:catId/items', (req, res) => {
    const catId = req.params.catId
    const limit = (req.query.limit)
    let start = (req.query.start)
    if (!start) start = 0
    if (limit && start >= 0) {
        const query = "SELECT productOb.Id, productOb.Name, productOb.ImageUrl, productOb.Price, productOb.Description, productOb.CategoryId, productOb.StoreId, storeOb.Name AS StoreName, storeOb.Owner AS StoreOwner, storeOb.OwnerPhone AS StoreOwnerPhone, storeOb.Address as StoreAddress, storeOb.LogoUrl as StoreLogoUrl, categoryOb.Name AS CategoryName, categoryOb.ImageUrl AS CategoryImageUrl FROM Product AS productOb LEFT JOIN Category AS categoryOb ON productOb.CategoryId=categoryOb.Id LEFT JOIN Store AS storeOb ON productOb.StoreId=storeOb.Id ORDER BY Id DESC " + ` WHERE productOb.CategoryId=${catId}` + ` LIMIT ${limit}  OFFSET ${start}`;
        // const query = "SELECT * FROM `Product` WHERE (CategoryId='" + catId + "')"+ `LIMIT ${limit}  OFFSET ${start}`
        const queryCount = 'SELECT COUNT(*) FROM `Product`'
        connection.query(queryCount, (err, resl) => {
            if (err) return res.status(404).json({message: err.message})
            if (resl) {
                const numOfAllProduct = resl[0]['COUNT(*)']
                connection.query(query, (err, result) => {
                    if (err) return res.status(404).json({message: err.message})
                    if (result) return res.status(201).json({data: result, count: numOfAllProduct})
                    else return res.send('unknown error')
                })
            } else return res.send('unknown error')
        })
    } else {
        const query = 'SELECT * FROM `Product`'

        connection.query(query, (err, result) => {
            if (err) return res.status(404).json({message: err.message})
            if (result) return res.status(201).json({data: result})
            else return res.send('unknown error')
        })
    }


})
/**
 * @swagger
 * /products:
 *  get:
 *    description: get all items in all store. with pagination..
 */

router.get('/paginate', (req, res) => {
    const limit = (req.query.limit)
    let start = (req.query.start)
    if (!start) start = 0
    if (limit && start >= 0) {
        const query = "SELECT productOb.Id, productOb.Name, productOb.ImageUrl, productOb.Price, productOb.Description, productOb.CategoryId, productOb.StoreId, storeOb.Name AS StoreName, storeOb.Owner AS StoreOwner, storeOb.OwnerPhone AS StoreOwnerPhone, storeOb.Address as StoreAddress, storeOb.LogoUrl as StoreLogoUrl, categoryOb.Name AS CategoryName, categoryOb.ImageUrl AS CategoryImageUrl FROM Product AS productOb LEFT JOIN Category AS categoryOb ON productOb.CategoryId=categoryOb.Id LEFT JOIN Store AS storeOb ON productOb.StoreId=storeOb.Id ORDER BY Id DESC \n"
            + ` LIMIT ${limit}  OFFSET ${start}`;
        const queryCount = 'SELECT COUNT(*) FROM `Product`'
        connection.query(queryCount, (err, resl) => {
            if (err) return res.status(404).json({message: err.message})
            if (resl) {
                const numOfAllProduct = resl[0]['COUNT(*)']
                connection.query(query, (err, result) => {
                    if (err) return res.status(404).json({message: err.message})
                    if (result) return res.status(201).json({data: result, count: numOfAllProduct})
                    else return res.send('unknown error')
                })
            } else return res.send('unknown error')
        })
    } else {
        const query = 'SELECT * FROM `Product`'

        connection.query(query, (err, result) => {
            if (err) return res.status(404).json({message: err.message})
            if (result) return res.status(201).json({data: result})
            else return res.send('unknown error')
        })
    }


})


module.exports = router;