// NUTRITIONIX SEARCH

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