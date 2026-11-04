
import RecipeCard from "./RecipeCard.jsx";

function FavoritesList({ favorites, onRemoveFavorite }) {
  return (
    <main className="recipe-list">
      <h1>Your Favorite Recipes ❤️</h1>
      <p>All the recipes you've saved in one place.</p>

      {favorites.length === 0 ? (
        <div className="empty-state">
          <h2>No favorites yet!</h2>
          <p>Browse your recipes and save some using the heart button.</p>
        </div>
      ) : (
        <div className="recipe-grid">
          {favorites.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              isFavorite={true}
              onRemoveFavorite={onRemoveFavorite}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default FavoritesList;
