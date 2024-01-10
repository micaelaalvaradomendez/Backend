const fs = require('fs');

class ProductManager { 
    constructor(filePath) { this.path = filePath; }
    addProduct(product) {
        const products = this.getProductsFromFile();
        product.id = this.generateId(products);
        products.push(product);
        this.saveProductsToFile(products);
    }
    getProducts() { return this.getProductsFromFile(); }
    getProductById(id) {
        const products = this.getProductsFromFile();
        return products.find(product => product.id === id);
    }
    updateProduct(id, updatedProduct) {
        const products = this.getProductsFromFile();
        const index = products.findIndex(product => product.id === id);
        if (index !== -1) {
            updatedProduct.id = id;
            products[index] = updatedProduct;
            this.saveProductsToFile(products);
        }
    }
    deleteProduct(id) {
        const products = this.getProductsFromFile();
        const updatedProducts = products.filter(product => product.id !== id);
        this.saveProductsToFile(updatedProducts);
    }
    generateId(products) { 
        return products.length > 0 ? Math.max(...products.map(product => product.id)) + 1 : 1;
    }
    getProductsFromFile() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            return JSON.parse(data);
        } 
        catch (error) { return []; }
    }
    saveProductsToFile(products) {
        fs.writeFileSync(this.path, JSON.stringify(products, null, 2), 'utf8');
    }
}
const productManager = new ProductManager('products.json');
productManager.addProduct({
    title: 'producto prueba',
    description:'Este es un producto prueba',
    price:200,
    thumbnail:'Sin imagen',
    code:'abc123',
    stock:25,
});    
const allProducts = productManager.getProducts();
console.log(allProducts);
const productToUpdate = productManager.getProductById(1);
if (productToUpdate) {
    productToUpdate.price = 120;
    productManager.updateProduct(1, productToUpdate);
}

[
    {"id": 1, "title": "Producto 1",
    "description": "Descripción del Producto 1",
    "price": 100,
    "thumbnail": "imagen1.jpg",
    "code": "P1", "stock": 50 },
    {"id": 2, "title": "Producto 2",
    "description": "Descripción del Producto 2",
    "price": 150,
    "thumbnail": "imagen2.jpg",
    "code": "P2", "stock": 30 },
    {"id": 3, "title": "Producto 3",
    "description": "Descripción del Producto 3",
    "price": 200,
    "thumbnail": "imagen3.jpg",
    "code": "P3", "stock": 20},
    {"id": 4, "title": "Producto 4",
    "description": "Descripción del Producto 4",
    "price": 120,
    "thumbnail": "imagen4.jpg",
    "code": "P4", "stock": 40},
    { "id": 5, "title": "Producto 5",
    "description": "Descripción del Producto 5",
    "price": 180,
    "thumbnail": "imagen5.jpg",
    "code": "P5", "stock": 25 },
    { "id": 6, "title": "Producto 6",
    "description": "Descripción del Producto 6",
    "price": 90,
    "thumbnail": "imagen6.jpg",
    "code": "P6", "stock": 60 },
    { "id": 7, "title": "Producto 7",
    "description": "Descripción del Producto 7",
    "price": 210,
    "thumbnail": "imagen7.jpg",
    "code": "P7", "stock": 35 },
    {"id": 8, "title": "Producto 8",
    "description": "Descripción del Producto 8",
    "price": 13,
    "thumbnail": "imagen8.jpg",
    "code": "P8","stock": 45 },
    { "id": 9, "title": "Producto 9",
    "description": "Descripción del Producto 9",
    "price": 240,
    "thumbnail": "imagen9.jpg",
    "code": "P9", "stock": 15 },
    { "id": 10, "title": "Producto 10",
    "description": "Descripción del Producto 10",
    "price": 170,
    "thumbnail": "imagen10.jpg",
    "code": "P10", "stock": 55 }
]
 