// Access item-input value from form
let form = document.getElementById('item-input-form');
let addButton = document.getElementById('add-item-btn');
let newItem = document.getElementById('item-input');

// Create or Add New List Item when + button is clicked.
function addNewItem() {
    let ul = document.getElementById('item-list'); // Get ul to append list-items into it
    
    addButton.addEventListener('click', () => {
        let li = document.createElement('li'); // Create a new list-item
        let checkbox = document.createElement('input'); // Create a new input for the checkbox
        let text = document.createTextNode(newItem.value); // create new text node to get
        checkbox.type = 'checkbox'; // Set input type to checkbox
        li.setAttribute('class', 'item'); // set the list-item attribute to a class called: item
        li.append(checkbox); // Append the checkbox to the list-item
        li.append(text); // Append text node to list-item
        ul.append(li); // Append the list-item to the ul
        form.reset(); // Reset form immediately after list-item is appended
    });
    
}

// Remove Item when Checkbox is toggled

// Update Item

// Call addNewItem function 
addNewItem();