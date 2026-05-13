function Header({ page, setPage, panierCount }) {
  return (
    <header className="header">
      <h1 onClick={() => setPage("catalogue")}>🎬 CinéTracker</h1>
      <nav>
        <button
          className={page === "catalogue" ? "active" : ""}
          onClick={() => setPage("catalogue")}
        >
          Catalogue
        </button>
        <button
          className={page === "panier" ? "active" : ""}
          onClick={() => setPage("panier")}
        >
          🛒 Panier
          {panierCount > 0 && (
            <span className="badge">{panierCount}</span>
          )}
        </button>
      </nav>
    </header>
  );
}

export default Header;