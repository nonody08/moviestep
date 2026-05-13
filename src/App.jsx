import { useState, useEffect } from "react";
import Header from "./components/Header";
import Catalogue from "./pages/Catalogue";
import Panier from "./pages/Panier";
import Admin from "./pages/Admin";
import "./App.css";

function App() {
  const [page, setPage] = useState("catalogue");
  const [films, setFilms] = useState(() => {
    const saved = localStorage.getItem("catalogue");
    return saved ? JSON.parse(saved) : [];
  });
  const [panier, setPanier] = useState(() => {
    const saved = localStorage.getItem("panier");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("catalogue", JSON.stringify(films));
  }, [films]);

  useEffect(() => {
    localStorage.setItem("panier", JSON.stringify(panier));
  }, [panier]);

  const ajouterFilm = (film) => {
    setFilms([...films, { id: Date.now(), ...film }]);
  };

  const supprimerFilm = (id) => {
    setFilms(films.filter((f) => f.id !== id));
    setPanier(panier.filter((f) => f.id !== id));
  };

  const ajouterAuPanier = (film) => {
    if (panier.find((f) => f.id === film.id)) return;
    setPanier([...panier, film]);
  };

  const retirerDuPanier = (id) => {
    setPanier(panier.filter((f) => f.id !== id));
  };

  // Détection page admin via hash
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === "#/admin") setPage("admin");
    };
    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

  return (
    <div className="app">
      <Header page={page} setPage={setPage} panierCount={panier.length} />
      {page === "catalogue" && (
        <Catalogue
          films={films}
          panier={panier}
          onAjouterAuPanier={ajouterAuPanier}
        />
      )}
      {page === "panier" && (
        <Panier panier={panier} onRetirer={retirerDuPanier} />
      )}
      {page === "admin" && (
        <Admin
          films={films}
          onAjouter={ajouterFilm}
          onSupprimer={supprimerFilm}
        />
      )}
    </div>
  );
}

export default App;