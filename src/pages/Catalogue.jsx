import { useState } from "react";

function Catalogue({ films, panier, onAjouterAuPanier }) {
  const [recherche, setRecherche] = useState("");
  const [filtreGenre, setFiltreGenre] = useState("tous");

  const filmsFiltres = films.filter((f) => {
    const matchRecherche = f.titre.toLowerCase().includes(recherche.toLowerCase());
    const matchGenre = filtreGenre === "tous" || f.genre === filtreGenre;
    return matchRecherche && matchGenre;
  });

  const dejaAuPanier = (id) => panier.find((f) => f.id === id);

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
            <div key={film.id} className="film-card">
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
                <p className="card-synopsis">{film.synopsis}</p>
                <div className="card-footer">
                  <span className="card-note">{"⭐".repeat(Number(film.note))}</span>
                  <button
                    className={`btn-panier ${dejaAuPanier(film.id) ? "dejaDedans" : ""}`}
                    onClick={() => onAjouterAuPanier(film)}
                    disabled={dejaAuPanier(film.id)}
                  >
                    {dejaAuPanier(film.id) ? "✅ Ajouté" : "🛒 Ajouter"}
                  </button>
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