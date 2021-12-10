const express = require('express')
const router = express.Router()
const fs = require('fs');
const sharp = require('sharp')
const path = require('path');


//http://localhost:3300/images/file-1622817816280.webp
/**
 * @swagger
 * /images:
 *  get:
 *    description: get image with any width,and height  /images/fileName.webp?height=1000&width=100
 */
router.get('/:fileName', async (req, res, next) => {
    res.setHeader('Content-Type', 'image/webp')
    let result
    if (req.query.width && req.query.height) {
        result = sharp().resize({
            height: Number(req.query.height),
            width: Number(req.query.width)
        }).webp({lossless: true, quality: 77, alphaQuality: 80, force: false});

    } else if (!req.query.width && req.query.height) {
        result = sharp().resize({height: Number(req.query.height)}).webp({
            lossless: true,
            quality: 77,
            alphaQuality: 80,
            force: false
        });
    } else if (req.query.width && !req.query.height) {
        result = sharp().resize({width: Number(req.query.width)}).webp({
            lossless: true,
            quality: 77,
            alphaQuality: 80,
            force: false
        });
    } else {
        result = sharp().resize(500).webp({lossless: true, quality: 77, alphaQuality: 80, force: false});

    }

    //upload resize into image
    fs.createReadStream(path.join('images', req.params.fileName)).on('error', function (err) {
        return res.status(401).json({message: err})
    })
        .pipe(result).pipe(res)
})

module.exports = router