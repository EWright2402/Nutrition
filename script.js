// NUTRITIONIX SEARCH

// Function to make API call to Nutritionix.
async function retrieveNutritionixData(query) {
    const appId = "8cef4b7b";
    const appKey = "0beac0be800a5023af2c26d5491f0248";

    const response = await fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
        method: 'POST',
        headers: {
            'x-app-id': appId,
            'x-app-key': appKey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "query": query
        })
    });

    return await response.json();
}

// Function to search for foods and populate table with food items.
async function searchNutritionix() {
    let foodItem = document.getElementById('foodItem').value;

    // Prevent function from running if the search bar is empty.
    if (!foodItem) {
        return false;
    }

    // Clears any previous search.
    clearTable('nutritionResults');

    let nutritionData = await retrieveNutritionixData(foodItem);
    const resultsTable = document.getElementById('nutritionResults');

    // Populates table with all the components of the food they entered.
    nutritionData.foods.forEach(item => {
        console.log(item.food_name, item.photo.thumb);

        let newRow = document.createElement('tr');
        let picture = document.createElement('td');
        let quantity = document.createElement('td');
        let foodName = document.createElement('td');
        let numCalories = document.createElement('td');

        picture.innerHTML = `<img src=${item.photo.thumb} alt="Food Image">`;
        quantity.innerHTML = item.serving_qty + ' ' + item.serving_unit;
        foodName.innerHTML = item.food_name;
        numCalories.innerHTML = item.nf_calories;

        newRow.appendChild(picture);
        newRow.appendChild(quantity);
        newRow.appendChild(foodName);
        newRow.appendChild(numCalories);

        resultsTable.appendChild(newRow);
    });

    // Table and additional buttons are made visible. 
    document.getElementById('nutritionResults').style.display = 'block';
    document.getElementById('dateInput').style.display = 'block';
    document.getElementById('addButton').style.display = 'block';
    return false;
}

/* Function to clear the rows in the table except the header if the user wants 
    to do multiple searches without reloading the page. */
function clearTable(tableId) {
    const table = document.getElementById(tableId);
    for (let i = table.rows.length - 1; i > 0; i--) {
        table.deleteRow(i);
    }
}

// Function to initialize Typeahead.js to autofill search results in a drop down menu format.
function searchTypeahead() {
    var foodItems = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        // Fetch autofill suggestions from Nutritionix API.
        remote: {
            url: 'https://trackapi.nutritionix.com/v2/search/instant',
            prepare: function (query, settings) {
                settings.url += '?query=' + query;
                settings.headers = {
                    'x-app-id': '8cef4b7b',
                    'x-app-key': '0beac0be800a5023af2c26d5491f0248',
                    'Content-Type': 'application/json'
                };
                return settings;
            },
            transform: function (response) {
                // Transforms the response to pull food items.
                return response.common.map(function (item) {
                    return item.food_name;
                });
            }
        }
    });

    foodItems.initialize();

    $('#foodItem').typeahead({
        hint: false,
        highlight: true,
        minLength: 1
    }, {
        name: 'foodItems',
        source: foodItems.ttAdapter()
    });
}

// Call the function to initialize Typeahead.
$(document).ready(function () {
    searchTypeahead();
});

// FullCalendar integration
document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        events: [],
        eventClick: function (info) {
            // Display food information when an event is clicked
            var foodDetails = info.event.extendedProps.foodDetails;

            // Clear the existing table rows except for the header
            clearTable('eventDetails');

            // Populate the table with the food details
            var table = document.getElementById('eventDetails');
            table.style.display = 'table';
            foodDetails.forEach(function (detail) {
                var row = table.insertRow();
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                var cell5 = row.insertCell(4);
                cell1.innerHTML = `<img src="${detail.imageURL}" alt="Food Image" style="max-width: 100px; max-height: 100px;">`;
                cell2.innerHTML = detail.quantity;
                cell3.innerHTML = detail.foodName;
                cell4.innerHTML = detail.calories;

                // Create a button element for removing the row
                var removeButton = document.createElement('button');
                removeButton.textContent = 'Remove';
                removeButton.addEventListener('click', function () {
                    // Remove the row when the button is clicked
                    table.deleteRow(row.rowIndex);
                    if (table.rows.length === 1) {
                        info.event.remove();
                        table.style.display = 'none';
                    }
                });

                // Append the button to the cell
                cell5.appendChild(removeButton);
            });
        }
    });

    calendar.render();

    window.addFoodItem = function (food, date, foodDetails) {
        if (food && date) {
            calendar.addEvent({
                title: food,
                start: date,
                foodDetails: foodDetails,
                allDay: true
            });
        } else {
            alert('Please enter both a food item and a date.');
        }
    };
});

// Function to add the selected food to the calendar
async function addSelectedFoodToCalendar() {
    let foodItem = document.getElementById('foodItem').value;
    let dateInput = document.getElementById('dateInput').value;
    // Retrieve food details from the search results table, including the image URL
    let foodDetails = [];
    let nutritionTable = document.getElementById('nutritionResults');
    let rows = nutritionTable.getElementsByTagName('tr');
    for (let i = 1; i < rows.length; i++) { // Start from 1 to skip header row
        let cells = rows[i].getElementsByTagName('td');
        let quantity = cells[1].textContent;
        let foodName = cells[2].textContent;
        let calories = cells[3].textContent;
        let imageURL = cells[0].querySelector('img').src; // Extract image URL
        foodDetails.push({ quantity, foodName, calories, imageURL }); // Include imageURL in foodDetails
    }

    // Add the selected food to the calendar
    await addEntry(document.getElementById("userProfile").innerHTML, foodDetails[0], dateInput);
    //addFoodItem(foodItem, dateInput, foodDetails);
    return false;
}
document.addEventListener('DOMContentLoaded', function() {
    // This code will run after the DOM has fully loaded
    const contactForm = document.getElementById("prof");
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); 
            logon();  // Call the logon function when the form is submitted
        });
    } else {
        console.error(' ID "prof" not found.');
    }
});
