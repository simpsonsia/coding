
function Navbar({ favoritesCount, showFavorites, onToggleFavorites, onHome }) {
  return (
    <header className="navbar">
      <button className="brand" onClick={onHome} aria-label="Go home">
        <span className="brand-icon">✳</span>
        <span>simply<span className="brand-accent">recipes</span></span>
      </button>

      <nav className="nav-actions">
        <button
          className={!showFavorites ? "nav-link active" : "nav-link"}
          onClick={onHome}
        >
          Explore
        </button>

        <button
          className={showFavorites ? "nav-link active" : "nav-link"}
          onClick={onToggleFavorites}
        >
          ♥ Favorites
          <span className="favorite-count">{favoritesCount}</span>
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
