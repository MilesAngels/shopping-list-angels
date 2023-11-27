const form = document.getElementById('item-input-form');
const newItem = document.getElementById('item-input');
const ul = document.getElementById('item-list');

function displayItems() {
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach(item => addItemToDOM(item));
}

// Add new Item function
function addNewItem(event) {
    event.preventDefault();
    
    // Validate if newItem is not empty
    if(newItem.value === '') {
        alert('Please add new item');
        return;
    }

    //Create new list item
    addItemToDOM(newItem.value);

    addItemToStorage(newItem.value);
    
    form.reset();

}

function addItemToDOM(item) {
    const li = document.createElement('li');
    li.className = "item"; // Add class item to list-item
    const removeButton = document.createElement('button'); // Create an icon element
    removeButton.classList.add("remove-btn", "fa-solid", "fa-xmark");

    li.appendChild(document.createTextNode(item));
    li.appendChild(removeButton);
    ul.appendChild(li);
}

function onclickItem(event) {
    if (event.target.classList.contains('remove-btn')) { 
        removeItem(event.target.parentNode);
    }
}

// Remove item on list
function removeItem(item) {
    if(confirm('Are you sure?')) {
        // Remove item from DOM
        item.remove();

        //Remove item from storage
        removeItemFromStorage(item.textContent);
    }
}

function removeItemFromStorage(item) {
    let itemsFromStorage = getItemsFromStorage();

    //Filter out items to removed
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

    //Reset to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function addItemToStorage (item) {
    const itemsFromStorage = getItemsFromStorage(); 
    
    // Add items to array
    itemsFromStorage.push(item);

    //Convert to JSON string and set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
    let itemsFromStorage;
    // Check if local storage is empty
    // If true, set it to an empty array
    if(localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    }
    //If false, parse items from local storage to save it in itemsFromStorage as an array
    else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    return itemsFromStorage;
}

//Initialize App
function init() {
    // Add new Item on Submit
    form.addEventListener('submit', addNewItem);

    // Remove Item when clicking X (close button)
    ul.addEventListener('click', onclickItem);

    // Display items to DOM from local storage
    document.addEventListener('DOMContentLoaded', displayItems)
}

init();