// NUTRITIONIX SEARCH

// Function to make API call
async function retrieveNutritionixData(query) {
    let appId = "8cef4b7b"
    let appKey = "0beac0be800a5023af2c26d5491f0248";
    return fetch(`https://trackapi.nutritionix.com/v2/search/instant?query=${query}`, {
        method: 'GET',
        headers: {
            'x-app-id': appId,
            'x-app-key': appKey,
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json());

}


async function searchNutritionix() {
    
    let foodItem = document.getElementById('foodItem').value; 
    
    let nutritionData = await retrieveNutritionixData(foodItem)
    let foodName = nutritionData.common[0].food_name;

    console.log("Searching a food gets a list of brands that match it, and a list of common foods: ", nutritionData)
    console.log("For now I picked and displayed just the first item of the common food: ", nutritionData.common[0])

    document.getElementById('nutritionResults').innerHTML = "Food Name: " + foodName;
}

