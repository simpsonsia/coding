
function RecipeCard({ recipe, isFavorite, onToggleFavorite, onViewDetails }) {
  return (
    <article className="recipe-card">
      <div className="recipe-image-wrap">
        <img
          className="recipe-image"
          src={recipe.image}
          alt={recipe.name}
          loading="lazy"
        />

        <button
          className={`heart-button ${isFavorite ? "favorited" : ""}`}
          onClick={() => onToggleFavorite(recipe.id)}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          aria-pressed={isFavorite}
        >
          {isFavorite ? "♥" : "♡"}
        </button>

        <span className="category-badge">{recipe.category}</span>
      </div>

      <div className="recipe-card-content">
        <div className="recipe-meta">
          <span>◷ {recipe.time} min</span>
          <span>{recipe.difficulty}</span>
        </div>

        <h3>{recipe.name}</h3>
        <p>{recipe.description}</p>

        <button
          className="view-recipe-button"
          onClick={() => onViewDetails(recipe)}
        >
          View Recipe <span>→</span>
        </button>
      </div>
    </article>
  );
}

export default RecipeCard;
