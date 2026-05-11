import { useState } from "react";

function TaskItem({ film, onToggle, onDelete, onEdit }) {
  const [enEdition, setEnEdition] = useState(false);
  const [titre, setTitre] = useState(film.titre);
  const [genre, setGenre] = useState(film.genre);
  const [note, setNote] = useState(film.note);

  const genreEmojis = {
    action: "💥",
    comédie: "😂",
    thriller: "🧠",
    horreur: "👻",
    romance: "❤️",
    "sci-fi": "🚀",
    documentaire: "🎥",
  };

  const handleSave = () => {
    if (!titre.trim()) return;
    onEdit(film.id, { titre, genre, note });
    setEnEdition(false);
  };

  if (enEdition) {
    return (
      <li className="task-item edit-mode">
        <input
          className="edit-input"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
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
        <button className="save-btn" onClick={handleSave}>💾</button>
        <button className="cancel-btn" onClick={() => setEnEdition(false)}>✖️</button>
      </li>
    );
  }

  return (
    <li className={`task-item ${film.statut === "vu" ? "done" : ""}`}>
      <span className="genre-emoji">{genreEmojis[film.genre]}</span>
      <span className="task-title" onClick={() => onToggle(film.id)}>
        {film.titre}
      </span>
      <span className="etoiles">{"⭐".repeat(Number(film.note))}</span>
      <span className={`statut ${film.statut === "vu" ? "vu" : "a-voir"}`}>
        {film.statut === "vu" ? "✅ Vu" : "🕐 À voir"}
      </span>
      <button className="edit-btn" onClick={() => setEnEdition(true)}>✏️</button>
      <button className="delete-btn" onClick={() => onDelete(film.id)}>🗑️</button>
    </li>
  );
}

export default TaskItem;