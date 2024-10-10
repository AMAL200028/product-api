const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); 

const app = express();
const port = 3000;


app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, 'public')));

let products = [
    { id: 1, carName: 'Charger', manufacturer: 'Dodge', year: 2020 },
    { id: 2, carName: 'Civic', manufacturer: 'Honda', year: 2019 },
    { id: 3, carName: 'Mustang', manufacturer: 'Ford', year: 2021 },
];


app.get('/products', (req, res) => {
    let filteredProducts = products;

    const { manufacturer, year, carName } = req.query;

    if (manufacturer) {
        filteredProducts = filteredProducts.filter(
            (product) => product.manufacturer.toLowerCase() === manufacturer.toLowerCase()
        );
    }

    if (year) {
        filteredProducts = filteredProducts.filter(
            (product) => product.year == year
        );
    }

    if (carName) {
        filteredProducts = filteredProducts.filter(
            (product) => product.carName.toLowerCase() === carName.toLowerCase()
        );
    }

    res.json(filteredProducts);
});


app.get('/products/:id', (req, res) => {
    const { id } = req.params;
    const product = products.find((p) => p.id == id);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});


app.post('/products', (req, res) => {
    const newProduct = {
        id: products.length + 1, 
        carName: req.body.carName,
        manufacturer: req.body.manufacturer,
        year: req.body.year,
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
});


app.put('/products/:id', (req, res) => {
    const { id } = req.params;
    const productIndex = products.findIndex((p) => p.id == id);

    if (productIndex !== -1) {
        products[productIndex] = {
            id: Number(id), 
            carName: req.body.carName,
            manufacturer: req.body.manufacturer,
            year: req.body.year,
        };
        res.json(products[productIndex]);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
