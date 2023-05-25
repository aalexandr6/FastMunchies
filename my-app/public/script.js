// Function to add an item to the cart
function addToCart(itemName) {
    // Get the cart items element
    const cartItems = document.getElementById('cart-items');

    // Create a new list item for the cart
    const listItem = document.createElement('li');
    listItem.textContent = itemName;

    // Append the new list item to the cart items
    cartItems.appendChild(listItem);
}

// Function to handle the checkout process
function checkout() {
    // Get the cart items
    const cartItems = document.getElementById('cart-items').children;

    // Display a confirmation message with the selected items
    let message = "You have selected:\n";
    for (let i = 0; i < cartItems.length; i++) {
        message += "- " + cartItems[i].textContent + "\n";
    }
    alert(message);

    // Clear the cart
    document.getElementById('cart-items').innerHTML = '';
}