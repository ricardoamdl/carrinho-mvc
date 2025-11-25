export default class StoreModel {
    constructor() {
        this.products = [
            {
                id: 1,
                name: 'iPhone XR',
                price: 1200,
                stock: 7
            },
            {
                id: 2,
                name: 'Headset Redragon Zeus PRO',
                price: 299,
                stock: 15
            },
            {
                id: 3,
                name: 'Monitor AOC 27POL, 144h',
                price: 959,
                stock: 12
            },
            {
                id: 4,
                name: 'Processador AMD Ryzen 5 5600X',
                price: 1349,
                stock: 10
            }
        ];

        this.cart = [];
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        return this.products.find(product => product.id === id);
    }
    addProductToCart(productId) {
        const productToAdd = this.getProductById(productId);

       
        if (productToAdd && productToAdd.stock > 0) {
            this.cart.push(productToAdd);

            productToAdd.stock--;
            return true;
        }
        return false;
    }

    getCartItems() {
        return this.cart;
    }

    getCartTotal() {
        return this.cart.reduce((total, item) => total + item.price, 0);
    }

    getCartCount() {
        return this.cart.length;
    }

    removeFromCart(index) {
        if (index >= 0 && index < this.cart.length) {
            const removedItem = this.cart[index];

            this.cart.splice(index, 1);

        
            removedItem.stock++;

            return true;
        }
        return false;
    }

    clearCart() {
    
        this.cart.forEach(item => {
            const originalProduct = this.getProductById(item.id);
            if (originalProduct) {
                originalProduct.stock++;
            }
        });
        this.cart = [];
    }
}
