import { useState, useEffect } from "react";
import { supabase } from "../supabase";

function Admin({ films, onAjouter, onSupprimer }) {
  const [titre, setTitre] = useState("");
  const [genre, setGenre] = useState("action");
  const [note, setNote] = useState("5");
  const [image, setImage] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [realisateur, setRealisateur] = useState("");
  const [annee, setAnnee] = useState("");
  const [users, setUsers] = useState([]);
  const [paniers, setPaniers] = useState([]);
  const [userSelectionne, setUserSelectionne] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await supabase.from("users").select("*");
      setUsers(data || []);
    };
    const fetchPaniers = async () => {
      const { data } = await supabase.from("paniers").select("*");
      setPaniers(data || []);
    };
    fetchUsers();
    fetchPaniers();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titre.trim()) return;
    onAjouter({ titre, genre, note, image, synopsis, realisateur, annee });
    setTitre("");
    setGenre("action");
    setNote("5");
    setImage("");
    setSynopsis("");
    setRealisateur("");
    setAnnee("");
  };

  const panierDuUser = (userId) =>
    paniers.filter((p) => p.user_id === userId);

  return (
    <main className="main">
      <h2 className="section-titre">🔐 Page Admin</h2>

      {/* Formulaire ajout film */}
      <form className="task-form" onSubmit={handleSubmit}>
        <h3 style={{ color: "#e50914" }}>Ajouter un film au catalogue</h3>
        <input
          type="text"
          placeholder="Titre du film..."
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
        />
        <label className="input-file-label">
          📁 Choisir une affiche
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onloadend = () => setImage(reader.result);
              reader.readAsDataURL(file);
            }}
          />
        </label>
        {image && <img src={image} alt="Aperçu" className="apercu-image" />}
        <input
          type="text"
          placeholder="Nom du réalisateur..."
          value={realisateur}
          onChange={(e) => setRealisateur(e.target.value)}
        />
        <input
          type="number"
          placeholder="Année de sortie..."
          value={annee}
          onChange={(e) => setAnnee(e.target.value)}
          min="1900"
          max="2099"
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

      {/* Liste films */}
      <h3 className="section-titre">Films dans le catalogue ({films.length})</h3>
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

      {/* Liste users */}
      <h3 className="section-titre" style={{ marginTop: "2rem" }}>
        👤 Utilisateurs ({users.length})
      </h3>
      <div className="admin-list">
        {users.map((u) => (
          <div key={u.id} className="admin-item">
            <div>
              <strong>{u.prenom}</strong>
              <span style={{ color: "#aaa", marginLeft: "0.5rem" }}>
                {u.email}
              </span>
            </div>
            <button
              className="btn-panier"
              onClick={() =>
                setUserSelectionne(userSelectionne === u.id ? null : u.id)
              }
            >
              🛒 Voir panier ({panierDuUser(u.id).length})
            </button>
          </div>
        ))}
      </div>

      {/* Panier du user sélectionné */}
      {userSelectionne && (
        <div className="admin-panier">
          <h4>🛒 Panier de {users.find((u) => u.id === userSelectionne)?.prenom}</h4>
          {panierDuUser(userSelectionne).length === 0 ? (
            <p style={{ color: "#aaa" }}>Panier vide</p>
          ) : (
            panierDuUser(userSelectionne).map((item) => (
              <div key={item.id} className="admin-item">
                <span>{item.titre}</span>
                <span style={{ color: "#aaa" }}>⭐ {item.note}/5</span>
              </div>
            ))
          )}
        </div>
      )}
    </main>
  );
}

export default Admin;