# PantryQuest

A web application for discovering recipes based on ingredients you already have in your pantry. Create and share your own recipes, or explore a community-driven collection of recipes created by other users on the platform.

## Features

- **Ingredient-Based Search:** Find recipes by entering multiple ingredients separated by commas
- **Cuisine Quick Search:** Browse recipes by cuisine type with predefined buttons for:
  - Japanese
  - Italian
  - American
  - Asian
  - European
- **User Authentication:** Register and login to access personalized features
- **Favorites System:** Save recipes you love for quick access later
- **My Recipes:** Create, edit, and manage your own personal recipes
- **Community Recipes:** Browse and view recipes created by other PantryQuest users
- **Responsive Design:** Works on desktop, tablet, and mobile devices

## Live Site

You can view the live version of PantryQuest at:  
[PantryQuest - Live Site](https://pantryquest.itsleon.dev)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/itsleonbro/pantryquest.git
   ```

2. Install frontend dependencies:

   ```bash
   cd pantryquest
   npm install
   ```

3. Set up frontend environment:
   Create a .env file in the root directory with:

   ```
   VITE_API_KEY=YourSpoonacularApiKey
   VITE_API_URL=http://localhost:5001
   ```

4. Install backend dependencies:

   ```bash
   cd backend
   npm install
   ```

5. Set up backend environment:
   Create a .env file in the backend directory with:

   ```
   MONGODB_URI=YourMongoDBConnectionString
   JWT_SECRET=YourSecretKey
   PORT=5001
   CORS_ORIGIN=http://localhost:5173
   ```

   ### Important:

   - Never commit your .env files
   - Keep your API keys private
   - Get your Spoonacular API key from their API Portal
   - Free tier includes 150 requests per day

## Running the Application

1. Start the backend server:

   ```bash
   cd backend
   npm start
   ```

2. Start the frontend development server:

   ```bash
   cd pantryquest
   npm run dev
   ```

3. Access the application at http://localhost:5173

## Technology Stack

- **Frontend:** React, React Router, Vite, CSS Modules, Axios
- **Backend:** Node.js, Express, MongoDB, JWT, bcrypt
- **API:** Spoonacular (150 requests/day free tier)

## License

This project is licensed under the MIT License. See the [LICENSE](https://opensource.org/licenses/MIT) file for details.
