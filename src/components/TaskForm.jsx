import { useState } from "react";

function FilmForm({ onAdd }) {
  const [titre, setTitre] = useState("");
  const [genre, setGenre] = useState("action");
  const [note, setNote] = useState("5");
  const [image, setImage] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [realisateur, setRealisateur] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titre.trim()) return;
    onAdd({ titre, genre, note, image, synopsis, realisateur });
    setTitre("");
    setGenre("action");
    setNote("5");
    setImage("");
    setSynopsis("");
    setRealisateur("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Titre du film..."
        value={titre}
        onChange={(e) => setTitre(e.target.value)}
      />
      <input
        type="text"
        placeholder="URL de l'affiche (image)..."
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
      <button type="submit">Ajouter au catalogue</button>
    </form>
  );
}

export default FilmForm;