class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct(title, description, price, thumbnail, id, stock) {
    const product = {
      title,
      description,
      price,
      thumbnail,
      id,
      stock,
    };

    this.products.push(product);
  }

  removeProductById(id) {
    this.products = this.products.filter((product) => product.id !== id);
  }

  getProducts() {
    return this.products;
  }
}

// Ejemplo de uso:
const manager = new ProductManager();

manager.addProduct("Producto 1", "Descripción 1", 10, "imagen1.jpg", "001", 20);
manager.addProduct("Producto 2", "Descripción 2", 20, "imagen2.jpg", "002", 15);

const products = manager.getProducts();
console.log(products);

manager.removeProductById("001");

const updatedProducts = manager.getProducts();
console.log(updatedProducts);
