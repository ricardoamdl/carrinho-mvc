export default class StoreView {
    constructor() {
        this.productsContainer = document.getElementById('products-container');
        this.cartItemsContainer = document.getElementById('cart-items');
        this.cartCountElement = document.getElementById('cart-count');
        this.cartTotalElement = document.getElementById('cart-total');
    }

    renderProducts(products) {
        this.productsContainer.innerHTML = '';

        products.forEach(product => {

            const productCard = document.createElement('div');
            productCard.className = 'product-card';

            const hasStock = product.stock > 0;
            const buttonDisabled = !hasStock ? 'disabled' : '';
            const stockClass = hasStock ? 'stock-available' : 'stock-unavailable';
            const stockText = hasStock ? `${product.stock} em estoque` : 'Fora de estoque';

            productCard.innerHTML = `
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <div class="product-price">R$ ${product.price.toFixed(2)}</div>
                    <div class="product-stock">
                        <span class="${stockClass}">${stockText}</span>
                    </div>
                </div>
                <button 
                    class="add-to-cart-btn" 
                    data-product-id="${product.id}"
                    ${buttonDisabled}
                >
                    Adicionar ao Carrinho
                </button>
            `;
            this.productsContainer.appendChild(productCard);
        });
    }

    renderCart(cartItems, total) {
        this.cartItemsContainer.innerHTML = '';
        if (cartItems.length === 0) {
            this.cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <div class="empty-cart-icon">🛒</div>
                    <p>Seu carrinho está vazio</p>
                </div>
            `;
        } else {
            cartItems.forEach((item, index) => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';

                cartItem.innerHTML = `
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">R$ ${item.price.toFixed(2)}</div>
                    </div>
                    <div class="cart-item-actions">
                        <span class="cart-item-quantity">1x</span>
                        <button class="remove-btn" data-index="${index}">🗑️</button>
                    </div>
                `;

                this.cartItemsContainer.appendChild(cartItem);
            });
        }

        this.cartCountElement.textContent = cartItems.length;
        this.cartTotalElement.textContent = `R$ ${total.toFixed(2)}`;
    }
    bindAddProductToCart(handler) {
        this.productsContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('add-to-cart-btn')) {
                const productId = event.target.dataset.productId;

                handler(productId);
            }
        });
    }

    bindRemoveFromCart(handler) {
        this.cartItemsContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('remove-btn')) {
                const index = event.target.dataset.index;

                handler(index);
            }
        });
    }

    showNotification(message, type = 'success') {

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        document.body.appendChild(notification);
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}
