
import RecipeCard from "./RecipeCard.jsx";

function RecipeList({
  recipes,
  favorites,
  onAddFavorite,
  onRemoveFavorite,
}) {
  return (
    <main className="recipe-list">
      <h1>Discover Recipes</h1>
      <p>Find something delicious to make today.</p>

      <div className="recipe-grid">
        {recipes.map((recipe) => {
          const isFavorite = favorites.some(
            (favorite) => favorite.id === recipe.id
          );

          return (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              isFavorite={isFavorite}
              onAddFavorite={onAddFavorite}
              onRemoveFavorite={onRemoveFavorite}
            />
          );
        })}
      </div>
    </main>
  );
}

export default RecipeList;
