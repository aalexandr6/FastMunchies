var cartItems = [];

// Function to add an item to the cart
function addToCart(item) {
    cartItems.push(item);
    alert(item + ' added to cart.');
}

// Function to checkout and display the cart items
function checkout() {
    var cartItemsElement = document.getElementById('cart-items');
    cartItemsElement.innerHTML = '';

    if (cartItems.length === 0) {
        cartItemsElement.innerHTML = '<li>Your cart is empty.</li>';
    } else {
        for (var i = 0; i < cartItems.length; i++) {
            var listItem = document.createElement('li');
            listItem.textContent = cartItems[i];
            cartItemsElement.appendChild(listItem);
        }
    }
}