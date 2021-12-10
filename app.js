//make express to add route and transaction and select listen port,middleware ... also add swagger
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// routes header setting
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

///routes..
const storesRoutes = require('./routes/stores')
const imagesRoutes = require('./routes/images')
const categoryRoutes = require('./routes/category')
const productsRoutes = require('./routes/product')

app.use(bodyParser.urlencoded({extended: true}))

app.use('/stores', storesRoutes)
app.use('/images', imagesRoutes)
app.use('/categories', categoryRoutes)
app.use('/products', productsRoutes)

//swagger config
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            version: "1.0.0",
            title: "Lezzoo e-commerce  API",
            description: "e-commerce API Information",
            contact: {
                name: "ibrahem ahmed"
            },
            servers: ["http://localhost:3300"]
        }
    },

    apis: ["app.js", './routes/stores.js', './routes/category.js', './routes/product.js', './routes/images.js']
};
//add swagger to app
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/apis", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.get('/', (req, res) => {

    res.send(`welcome to the API \n check this url for apis documentation http://localhost:3300/apis/`)
}) // root get request handler
app.get('*', (req, res) => {
    res.send("404 page not found")
}) // else get request handler

const port = process.env.PORT || 3300;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    console.log(`check this url for apis documentation http://localhost:3300/apis/`)
});