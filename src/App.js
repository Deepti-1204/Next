import React, { useEffect, useState } from 'react';
import RecipeCard from './RecipeCard';
import './App.css'; // Import your custom CSS styles

const App = () => {
  const APP_ID = '45f939c5';
  const APP_KEY = '812ec7a6fe832258d23504ae47096143';
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);

  // Fetch recipes based on the search query
  useEffect(() => {
    if (searchQuery) {
      fetchRecipes();
    }
  }, [searchQuery]);

  const fetchRecipes = async () => {
    try {
      const response = await fetch(
        `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      const data = await response.json();
      setRecipes(data.hits);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  // Function to add a recipe to favorites
  const addToFavorites = (recipe) => {
    if (!favorites.some((favorite) => favorite.label === recipe.label)) {
      setFavorites((prevFavorites) => [...prevFavorites, recipe]); // Update the favorites list
    }

    fetch('http://localhost:5001/addFav', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ favs: recipe }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Added successfully:', data);
      })
      .catch((error) => {
        console.error('Error adding to favorites:', error);
      });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchRecipes();
  };

  return (
    <div className="app-container"> {/* CSS class applied */}
      <header className="header"> {/* CSS class applied */}
        <h1 className="header-title">D's Recipe Searcher</h1> {/* CSS class applied */}
      </header>

      <div className="search-wrapper"> {/* CSS class applied */}
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input" // Apply CSS class
            placeholder="Search for recipes..."
          />
          <button type="submit" className="search-button">Search</button> {/* Apply CSS class */}
          
        </form>
      </div>

      <div className="recipe-grid"> {/* CSS class applied */}
        {recipes.map((item, index) => (
          <RecipeCard key={index} recipe={item.recipe} addToFavorites={addToFavorites} />
        ))}
      </div>

      {favorites.length > 0 && (
        <div className="favorites-section"> {/* CSS class applied */}
          <h2 align="center">My Favorites</h2>
          <div className="recipe-grid"> {/* CSS class applied */}
            {favorites.map((favorite, index) => (
              <RecipeCard key={index} recipe={favorite} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;