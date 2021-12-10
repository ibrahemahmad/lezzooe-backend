const express = require('express')
const router = express.Router()
const connection = require('../databaseConnection')
const uploadImg = require("./muler_helper")

//d
/**
 * @swagger
 * /categories/:storeId/category/add:
 *  post:
 *    description: adding new category to a store
 */
router.post('/:storeId/category/add', uploadImg.single('file'), (req, res) => {
    const storeId = req.params.storeId
    const name = req.body.name
    const img = 'http://' + req.get('host') + '/images/' + req.file.filename
    const query = "INSERT INTO `Category` (`Name`,`ImageUrl`, `StoreId`) VALUES ('" + name + "', '" + img + "','" + storeId + "')"
    connection.query(query, (err, result) => {
        if (err) return res.status(404).json({message: err.message})

        if (result) {
            const query2 = "SELECT categoryOb.Id, categoryOb.Name, categoryOb.ImageUrl, categoryOb.StoreId,\n" +
                "\tstoreOb.Name AS StoreName, storeOb.Owner AS StoreOwner, storeOb.OwnerPhone AS StoreOwnerPhone, storeOb.Address as StoreAddress, storeOb.LogoUrl as StoreLogoUrl\n" +
                "  FROM Category as categoryOb\n" +
                "  LEFT JOIN Store as storeOb\n" +
                "  ON categoryOb.StoreId=storeOb.Id\n" +
                ` WHERE categoryOb.Id=${result?.insertId};`;

            connection.query(query2, (errTwo, resultTwo) => {
                return res.status(201).json({data: resultTwo})

            })
        } else return res.send('unknown error')
    })
})

//d
/**
 * @swagger
 * /categories/:storeId/categories:
 *  get:
 *    description: getting all categories of a single store
 */
router.get('/:storeId/categories', (req, res) => {
    const storeId = req.params.storeId
    const query = "SELECT * FROM `Category` WHERE (StoreId='" + storeId + "')"
    connection.query(query, (err, result) => {
        if (err) return res.status(404).json({message: err.message})
        if (result) return res.status(201).json({data: result})
        else return res.send('unknown error')
    })
})
/**
 * @swagger
 * /categories/categories:
 *  get:
 *    description: getting all categories
 */

router.get('/categories', (req, res) => {
    const query = "SELECT categoryOb.Id, categoryOb.Name, categoryOb.ImageUrl, categoryOb.StoreId,\n" +
        "\tstoreOb.Name AS StoreName, storeOb.Owner AS StoreOwner, storeOb.OwnerPhone AS StoreOwnerPhone, storeOb.Address as StoreAddress, storeOb.LogoUrl as StoreLogoUrl\n" +
        "  FROM Category as categoryOb\n" +
        "  LEFT JOIN Store as storeOb\n" +
        "  ON categoryOb.StoreId=storeOb.Id";
    connection.query(query, (err, result) => {
        if (err) return res.status(404).json({message: err.message})
        if (result) return res.status(201).json({data: result})
        else return res.send('unknown error')
    })
})


module.exports = router;