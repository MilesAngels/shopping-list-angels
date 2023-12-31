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
let isEditMode = false;
const formBtn = form.querySelector('button');

/* Main Functions */

let displayItems = () => {
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach(item => addItemToDOM(item));
    checkUI();
}

// Add items function
let onAddItemSubmit = (event) => {
    event.preventDefault();

    // We can only get the accurate value after the user hits the add button
    const newItem = userInput.value;

    // Validate input to make sure the user cannot submit an empty entry
    if (newItem === '') {
        alert('Please add an item.');
        return;
    }

    // Check for edit mode
    if(isEditMode) {
       const itemToEdit = itemList.querySelector('.edit-mode');
       
       removeItemFromStorage(itemToEdit.textContent);
       itemToEdit.classList.remove('edit-mode');
       itemToEdit.remove();
       isEditMode = false;
    } else {
        if(checkIfItemExists(newItem)){
            alert('That items already exists!');
            // Reset Form after the alert message is shown
            form.reset();
            return;
        }
    }

    // Create item to DOM
    addItemToDOM(newItem);

    // Add item to local storage
    addItemToStorage(newItem);

    // Check if there are items are being displayed.
    checkUI();

    // Reset Form after appending new item to ul
    form.reset();
}

let addItemToDOM = (item) => {
    // Create list item and add class/es needed
    const li = document.createElement('li');
    li.classList.add('item');

    // Append the value from newItem to list item
    li.appendChild(document.createTextNode(item));

    // Create removeButton via the createButton function pass the class/es needed and append it to the list item
    const removeButton = createButton('remove-item-btn');
    li.appendChild(removeButton);

    // Append the list item to the ul called itemList
    itemList.appendChild(li);
}

let addItemToStorage = (item) => {
    const itemsFromStorage = getItemsFromStorage();

    // Add new item to array
    itemsFromStorage.push(item);

    // Convert to JSON string and set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

let getItemsFromStorage = () => {
    let itemsFromStorage;

    // Check if local storage is empty
    if(localStorage.getItem('items') === null) {
        // If local storage is empty, then set itemsFromStorage to an empty array
        itemsFromStorage = [];
    }
    else {
        // If local storage has items in it, then parse its content and get the items
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    return itemsFromStorage;
}

//
let onItemClick = (event) => {
    // Check if the element we are targeting has a parent element with a class called remove-item-btn
    if (event.target.parentElement.classList.contains('remove-item-btn')) {
        removeItem(event.target.parentElement.parentElement)
    }
    else {
        setItemToEdit(event.target);
    }
}

// Check 
let checkIfItemExists = (item) => {
    const itemsFromStorage = getItemsFromStorage();
    return itemsFromStorage.includes(item);
}

// Remove items function
let removeItem = (item) => {
    // Ask user if they wish to remove item
    if (confirm('Are you sure that you want to delete the item/s?')) {
        // If true, remove the entire list item
        item.remove();

        // Remove item from local storage
        removeItemFromStorage(item.textContent);

        // check the DOM if there are items displayed
        checkUI();
    }
}

let removeItemFromStorage = (item) => {
    let itemsFromStorage = getItemsFromStorage();

    // Filter out item to be removed from storage.
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

    // Re-set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

// Clear all displayed items
let clearItems = () => {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }

    // Clear from local storage
    localStorage.removeItem('items');

    // Check the DOM to reset the state of the DOM to not display 
    // the clear button and filter input
    checkUI();
}

// Edit items
let setItemToEdit = (item) => {

    isEditMode = true;

    // Iterate through the list items and remove the class edit mode to avoid multiple items going into edit mode
    itemList.querySelectorAll('li').forEach(i => i.classList.remove('edit-mode'));
    
    // Add class edit mode and update the add item button to have a pen icon instead of +
    item.classList.add('edit-mode');
    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    formBtn.style.backgroundColor = '#d4afb9';

    // Grab the value of the list item clicked that is in edit more
    userInput.value = item.textContent;
}

// Filter items based on user input filter
let filterItems = (event) => {
    // Get the user input filter and transform it to lowercase letters
    const filterText = event.target.value.toLowerCase();

    // Get each item list 
    const displayedItems = itemList.querySelectorAll('li');

    // Iterate through each item
    displayedItems.forEach(item => {

        // Get each list item's text
        const itemName = item.firstChild.textContent.toLowerCase();

        // Check if list item text and user input filter is equal to each other
        if (itemName.indexOf(filterText) != -1) {
            // If true, set display to flex
            item.style.display = 'flex';
        }
        else {
            // If false, set display to none
            item.style.display = 'none';
        }
    });
}

// Check if there are items displayed
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

    // Reset form button to add button
    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i>';
    formBtn.style.backgroundColor = "#9cadce";

    isEditMode = false;
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

// Initialize app

function init() {
    // Event Listers
    form.addEventListener('submit', onAddItemSubmit);
    itemList.addEventListener('click', onItemClick);
    itemClear.addEventListener('click', clearItems);
    itemFilter.addEventListener('input', filterItems);
    document.addEventListener('DOMContentLoaded', displayItems);

    checkUI();
}

init();