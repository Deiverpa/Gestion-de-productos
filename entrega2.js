const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.loadProducts();
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    const product = {
      id: this.generateId(),
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products.push(product);
    this.saveProducts();
  }

  deleteProduct(id) {
    this.products = this.products.filter((product) => product.id !== id);
    this.saveProducts();
  }

  updateProduct(id, updatedProduct) {
    const index = this.products.findIndex((product) => product.id === id);

    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updatedProduct };
      this.saveProducts();
    }
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    return this.products.find((product) => product.id === id);
  }

  generateId() {
    let maxId = 0;
    for (const product of this.products) {
      if (product.id > maxId) {
        maxId = product.id;
      }
    }
    return maxId + 1;
  }

  saveProducts() {
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), "utf8");
  }

  loadProducts() {
    if (fs.existsSync(this.path)) {
      const data = fs.readFileSync(this.path, "utf8");
      this.products = JSON.parse(data);
    }
  }
}

// Ejemplo de uso:
const manager = new ProductManager("productos.json");

manager.addProduct("Producto 1", "Descripción 1", 10, "imagen1.jpg", "001", 20);
manager.addProduct("Producto 2", "Descripción 2", 20, "imagen2.jpg", "002", 15);

const productById = manager.getProductById(1);
console.log(productById);

manager.deleteProduct(1);

const updatedProducts = manager.getProducts();
console.log(updatedProducts);
