const express = require('express')
const router = express.Router()
const connection = require('../databaseConnection')
const uploadImg = require("./muler_helper")


// adding new store
/**
 * @swagger
 * /addStore:
 *  post:
 *    description:this route use to add stores you must add image and  name, owner, ownerPhone, address
 */
router.post('/addStore', uploadImg.single('file'), (req, res) => {
    const name = req.body.name
    const owner = req.body.owner
    const ownerPhone = req.body.ownerPhone
    const address = req.body.address
    const img = 'http://' + req.get('host') + '/images/' + req.file.filename
    const query = "INSERT INTO `Store` (`Name`, `Owner`, `OwnerPhone`, `Address`, `LogoUrl`) VALUES ('" + name + "', '" + owner + "', '" + ownerPhone + "', '" + address + "', '" + img + "')"
    connection.query(query, (err, result) => {
        if (err) return res.status(404).json({message: err.message})
        if (result) return res.status(201).json({
            objectData: {
                Id: result.insertId,
                Name: name,
                Owner: owner,
                OwnerPhone: ownerPhone,
                address: address,
                LogoUrl: img
            },
            data: result
        })
        else return res.send('unknown error')
    })
})


/**
 * @swagger
 * /stores/getStores:
 *  get:
 *    description: if you are get data without any query the api get all data to ,  get data with pagination  stores/getStores?start=0&limit=2
 */

router.get('/getStores', (req, res) => {
    const limit = (req.query.limit)
    let start = (req.query.start)
    if (!start) start = 0
    if (limit && start >= 0) {
        const query = "SELECT * FROM `Store`" + ` LIMIT ${limit}  OFFSET ${start}`
        const query2 = 'SELECT COUNT(*) FROM `Store`'
        connection.query(query2, (err, resu) => {
            if (err) return res.status(404).json({message: err.message})
            if (resu) {
                const numOfAllStores = resu[0]['COUNT(*)']
                connection.query(query, (err, result) => {
                    if (err) return res.status(404).json({message: err.message})
                    if (result) return res.status(201).json({data: result, count: numOfAllStores})
                    else return res.send('unknown error')
                })
            } else return res.send('unknown error')
        })
    } else {
        const query = 'SELECT * FROM `Store`'
        connection.query(query, (err, result) => {
            if (err) return res.status(404).json({message: err.message})
            if (result) return res.status(201).json({data: result})
            else return res.send('unknown error')
        })
    }


})


module.exports = router;