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

// Functions
let addItem = (event) => {
    event.preventDefault();

    // We can only get the accurate value after the user hits the add button
    const newItem = userInput.value;

    // Validate input to make sure the user cannot submit an empty entry
    if (newItem === '') {
        alert('Please add an item.');
        return;
    }

    // Create list item
    const li = document.createElement('li');
    
    // Append the value from newItem to list item
    li.appendChild(document.createTextNode(newItem));

    // Create removeButton via the createButton function pass the class/es needed and append it to the list item
    const removeButton = createButton('remove-item-btn');
    li.appendChild(removeButton);

    // Append the list item to the ul called itemList
    itemList.appendChild(li);
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