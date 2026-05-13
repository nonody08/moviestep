function Header({ page, setPage, panierCount, user, invite, isAdmin, onDeconnexion }) {
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
        {!invite && (
          <button
            className={page === "panier" ? "active" : ""}
            onClick={() => setPage("panier")}
          >
            🛒 Panier
            {panierCount > 0 && <span className="badge">{panierCount}</span>}
          </button>
        )}
        {isAdmin && (
          <button
            className={page === "admin" ? "active" : ""}
            onClick={() => setPage("admin")}
          >
            🔐 Admin
          </button>
        )}
      </nav>
      <div className="user-info">
        {invite ? (
          <span className="user-email">👤 Invité</span>
        ) : (
          <span className="user-email">👤 {user?.email}</span>
        )}
        <button className="btn-deconnexion" onClick={onDeconnexion}>
          Déconnexion
        </button>
      </div>
    </header>
  );
}

export default Header;