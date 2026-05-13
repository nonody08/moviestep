import { useState, useEffect } from "react";
import { supabase } from "../supabase";

function Admin({ films, onAjouter, onSupprimer, onModifier }) {
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
  const [filmEnEdition, setFilmEnEdition] = useState(null);
  const [onglet, setOnglet] = useState("films");

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await supabase.from("users").select("*");
      setUsers(data || []);
    };
    const fetchPaniers = async () => {
      const { data } = await supabase.from("Paniers").select("*");
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

  const handleModifier = (e) => {
    e.preventDefault();
    onModifier(filmEnEdition.id, filmEnEdition);
    setFilmEnEdition(null);
  };

  const panierDuUser = (userId) => paniers.filter((p) => p.user_id === userId);

  return (
    <main className="main">
      <h2 className="section-titre">🔐 Page Admin</h2>

      {/* Onglets */}
      <div className="admin-tabs">
        <button
          className={onglet === "films" ? "active" : ""}
          onClick={() => setOnglet("films")}
        >
          🎬 Gérer les films
        </button>
        <button
          className={onglet === "users" ? "active" : ""}
          onClick={() => setOnglet("users")}
        >
          👤 Utilisateurs
        </button>
      </div>

      {/* ONGLET FILMS */}
      {onglet === "films" && (
        <>
          {/* Formulaire ajout */}
          {!filmEnEdition && (
            <form className="task-form" onSubmit={handleSubmit}>
              <h3 style={{ color: "#e50914" }}>Ajouter un film</h3>
              <input type="text" placeholder="Titre..." value={titre} onChange={(e) => setTitre(e.target.value)} />
              <label className="input-file-label">
                📁 Choisir une affiche
                <input type="file" accept="image/*" onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onloadend = () => setImage(reader.result);
                  reader.readAsDataURL(file);
                }} />
              </label>
              {image && <img src={image} alt="Aperçu" className="apercu-image" />}
              <input type="text" placeholder="Réalisateur..." value={realisateur} onChange={(e) => setRealisateur(e.target.value)} />
              <input type="number" placeholder="Année..." value={annee} onChange={(e) => setAnnee(e.target.value)} min="1900" max="2099" />
              <textarea placeholder="Synopsis..." value={synopsis} onChange={(e) => setSynopsis(e.target.value)} rows={3} />
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
          )}

          {/* Formulaire modification */}
          {filmEnEdition && (
            <form className="task-form" onSubmit={handleModifier}>
              <h3 style={{ color: "#f59e0b" }}>✏️ Modifier le film</h3>
              <input type="text" placeholder="Titre..." value={filmEnEdition.titre} onChange={(e) => setFilmEnEdition({ ...filmEnEdition, titre: e.target.value })} />
              <input type="text" placeholder="Réalisateur..." value={filmEnEdition.realisateur} onChange={(e) => setFilmEnEdition({ ...filmEnEdition, realisateur: e.target.value })} />
              <input type="number" placeholder="Année..." value={filmEnEdition.annee} onChange={(e) => setFilmEnEdition({ ...filmEnEdition, annee: e.target.value })} />
              <textarea placeholder="Synopsis..." value={filmEnEdition.synopsis} onChange={(e) => setFilmEnEdition({ ...filmEnEdition, synopsis: e.target.value })} rows={3} />
              <select value={filmEnEdition.genre} onChange={(e) => setFilmEnEdition({ ...filmEnEdition, genre: e.target.value })}>
                <option value="action">💥 Action</option>
                <option value="comédie">😂 Comédie</option>
                <option value="horreur">👻 Horreur</option>
                <option value="romance">❤️ Romance</option>
                <option value="sci-fi">🚀 Sci-Fi</option>
                <option value="documentaire">🎥 Documentaire</option>
                <option value="thriller">🔪 Thriller</option>
              </select>
              <select value={filmEnEdition.note} onChange={(e) => setFilmEnEdition({ ...filmEnEdition, note: e.target.value })}>
                <option value="1">⭐ 1/5</option>
                <option value="2">⭐ 2/5</option>
                <option value="3">⭐ 3/5</option>
                <option value="4">⭐ 4/5</option>
                <option value="5">⭐ 5/5</option>
              </select>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button type="submit" style={{ flex: 1 }}>💾 Sauvegarder</button>
                <button type="button" onClick={() => setFilmEnEdition(null)} style={{ flex: 1, background: "#2a2a2a" }}>✖️ Annuler</button>
              </div>
            </form>
          )}

          {/* Liste films */}
          <h3 className="section-titre">Films ({films.length})</h3>
          <div className="admin-list">
            {films.map((film) => (
              <div key={film.id} className="admin-item">
                {film.image && <img src={film.image} alt={film.titre} style={{ width: "50px", height: "70px", objectFit: "cover", borderRadius: "6px" }} />}
                <div style={{ flex: 1 }}>
                  <strong>{film.titre}</strong>
                  <p style={{ color: "#aaa", fontSize: "0.8rem" }}>
                    {film.realisateur} • {film.annee} • {film.genre}
                  </p>
                  <p style={{ color: "#888", fontSize: "0.78rem", marginTop: "0.2rem" }}>
                    {film.synopsis?.slice(0, 80)}...
                  </p>
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button className="btn-panier" onClick={() => setFilmEnEdition(film)}>✏️</button>
                  <button className="btn-retirer" onClick={() => onSupprimer(film.id)}>🗑️</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ONGLET USERS */}
      {onglet === "users" && (
        <>
          <h3 className="section-titre">Utilisateurs ({users.length})</h3>
          <div className="admin-list">
            {users.length === 0 && <p style={{ color: "#aaa" }}>Aucun utilisateur pour le moment.</p>}
            {users.map((u) => (
              <div key={u.id} className="admin-item" style={{ flexDirection: "column", alignItems: "flex-start", gap: "0.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                  <div>
                    <strong>{u.prenom}</strong>
                    <span style={{ color: "#aaa", marginLeft: "0.5rem", fontSize: "0.85rem" }}>{u.email}</span>
                  </div>
                  <button
                    className="btn-panier"
                    onClick={() => setUserSelectionne(userSelectionne === u.id ? null : u.id)}
                  >
                    🛒 Panier ({panierDuUser(u.id).length})
                  </button>
                </div>
                {userSelectionne === u.id && (
                  <div className="admin-panier">
                    <h4>🛒 Panier de {u.prenom}</h4>
                    {panierDuUser(u.id).length === 0 ? (
                      <p style={{ color: "#aaa" }}>Panier vide</p>
                    ) : (
                      panierDuUser(u.id).map((item) => (
                        <div key={item.id} className="admin-item">
                          {item.image && <img src={item.image} alt={item.titre} style={{ width: "40px", height: "55px", objectFit: "cover", borderRadius: "4px" }} />}
                          <div style={{ flex: 1 }}>
                            <strong>{item.titre}</strong>
                            <p style={{ color: "#aaa", fontSize: "0.8rem" }}>{item.realisateur} • {item.annee}</p>
                            <p style={{ color: "#888", fontSize: "0.78rem" }}>{"⭐".repeat(Number(item.note))}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}

export default Admin;