import { useState } from "react";

function Admin({ films, onAjouter, onSupprimer }) {
  const [titre, setTitre] = useState("");
  const [genre, setGenre] = useState("action");
  const [note, setNote] = useState("5");
  const [image, setImage] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [realisateur, setRealisateur] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titre.trim()) return;
    onAjouter({ titre, genre, note, image, synopsis, realisateur });
    setTitre("");
    setGenre("action");
    setNote("5");
    setImage("");
    setSynopsis("");
    setRealisateur("");
  };

  return (
    <main className="main">
      <h2 className="section-titre">🔐 Page Admin</h2>

      <form className="task-form" onSubmit={handleSubmit}>
        <h3 style={{ color: "#e50914" }}>Ajouter un film au catalogue</h3>
        <input
          type="text"
          placeholder="Titre du film..."
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
        />
        <input
          type="text"
          placeholder="URL de l'affiche..."
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nom du réalisateur..."
          value={realisateur}
          onChange={(e) => setRealisateur(e.target.value)}
        />
        <textarea
          placeholder="Synopsis..."
          value={synopsis}
          onChange={(e) => setSynopsis(e.target.value)}
          rows={3}
        />
        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="action">💥 Action</option>
          <option value="comédie">😂 Comédie</option>
          <option value="horreur">👻 Horreur</option>
          <option value="romance">❤️ Romance</option>
          <option value="sci-fi">🚀 Sci-Fi</option>
          <option value="documentaire">🎥 Documentaire</option>
          <option value="thriller">🔪 Thriller</option>
        </select>
        <select value={note} onChange={(e) => setNote(e.target.value)}>
          <option value="1">⭐ 1/5</option>
          <option value="2">⭐ 2/5</option>
          <option value="3">⭐ 3/5</option>
          <option value="4">⭐ 4/5</option>
          <option value="5">⭐ 5/5</option>
        </select>
        <button type="submit">➕ Ajouter au catalogue</button>
      </form>

      <h3 className="section-titre" style={{ marginTop: "1rem" }}>
        Films dans le catalogue ({films.length})
      </h3>
      <div className="admin-list">
        {films.map((film) => (
          <div key={film.id} className="admin-item">
            <span>{film.titre}</span>
            <button className="btn-retirer" onClick={() => onSupprimer(film.id)}>
              🗑️ Supprimer
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Admin;