import { useState } from "react";

function TaskItem({ film, onToggle, onDelete, onEdit }) {
  const [enEdition, setEnEdition] = useState(false);
  const [titre, setTitre] = useState(film.titre);
  const [genre, setGenre] = useState(film.genre);
  const [note, setNote] = useState(film.note);
  const [image, setImage] = useState(film.image);
  const [synopsis, setSynopsis] = useState(film.synopsis);
  const [realisateur, setRealisateur] = useState(film.realisateur);

  const handleSave = () => {
    if (!titre.trim()) return;
    onEdit(film.id, { titre, genre, note, image, synopsis, realisateur });
    setEnEdition(false);
  };

  if (enEdition) {
    return (
      <div className="card-edit">
        <input
          className="edit-input"
          value={titre}
          placeholder="Titre"
          onChange={(e) => setTitre(e.target.value)}
        />
        <input
          className="edit-input"
          value={image}
          placeholder="URL image"
          onChange={(e) => setImage(e.target.value)}
        />
        <input
          className="edit-input"
          value={realisateur}
          placeholder="Réalisateur"
          onChange={(e) => setRealisateur(e.target.value)}
        />
        <textarea
          className="edit-input"
          value={synopsis}
          placeholder="Synopsis"
          rows={3}
          onChange={(e) => setSynopsis(e.target.value)}
        />
        <select
          className="edit-select"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        >
          <option value="action">💥 Action</option>
          <option value="comédie">😂 Comédie</option>
          <option value="horreur">👻 Horreur</option>
          <option value="romance">❤️ Romance</option>
          <option value="sci-fi">🚀 Sci-Fi</option>
          <option value="documentaire">🎥 Documentaire</option>
          <option value="thriller">🔪 Thriller</option>
        </select>
        <select
          className="edit-select"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        >
          <option value="1">⭐ 1/5</option>
          <option value="2">⭐ 2/5</option>
          <option value="3">⭐ 3/5</option>
          <option value="4">⭐ 4/5</option>
          <option value="5">⭐ 5/5</option>
        </select>
        <div className="edit-actions">
          <button className="save-btn" onClick={handleSave}>💾 Sauvegarder</button>
          <button className="cancel-btn" onClick={() => setEnEdition(false)}>✖️ Annuler</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`film-card ${film.statut === "vu" ? "card-vu" : ""}`}>
      <div className="card-image-wrapper">
        {film.image ? (
          <img src={film.image} alt={film.titre} className="card-image" />
        ) : (
          <div className="card-no-image">🎬</div>
        )}
        <span className={`card-statut ${film.statut === "vu" ? "vu" : "a-voir"}`}>
          {film.statut === "vu" ? "✅ Vu" : "🕐 À voir"}
        </span>
      </div>
      <div className="card-body">
        <h3 className="card-titre">{film.titre}</h3>
        <p className="card-realisateur">🎥 {film.realisateur}</p>
        <p className="card-synopsis">{film.synopsis}</p>
        <div className="card-footer">
          <span className="card-note">{"⭐".repeat(Number(film.note))}</span>
          <div className="card-actions">
            <button onClick={() => onToggle(film.id)}>
              {film.statut === "vu" ? "↩️" : "✅"}
            </button>
            <button onClick={() => setEnEdition(true)}>✏️</button>
            <button onClick={() => onDelete(film.id)}>🗑️</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;