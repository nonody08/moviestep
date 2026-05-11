import { useState } from "react";

function FilmForm({ onAdd }) {
  const [titre, setTitre] = useState("");
  const [genre, setGenre] = useState("action");
  const [note, setNote] = useState("5");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titre.trim()) return;
    onAdd({ titre, genre, note });
    setTitre("");
    setGenre("action");
    setNote("5");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Entrez le film..."
        value={titre}
        onChange={(e) => setTitre(e.target.value)}
      />

      <select value={genre} onChange={(e) => setGenre(e.target.value)}>
        <option value="action">💥 Action</option>
        <option value="comédie">😂 Comédie</option>
        <option value="thriller">🔪 Thriller</option>
        <option value="horreur">👻 Horreur</option>
        <option value="romance">❤️ Romance</option>
        <option value="sci-fi">🚀 Sci-Fi</option>
        <option value="documentaire">🎥 Documentaire</option>
      </select><br />
      <select value={note} onChange={(e) => setNote(e.target.value)}>
        <option value="1">⭐ 1/5</option>
        <option value="2">⭐ 2/5</option>
        <option value="3">⭐ 3/5</option>
        <option value="4">⭐ 4/5</option>
        <option value="5">⭐ 5/5</option>
      </select><br />
      <button type="submit">Ajouter</button><br />
    </form>
  );
}

export default FilmForm;