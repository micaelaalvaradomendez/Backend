const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 8080;
app.use(express.json());
// Products routes
app.post('/api/products', (req, res) => {
    const { title, description, code, price, stock, category, thumbnails } = req.body;
    if (!title || !description || !code || !price || !stock || !category) {
    return res.status(400).json({ error: 'All fields are required except thumbnails' });}
    const products = getProductsFromFile();
    const existingProduct = products.find(product => product.code === code);
    if (existingProduct) { return res.status(400).json({ error: 'Product with this code already exists' });}
    const newProduct = { id: generateProductId(products), title, description, code, price,
        status: true, stock, category, thumbnails: thumbnails || [] };
    products.push(newProduct);
    saveProductsToFile(products);
    res.status(201).json({ message: 'Product added successfully', product: newProduct });});

app.get('/api/products/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const product = getProductById(productId);
    if (product) { res.json(product);} else { res.status(404).json({ error: 'Product not found' });}});

app.get('/api/products', (req, res) => {
    const limit = parseInt(req.query.limit) || undefined;
    const products = getProductsFromFile();
    if (limit) {res.json(products.slice(0, limit));} else {res.json(products);}});

app.delete('/api/products/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const products = getProductsFromFile();
    const updatedProducts = products.filter(product => product.id !== productId);
    saveProductsToFile(updatedProducts);
    res.status(200).json({ message: 'Product deleted successfully' });});

// Cart routes
app.post('/api/carts/:cid/product/:pid', (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
    const products = getProductsFromFile();
    const cart = { products: [] };
    const productToAdd = products.find(product => product.id === productId);
    if (!productToAdd) {return res.status(404).json({ error: 'Product not found' });}
    res.status(200).json({ message: 'Product added to cart successfully' });});

function getProductsFromFile() {
    try { const data = fs.readFileSync('products.json', 'utf8'); 
    return JSON.parse(data);} catch (error) {return [];}}

function saveProductsToFile(products) {fs.writeFileSync('products.json', JSON.stringify(products, null, 2), 'utf8');}

function getProductById(id) {
    const products = getProductsFromFile();
    return products.find(product => product.id === id);}

function generateProductId(products) { return products.length > 0 ? Math.max(...products.map(product => product.id)) + 1 : 1;}

app.listen(PORT, () => {console.log(`Server running on port ${PORT}`);});
