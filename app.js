global.config = require(process.env.NODE_ENV === "production" ? "./config-prod.json" : "./config-dev.json");

const express = require('express');
const cors = require('cors');
const fileUpload = require("express-fileupload");

const auth_controller = require("./controller-layer/auth-controller");
const product_controller = require("./controller-layer/product-controller");
const category_controller = require("./controller-layer/category-controller");
const cart_controller = require("./controller-layer/cart-controller");
const orders_controller = require("./controller-layer/orders-controller");
const info_controller = require('./controller-layer/info-controller');

//1.Create rest api server
const server = express();
server.use(fileUpload());
server.use(cors());

//2. Configure REQUEST parser to use JSON (parser that automaticly parses Json into JS object)
server.use(express.json());

////////////////////////////////
const path = require('path');

  server.use(express.static('public'));
  
//   server.get('*',(req,res)=>{
//     res.sendFile(path.join(__dirname,'public/index.html'));
// })

server.get('/auth',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/index.html'));
})
server.get('/products/*',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/index.html'));
})
server.get('/shopping_cart',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/index.html'));
})
server.get('/orders',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/index.html'));
})
server.get('/info',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/index.html'));
})

////////////////////////////////

server.use((err, request, response, next) => {
    response.status(err.status).send(err.message);
});


server.use("/api/auth", auth_controller);
server.use("/api/products", product_controller);
server.use("/api/categories", category_controller);
server.use("/api/shoppingCart", cart_controller);
server.use("/api/orders", orders_controller);
server.use("/api/info", info_controller);


server.use("*", (request, response) => {
    response.status(404).send("Route not found");
});


//4. Open server for client request using a specific port
const port = process.env.PORT || 3030
server.listen(port, () => console.log(`Server is listening on port:${port}...`));
// server.listen(3030, () => console.log('Server is listening...'));
