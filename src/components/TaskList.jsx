import { useState } from "react";
import TaskItem from "./TaskItem";

function FilmList({ films, onToggle, onDelete, onEdit }) {
  const [recherche, setRecherche] = useState("");

  const filmsFiltres = films.filter((f) =>
    f.titre.toLowerCase().includes(recherche.toLowerCase())
  );

  return (
    <div>
      <input
        className="search-input"
        type="text"
        placeholder="🔍 Rechercher un film..."
        value={recherche}
        onChange={(e) => setRecherche(e.target.value)}
      />

      {filmsFiltres.length === 0 ? (
        <p className="empty">
          {films.length === 0
            ? "Aucun film ajouté pour le moment 🎬"
            : "Aucun film ne correspond à ta recherche 🔍"}
        </p>
      ) : (
        <ul className="task-list">
          {filmsFiltres.map((film) => (
            <TaskItem
              key={film.id}
              film={film}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default FilmList;