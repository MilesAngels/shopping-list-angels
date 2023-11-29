/* SHOPPING LIST PROJECT SPECS
*  - Add items to list using a small form
*  - Remove items from list by clicking the "x" button
*  - Clear all items with "clear" button
*  - Filter items by typing in the filter field
*  - Add localStorage to persist items
*  - Click on an item to put int0o "edit mode" and add to form
*  - Update item
*/

// Global Variables
const form = document.getElementById('item-input-form');
const userInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const itemFilter = document.getElementById('filter');
const itemClear = document.getElementById('clear-display');

/* Main Functions */
// Add items function
let addItem = (event) => {
    event.preventDefault();

    // We can only get the accurate value after the user hits the add button
    const newItem = userInput.value;

    // Validate input to make sure the user cannot submit an empty entry
    if (newItem === '') {
        alert('Please add an item.');
        return;
    }

    // Create list item and add class/es needed
    const li = document.createElement('li');
    li.classList.add('item');

    // Append the value from newItem to list item
    li.appendChild(document.createTextNode(newItem));

    // Create removeButton via the createButton function pass the class/es needed and append it to the list item
    const removeButton = createButton('remove-item-btn');
    li.appendChild(removeButton);

    // Append the list item to the ul called itemList
    itemList.appendChild(li);

    // Check if there are items are being displayed.
    checkUI();

    // Reset Form after appending new item to ul
    form.reset();
}

// Remove items function
let removeItem = (event) => {

    // Check if the element we are targeting has a parent element with a class called remove-item-btn
    if (event.target.parentElement.classList.contains('remove-item-btn')) {
        if (confirm('Are you sure that you want to delete the item/s?')) {
            // If true, remove the entire list item
            event.target.parentElement.parentElement.remove();
            checkUI();
        }
    }
}



// Clear all displayed items
let clearItems = () => {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }
    
    checkUI();
}

// Check if there are displayed items in the DOM
let checkUI = () => {
    const displayedItems = itemList.querySelectorAll('li');

    // Check whether there are items currently being displayed or not
    if (displayedItems.length === 0) {
        // If there are no items displayed then, set clear button and filter style to display: none;
        itemClear.style.display = 'none';
        itemFilter.style.display = 'none';
    }
    else {
        // If false, set clear all button and filter to display block
        itemClear.style.display = 'block';
        itemFilter.style.display = 'block';
    }
}


/* Helper functions */
// Create each remove button and return the remove button to be appended to the list item
let createButton = (btnClass) => {

    // Create button element
    const removeButton = document.createElement('button');

    // Add class/es to button
    removeButton.className = btnClass;

    // Create the 'x' icon via the createIcon function and pass the class/es needed
    const icon = createIcon('fa-solid fa-xmark');

    // Append the icon to the removeButton
    removeButton.appendChild(icon);
    return removeButton;
}

// Create each icon then return icon to be appended to remove button
let createIcon = (iconClasses) => {

    // Create icon element 
    const icon = document.createElement('i');

    // Add icon class/es
    icon.className = iconClasses;
    return icon;
}

// Event Listers
form.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
itemClear.addEventListener('click', clearItems);

checkUI();