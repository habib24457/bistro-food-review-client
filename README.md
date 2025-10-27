# How to run the react app ?

!!Note: Make sure your BistroFoodReview.Api is already running locally on the endpoint: http://localhost:5175/api.

-And make sure you have seeded the database with initial seeding. Because to start testing, you need the MealOptions in the database already.

- In case your BistroFoodReview.Api is running in a different port. go to the api.js file, where endpoints are exported for all the frontend components.

Step 1: Clone the repository.

• Navigate to the project folder:
cd bistro-food-review-client.

Step 2: Install dependencies
npm install

Step 3: Start the development server
• Run:
npm start.
The app should open automatically in your browser at http://localhost:3000.
If it doesn’t, manually open your browser and go to http://localhost:3000.

---

# How to test the frontend?

-If there are meals saved for today's date. You will see the meals by matching with the meal option in the table. If there is not meal added to the database, you will have the option to add meal.

1. Edit Meal Name:

   -This will call the api endpoint:

   ```json
   `http://localhost:5175/api/meal/editName/${id}`,
         { editedMealName }
   ```

   Note: I have exported the api endpoints from one single js file, so that it can be updated easily from one place for the whole project. But in case, the edit meal name endpoint fails due to mismatched api endpoint name. Please, go to ->

   i. Open ModalWithInput.jsx

   ii. remove line: 22-24 which takes the endpoint from api.js.

   iii. and uncomment line: 18-22, here the endpoint is hard coded.

   (Note: Same api mismatch can happen with current user. If it happens, please check: DailyMenu.jsx, Remove line: 67. And uncomment: 64-66)

2. How to rate a meal?

- To rate a meal, you must be registered user to the database as current user.

- Once you registerd to the database, your current user id, and name is stored in the browser's local storage as well.

- Click on the star button if you want to rate a meal.

- You can choose 1-5, ony numeric only. If you choose otherwise, no problem there are validation for that.

- One user can only, rate a meal once a day. So for testing purpose, if you want to rate the same meal again, you have to register as a new user.

- You can register as a new user by clicking the 'Add new user' button. This will remove the current user from local storage, but the information (current user and the ratings) will remain saved in the db. And it will allow you to register as a new user, so that you can rate the meals again for testing.

3. How to check the top meal?

-On the navigation bar, by clicking the Top-Meals button

- Top Meal table will show the top ranked meal based on average star ratings.

- This table will not only show today's meals but also all the meals available in the DB.

- React router is used for redirecting to the TopMeals component.

# Future area of improvements:

- Use Redux or another state management library for global state instead of passing props.
- Implement TypeScript to reduce runtime errors.
- Improve responsive CSS for different screen sizes.
