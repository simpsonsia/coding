
import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import RecipeList from "./components/RecipeList.jsx";
import FavoritesList from "./components/FavoritesList.jsx";
import recipes from "./data/recipes.js";

function App() {
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState([]);

  function toggleFavorites() {
    setShowFavorites((previous) => !previous);
  }

  function addToFavorites(recipe) {
    setFavorites((previous) => {
      const alreadyFavorite = previous.some(
        (favorite) => favorite.id === recipe.id
      );

      if (alreadyFavorite) {
        return previous;
      }

      return [...previous, recipe];
    });
  }

  function removeFromFavorites(recipeId) {
    setFavorites((previous) =>
      previous.filter((recipe) => recipe.id !== recipeId)
    );
  }

  return (
    <div className="App">
      <Navbar
        favoritesCount={favorites.length}
        showFavorites={showFavorites}
        onToggleFavorites={toggleFavorites}
        onHome={() => setShowFavorites(false)}
      />

      {showFavorites ? (
        <FavoritesList
          favorites={favorites}
          onRemoveFavorite={removeFromFavorites}
        />
      ) : (
        <RecipeList
          recipes={recipes}
          favorites={favorites}
          onAddFavorite={addToFavorites}
          onRemoveFavorite={removeFromFavorites}
        />
      )}
    </div>
  );
}

export default App;
