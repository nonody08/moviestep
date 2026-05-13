import { useState } from "react";

function Catalogue({ films, panier, onAjouterAuPanier, invite, isAdmin }) {
  const [recherche, setRecherche] = useState("");
  const [filtreGenre, setFiltreGenre] = useState("tous");
  const [filmSelectionne, setFilmSelectionne] = useState(null);

  const filmsFiltres = films.filter((f) => {
    const matchRecherche = f.titre.toLowerCase().includes(recherche.toLowerCase());
    const matchGenre = filtreGenre === "tous" || f.genre === filtreGenre;
    return matchRecherche && matchGenre;
  });

  const dejaAuPanier = (id) => panier.find((f) => f.film_id === id);

  // Vue détail film
  if (filmSelectionne) {
    return (
      <div className="film-detail">
        <button className="btn-retour" onClick={() => setFilmSelectionne(null)}>
          ← Retour au catalogue
        </button>
        <div className="detail-wrapper">
          <div className="detail-image-wrapper">
            {filmSelectionne.image ? (
              <img src={filmSelectionne.image} alt={filmSelectionne.titre} className="detail-image" />
            ) : (
              <div className="card-no-image" style={{ height: "400px" }}>🎬</div>
            )}
          </div>
          <div className="detail-info">
            <h2 className="detail-titre">{filmSelectionne.titre}</h2>
            <div className="detail-meta">
              <span className="detail-genre">{filmSelectionne.genre}</span>
              <span className="detail-annee">📅 {filmSelectionne.annee}</span>
              <span className="detail-note">{"⭐".repeat(Number(filmSelectionne.note))}</span>
            </div>
            <p className="detail-realisateur">🎥 Réalisé par <strong>{filmSelectionne.realisateur}</strong></p>
            <p className="detail-synopsis">{filmSelectionne.synopsis}</p>
            {!invite && !isAdmin && (
              <button
                className={`btn-panier ${dejaAuPanier(filmSelectionne.id) ? "dejaDedans" : ""}`}
                onClick={() => onAjouterAuPanier(filmSelectionne)}
                disabled={dejaAuPanier(filmSelectionne.id)}
              >
                {dejaAuPanier(filmSelectionne.id) ? "✅ Dans le panier" : "🛒 Ajouter au panier"}
              </button>
            )}
            {invite && (
              <p className="invite-msg">Connecte-toi pour ajouter au panier !</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Vue catalogue
  return (
    <main className="main">
      <div className="filtres">
        <input
          className="search-input"
          type="text"
          placeholder="🔍 Rechercher un film..."
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
        />
        <select
          className="filtre-genre"
          value={filtreGenre}
          onChange={(e) => setFiltreGenre(e.target.value)}
        >
          <option value="tous">Tous les genres</option>
          <option value="action">💥 Action</option>
          <option value="comédie">😂 Comédie</option>
          <option value="horreur">👻 Horreur</option>
          <option value="romance">❤️ Romance</option>
          <option value="sci-fi">🚀 Sci-Fi</option>
          <option value="documentaire">🎥 Documentaire</option>
          <option value="thriller">🔪 Thriller</option>
        </select>
      </div>

      {filmsFiltres.length === 0 ? (
        <p className="empty">
          {films.length === 0
            ? "Le catalogue est vide pour le moment 🎬"
            : "Aucun film ne correspond 🔍"}
        </p>
      ) : (
        <div className="film-grid">
          {filmsFiltres.map((film) => (
            <div
              key={film.id}
              className="film-card"
              onClick={() => setFilmSelectionne(film)}
              style={{ cursor: "pointer" }}
            >
              <div className="card-image-wrapper">
                {film.image ? (
                  <img src={film.image} alt={film.titre} className="card-image" />
                ) : (
                  <div className="card-no-image">🎬</div>
                )}
                <span className="card-genre">{film.genre}</span>
              </div>
              <div className="card-body">
                <h3 className="card-titre">{film.titre}</h3>
                <p className="card-realisateur">🎥 {film.realisateur}</p>
                <p className="card-annee">📅 {film.annee}</p>
                <div className="card-footer">
                  <span className="card-note">{"⭐".repeat(Number(film.note))}</span>
                  {!invite && !isAdmin && (
                    <button
                      className={`btn-panier ${dejaAuPanier(film.id) ? "dejaDedans" : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onAjouterAuPanier(film);
                      }}
                      disabled={dejaAuPanier(film.id)}
                    >
                      {dejaAuPanier(film.id) ? "✅" : "🛒"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default Catalogue;