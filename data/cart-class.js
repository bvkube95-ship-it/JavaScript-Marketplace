class Cart {
    cartItems;
    #localStorageKey;

    constructor(localStorageKey) {
      this.#localStorageKey = localStorageKey;
      this.loadFromStorage();
    }

    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
    }

    addToCart(productId, selectedValue, deliveryOptionId) {
      
      let matchingItem = this.cartItems
        .find((cartItem) => cartItem.productId === productId);

        if (matchingItem) {
          matchingItem.quantity += Number(selectedValue);
        } else {
          this.cartItems.push({
            productId: productId,
            quantity: Number(selectedValue),
            deliveryOptionId
          });
        }
        this.saveToStorage();
    }

    removeFromCart(productId) {
    const newCart = [];

    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });

    this.cartItems = newCart;

    this.saveToStorage();
    }

    updateProductQuantity(productId, newQuantity) {
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        cartItem.quantity = newQuantity;
      }
    });

    this.saveToStorage();
    }

    saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }

    updateDeliveryOption(productId, deliveryOptionId) {

    const matchingItem = this.cartItems.find((cartItem) => productId === cartItem.productId);

    if (!matchingItem) return; // защита от краша

    matchingItem.deliveryOptionId = deliveryOptionId;
    this.saveToStorage();
    }
  }

export const cart = new Cart('cart-oop');
export const businessCart = new Cart('cart-business');