import { useState, useEffect } from "react";
import { auth, db } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import Header from "./components/Header";
import Catalogue from "./pages/Catalogue";
import Panier from "./pages/Panier";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import "./App.css";

const ADMIN_EMAIL = "dyllamaboumbaninolanedyl@gmail.com"; // ← mets ton email ici

function App() {
  const [user, setUser] = useState(null);
  const [invite, setInvite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState("catalogue");
  const [films, setFilms] = useState([]);
  const [panier, setPanier] = useState([]);

  // Écoute connexion/déconnexion
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  // Écoute le catalogue Firestore en temps réel
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "films"), (snapshot) => {
      setFilms(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, []);

  // Panier dans localStorage par user
  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`panier_${user.uid}`);
      setPanier(saved ? JSON.parse(saved) : []);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`panier_${user.uid}`, JSON.stringify(panier));
    }
  }, [panier, user]);

  const ajouterFilm = async (film) => {
    await addDoc(collection(db, "films"), film);
  };

  const supprimerFilm = async (id) => {
    await deleteDoc(doc(db, "films", id));
    setPanier(panier.filter((f) => f.id !== id));
  };

  const ajouterAuPanier = (film) => {
    if (panier.find((f) => f.id === film.id)) return;
    setPanier([...panier, film]);
  };

  const retirerDuPanier = (id) => {
    setPanier(panier.filter((f) => f.id !== id));
  };

  const isAdmin = user && user.email === ADMIN_EMAIL;

  // Détection page admin
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === "#/admin") setPage("admin");
    };
    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

  if (loading) return <div className="loading">Chargement...</div>;

  if (!user && !invite) {
    return <Login onInvite={() => setInvite(true)} />;
  }

  return (
    <div className="app">
      <Header
        page={page}
        setPage={setPage}
        panierCount={panier.length}
        user={user}
        invite={invite}
        isAdmin={isAdmin}
        onDeconnexion={() => {
          signOut(auth);
          setInvite(false);
          setPanier([]);
        }}
      />
      {page === "catalogue" && (
        <Catalogue
          films={films}
          panier={panier}
          onAjouterAuPanier={ajouterAuPanier}
          invite={invite}
        />
      )}
      {page === "panier" && !invite && (
        <Panier panier={panier} onRetirer={retirerDuPanier} />
      )}
      {page === "admin" && isAdmin && (
        <Admin films={films} onAjouter={ajouterFilm} onSupprimer={supprimerFilm} />
      )}
    </div>
  );
}

export default App;