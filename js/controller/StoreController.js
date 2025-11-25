export default class StoreController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    init() {

        const products = this.model.getProducts();

        this.view.renderProducts(products);

        this.updateCart();

        this.view.bindAddProductToCart(this.handleAddToCart);

        this.view.bindRemoveFromCart(this.handleRemoveFromCart);
    }

    handleAddToCart = (productId) => {

        const id = parseInt(productId);

        const success = this.model.addProductToCart(id);

        if (success) {

            const products = this.model.getProducts();
            this.view.renderProducts(products);

            this.updateCart();

            const product = this.model.getProductById(id);
            this.view.showNotification(
                `✓ ${product.name} adicionado ao carrinho!`,
                'success'
            );
        } else {
            this.view.showNotification(
                '✗ Não foi possível adicionar o produto. Verifique o estoque.',
                'error'
            );
        }
    }

    handleRemoveFromCart = (index) => {
        const idx = parseInt(index);

        const cartItems = this.model.getCartItems();
        const removedItem = cartItems[idx];

        const success = this.model.removeFromCart(idx);

        if (success) {
            const products = this.model.getProducts();
            this.view.renderProducts(products);
            this.updateCart();
            this.view.showNotification(
                `✓ ${removedItem.name} removido do carrinho!`,
                'success'
            );
        } else {
            this.view.showNotification(
                '✗ Não foi possível remover o item do carrinho.',
                'error'
            );
        }
    }

    updateCart() {
        const cartItems = this.model.getCartItems();
        const total = this.model.getCartTotal();

        this.view.renderCart(cartItems, total);
    }
}
