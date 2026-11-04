
function RecipeDetails({ recipe, isFavorite, onToggleFavorite, onClose }) {
  if (!recipe) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <section
        className="recipe-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="close-button"
          onClick={onClose}
          aria-label="Close recipe"
        >
          ×
        </button>

        <img
          className="detail-image"
          src={recipe.image}
          alt={recipe.name}
        />

        <div className="detail-content">
          <span className="eyebrow">{recipe.category} · {recipe.difficulty}</span>
          <h2 id="detail-title">{recipe.name}</h2>
          <p className="detail-description">{recipe.description}</p>

          <div className="detail-stats">
            <span>◷ {recipe.time} minutes</span>
            <span>♧ Serves {recipe.servings}</span>
          </div>

          <button
            className="detail-favorite-button"
            onClick={() => onToggleFavorite(recipe.id)}
          >
            {isFavorite ? "♥ Remove from Favorites" : "♡ Add to Favorites"}
          </button>

          <h3>Ingredients</h3>
          <ul className="ingredients-list">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={`${recipe.id}-ingredient-${index}`}>{ingredient}</li>
            ))}
          </ul>

          <h3>Instructions</h3>
          <ol className="instructions-list">
            {recipe.instructions.map((instruction, index) => (
              <li key={`${recipe.id}-step-${index}`}>
                <span className="step-number">{index + 1}</span>
                <span>{instruction}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}

export default RecipeDetails;
