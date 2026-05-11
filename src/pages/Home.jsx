import { useState, useEffect } from "react";
import FilmForm from "../components/TaskForm";
import FilmList from "../components/TaskList";
import Stats from "../components/Stats";

function Home() {
  const [films, setFilms] = useState(() => {
    const saved = localStorage.getItem("films");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("films", JSON.stringify(films));
  }, [films]);

  const addFilm = (film) => {
    setFilms([...films, { id: Date.now(), ...film, statut: "à voir" }]);
  };

  const toggleFilm = (id) => {
    setFilms(films.map((f) =>
      f.id === id
        ? { ...f, statut: f.statut === "vu" ? "à voir" : "vu" }
        : f
    ));
  };

  const deleteFilm = (id) => {
    setFilms(films.filter((f) => f.id !== id));
  };

  const editFilm = (id, newData) => {
    setFilms(films.map((f) => (f.id === id ? { ...f, ...newData } : f)));
  };

  return (
    <main className="main">
      <Stats films={films} />
      <FilmForm onAdd={addFilm} />
      <FilmList
        films={films}
        onToggle={toggleFilm}
        onDelete={deleteFilm}
        onEdit={editFilm}
      />
    </main>
  );
}

export default Home;