# Nutrition
377 Final Project

## Top
1. BiteBalance

2. By using data on nutrition labels, the website is designed to help people keep track of their calories. Our project will allow people to enter the name of a food item they ate and provide the nutrition facts. Then allow them to track the nutrition items to a calendar. The website consists of four pages that include the Home page, the Calendar page where the user can track their calories, the About page that gives a little information about the website creators and why we created it, and the Help section for users who need help with navigating the website. 

3. Our target browsers are Chrome, Edge, Firefox, and Safari on PC devices. 

4. [Developer Manual](doc:linking-to-pages###Developer_Manual)

## Bottom

### Developer Manual

**Installation Guide**

*Before installing the application, make sure you have the following software installed on your device:*

[Node.js](https://nodejs.org/en)
[npm](https://www.npmjs.com/)

*Clone the Repository:*
```
git clone https://github.com/yourusername/yourrepository.git
cd yourrepository
```

*Install the Dependencies:*
```
npm install
```

*Set Up API Necessities:
```
PORT=3000
NUTRITIONIX_APP_ID=your_nutritionix_app_id 
NUTRITIONIX_APP_KEY=your_nutritionix_app_key
```

*Run the Application:*
```
npm start
```

**How to Run the Application on a Server**

*Deploy to Vercel*

*Install Vercel:*
```
npm install -g vercel
```

*Login to Vercel:*
```
vercel login
```

*Deploy to the Application:*
```
vercel
```

*Set API Variables on Vercel:*
```
NUTRITIONIX_APP_ID
NUTRITIONIX_APP_KEY
```

**How to Run Tests**

*Make sure you have a testing framework installed such as:*

[Mocha](https://mochajs.org/)
[Jest](https://jestjs.io/)

*Run the tests by this command:*
```
npm test
```

**API Endpoints**

*GET: Gets a list of food items*
```
   {
       "id": "food1",
       "name": "Apple",
       "calories": 52
   },
   {
       "id": "food2",
       "name": "Orange",
       "calories": 45
   }
```

*POST: Adds a new food item*
```
{
   "name": "Carrot",
   "calories": 41
}
```

*PATCH: Updates a already existing food item*

*Make sure to use the request parameter ‘id’: to update the food item*
```
{
   "name": "Updated Carrot",
   "calories": 45
}
```
**Known Bugs and Future Development**

*Known Bugs*
1. The 'remove items' feature doesn’t change the name of the included meal on the calendar.

*Future Development*
1. Add a user login.
2. Save user login information.
3. Improve the UI/UX design of the website.
4. Create optimization and accomodation for mobile devices.
5. Implment a data visualization for the nutritional breakdown.
	

