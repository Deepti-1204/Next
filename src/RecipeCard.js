import React, { useState } from 'react';
import './App.css'; // Import your custom CSS styles
import './RecipeCard.css'

const MAX_INGREDIENTS = 4; // Limit for visible ingredients

const RecipeCard = ({ recipe, addToFavorites }) => {
  const [isExpanded, setIsExpanded] = useState(false); // Track expansion state

  const handleAddToFavorites = () => {
    addToFavorites(recipe); // Call the parent function to add to favorites
  };

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev); // Toggle expansion
  };

  const visibleIngredients = isExpanded
    ? recipe.ingredientLines
    : recipe.ingredientLines.slice(0, MAX_INGREDIENTS); // Display a limited number of ingredients by default

  return (
    <div className="recipe-card"> {/* Apply CSS class */}
      <img
        className="recipe-card-img" // Apply CSS class
        src={recipe.image}
        alt={recipe.label}
      />
      <div className="recipe-details"> {/* Apply CSS class */}
        <h1 className="recipe-title">{recipe.label}</h1> {/* Apply CSS class */}

        <div className="recipe-ingredients"> {/* Apply CSS class */}
          <span className="ingredient-header">Ingredients:</span> {/* Apply CSS class */}
          <ul className="ingredient-list"> {/* Apply CSS class */}
            {visibleIngredients.map((ingredient, index) => (
              <li key={index} className="ingredient-item"> {/* Apply CSS class */}
                {ingredient}
              </li>
            ))}
          </ul>
          {recipe.ingredientLines.length > MAX_INGREDIENTS && (
            <a href="#" onClick={toggleExpanded} className="toggle-link"> {/* Apply CSS class */}
              {isExpanded ? 'View Less' : 'View More'}
            </a>
          )}
        </div>
        <br/>
        <div className="recipe-info"> {/* Apply CSS class */}
          <span>Calories: {recipe.calories.toFixed(2)}<br/></span>
          <span>Protein: {recipe.totalNutrients.PROCNT.quantity.toFixed(2)} {recipe.totalNutrients.PROCNT.unit}<br/></span>
          <span>Fat: {recipe.totalNutrients.FAT.quantity.toFixed(2)} {recipe.totalNutrients.FAT.unit}<br/></span>
        </div>

        <br/>
        <div className="recipe-buttons"> {/* Apply CSS class */}
          <button onClick={handleAddToFavorites} className="search-button"> {/* Apply CSS class */}
            Add To ❤️
          </button>
          <span>&nbsp;</span> {/* Spacing */}
          <br /> {/* New line */}
          <br />
          <a href={recipe.url} target="_blank" rel="noopener noreferrer" className="view-more-link"> {/* Apply CSS class */}
            View Recipe
          </a>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
