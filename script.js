// NUTRITIONIX SEARCH
import './index.js';

// Function to make API call to Nutritionix.
async function retrieveNutritionixData(query) {
    const appId = "8cef4b7b"
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
    clearTable();


    let nutritionData = await retrieveNutritionixData(foodItem)
    const resultsTable = document.getElementById('nutritionResults');

    // Populates table with all the components of the food they entered.
    nutritionData.foods.forEach(item => {

        console.log(item.food_name, item.photo.thumb)

        let newRow = document.createElement('tr');
        let picture = document.createElement('td');
        let quantity = document.createElement('td');
        let foodName = document.createElement('td');
        let numCalories = document.createElement('td');

        picture.innerHTML = `<img src=${item.photo.thumb}></img>`;
        quantity.innerHTML = item.serving_qty + ' ' + item.serving_unit;
        foodName.innerHTML = item.food_name;
        numCalories.innerHTML = item.nf_calories;

        newRow.appendChild(picture);
        newRow.appendChild(quantity);
        newRow.appendChild(foodName);
        newRow.appendChild(numCalories);

        resultsTable.appendChild(newRow);
    });

    // Table is made visible. 
    document.getElementById('nutritionResults').style.display = 'block';
    
    return false;
}


/* Function to clear the rows in the table except the header if the user wants 
    to do multiple searches without reloading the page. */
    function clearTable() {
        const table = document.getElementById('nutritionResults');
    
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

//supabase calls for login/add user'
//needs to see if its in in the table, if not add, if so open up calendar+search page.
// Name of user at top, information from the username is uploaded to calendar





//Ignore this for now.
//on load, it will get the info from table and output it
//here is where we can store information to be displayed in cal/table
// document.addEventListener('DOMContentLoaded', async () => {
//     try {
//         const response = await fetch('/users');
//         const data = await response.json();

//         const usernamesList = document.getElementById('usernames');
//         const namesList = document.getElementById('names');
//         const passwordsList = document.getElementById('passwords');

//         data.usernames.forEach(username => {
//             const li = document.createElement('li');
//             li.textContent = username;
//             usernamesList.appendChild(li);
//         });

//         data.names.forEach(name => {
//             const li = document.createElement('li');
//             li.textContent = name;
//             namesList.appendChild(li);
//         });

//         data.passwords.forEach(password => {
//             const li = document.createElement('li');
//             li.textContent = password;
//             passwordsList.appendChild(li);
//         });

//     } catch (error) {
//         console.error('Error fetching user data:', error);
//     }
// });
