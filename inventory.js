// Initialize inventory
let inventory = JSON.parse(localStorage.getItem('inventory')) || [];

// Function to add an item
function addItem(name, quantity) {
    let existing = inventory.find(function(item) {
        return item.name === name;
    });

    if (existing) {
        existing.quantity += quantity;
    } else {
        inventory.push({ name: name, quantity: quantity });
    }

    localStorage.setItem('inventory', JSON.stringify(inventory));
    displayInventory();
}

// Function to remove a certain amount of an item
function removeItem(name, quantity) {
    let existing = inventory.find(function(item) {
        return item.name === name;
    });

    if (existing) {
        if (existing.quantity > quantity) {
            existing.quantity -= quantity;
        } else {
            // Remove the item if quantity becomes 0 or less
            inventory = inventory.filter(function(item) {
                return item.name !== name;
            });
        }
    }

    localStorage.setItem('inventory', JSON.stringify(inventory));
    displayInventory();
}

// Function to display the inventory
function displayInventory() {
    let tableBody = document.getElementById('table_body');
    tableBody.innerHTML = '';

    for (let i = 0; i < inventory.length; i++) {
        let item = inventory[i];
        let row = '<tr>' +
            '<td>' + item.name + '</td>' +
            '<td>' + item.quantity + '</td>' +
            '<td><button onclick="removeItem(\'' + item.name + '\', 1)">Remove 1</button>' +
            '<button onclick="removeItem(\'' + item.name + '\', 5)">Remove 5</button>' +
            '<button onclick="removeItem(\'' + item.name + '\', 10)">Remove 10</button></td>' +
            '</tr>';
        tableBody.innerHTML += row;
    }
}

// Attach event listeners
window.addEventListener('load', displayInventory);

document.getElementById('itemform').addEventListener('submit', function(e) {
    e.preventDefault();
    let name = document.getElementById('item_name').value;
    let quantity = Number(document.getElementById('item_quantity').value);
    let removeQuantity = Number(document.getElementById('remove_quantity').value);

    if (removeQuantity > 0) {
        removeItem(name, removeQuantity);
    } else {
        addItem(name, quantity);
    }

    this.reset();
});