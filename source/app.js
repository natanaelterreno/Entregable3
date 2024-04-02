const express = require('express');
const ProductManager = require('./ProductManager.js');

const app = express();
const productManager = new ProductManager('./Products.json');

app.get('/products', async (req, res) => {    
    const { limit } = req.query;
    const products = await productManager.getProducts();

    if(limit){
        res.send(products.slice(0, parseInt(limit)));        
    }
    else {
        res.send(products);
    }    
});

app.get('/products/:pid', async (req, res) => {    
    const { pid } = req.params;

    res.send(await productManager.getProductById(parseInt(pid)));
});

app.listen('8080', err => {
    console.log('Escuchando en el puerto 8080');
})