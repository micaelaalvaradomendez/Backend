class ProductManager {
    constructor() { this.products = []; 
        this.productIdCounter = 1;}

    addProduct(title, description, price, thumbnail, code, stock) {
    
        if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.error("Todos los campos son obligatorios"); return; }

        const existingProduct = this.products.find(product => product.code === code);
    
        if (existingProduct) { console.error("Ya existe un producto con ese código"); return; }

        const newProduct = {
            id: this.productIdCounter,
            title,
            description,
            price,
            thumbnail,
            code,
            stock };

        this.products.push(newProduct);
        this.productIdCounter++;
        return newProduct;
    }

    getProducts() {return this.products;}

    getProductById(id) { const product = this.products.find(product => product.id === id);
    if (!product) {console.error("Producto no encontrado"); return null;}
    return product;}
}

const productManager = new ProductManager();

productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);

console.log(productManager.getProducts());
console.log(productManager.getProductById(1));
