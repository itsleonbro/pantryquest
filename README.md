# PantryQuest

PantryQuest is a React web app designed to help you discover recipes using ingredients you already have. Simply enter ingredients (separated by commas) to find matching recipes, or use predefined buttons to quickly browse popular cuisine and meal types.

## Features

- **Ingredient-Based Search:** Enter multiple ingredients separated by commas (e.g., "tomato, chicken, basil") to find recipes that use those items.
- **Quick Search by Cuisine:** Use the predefined buttons for one-click access to recipes by cuisine. Options include:

  - Japanese
  - Italian
  - American
  - Asian
  - European

- **Responsive Design:** PantryQuest is fully responsive and works on desktop, tablet, and mobile devices.

## Live Site

You can view the live version of PantryQuest by visiting the following link:  
[PantryQuest - Live Site](https://pantryquest.itsleon.dev)


## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/itsleonbro/pantryquest.git
   ```

2. Install dependancies

   ```bash
   cd pantryquest
   npm install
   ```

3. Create an .env file in the root directory

   ```bash
   VITE_API_KEY=YourApi
   ```

   ### Important:

   Never commit your .env file
   Keep your API key private
   Get your API key from Spoonacular's API Portal
   Free tier includes 150 requests per day

4. Start the development server
   ```bash
   npm run dev
   ```
   or if you use yarn
   ```bash
   yarn dev
   ```
   Your app should now be running on http://localhost:5173

## Technologies Used

- **React:** For building the user interface.
- **API Integration:** PantryQuest uses a third-party recipe API to fetch recipe data based on user inputs.

## License

This project is licensed under the MIT License. See the [LICENSE](https://opensource.org/licenses/MIT) file for details.
