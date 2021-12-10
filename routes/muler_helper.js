//middleware  for upload file.
const multer = require('multer')


//select storage and file name;
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + ".webp")
    }
});

let uploadImg = multer({storage: storage});

module.exports = uploadImg;