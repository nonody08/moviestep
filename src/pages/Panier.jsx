function Panier({ panier, onRetirer }) {
    if (panier.length === 0) {
      return (
        <main className="main">
          <p className="empty">Ton panier est vide 🛒</p>
        </main>
      );
    }
  
    return (
      <main className="main">
        <h2 className="section-titre">🛒 Mon panier ({panier.length} film{panier.length > 1 ? "s" : ""})</h2>
        <div className="panier-list">
          {panier.map((film) => (
            <div key={film.id} className="panier-item">
              {film.image ? (
                <img src={film.image} alt={film.titre} className="panier-image" />
              ) : (
                <div className="panier-no-image">🎬</div>
              )}
              <div className="panier-info">
                <h3>{film.titre}</h3>
                <p>🎥 {film.realisateur}</p>
                <p>📅 {film.annee}</p>
                <p>{"⭐".repeat(Number(film.note))}</p>
              </div>
              <button className="btn-retirer" onClick={() => onRetirer(film.id)}>
                ✖️ Retirer
              </button>
            </div>
          ))}
        </div>
      </main>
    );
  }
  
  export default Panier;