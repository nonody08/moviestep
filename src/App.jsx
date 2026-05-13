import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import Header from "./components/Header";
import Catalogue from "./pages/Catalogue";
import Panier from "./pages/Panier";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import "./App.css";

const ADMIN_EMAIL = "dyllamaboumbaninolanedyl@gmail.com"; // ← remplace par ton email

function App() {
  const [user, setUser] = useState(null);
  const [invite, setInvite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState("catalogue");
  const [films, setFilms] = useState([]);
  const [panier, setPanier] = useState([]);

  // Écoute connexion/déconnexion
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  // Charge le catalogue
  useEffect(() => {
    const fetchFilms = async () => {
      const { data } = await supabase.from("films").select("*");
      setFilms(data || []);
    };
    fetchFilms();
  }, []);

  // Charge le panier de l'utilisateur
  useEffect(() => {
    if (user) {
      const fetchPanier = async () => {
        const { data } = await supabase
          .from("paniers")
          .select("*")
          .eq("user_id", user.id);
        setPanier(data || []);
      };
      fetchPanier();
    }
  }, [user]);

  const ajouterFilm = async (film) => {
    const { data } = await supabase.from("films").insert([film]).select();
    if (data) setFilms([...films, ...data]);
  };

  const supprimerFilm = async (id) => {
    await supabase.from("films").delete().eq("id", id);
    await supabase.from("paniers").delete().eq("film_id", id);
    setFilms(films.filter((f) => f.id !== id));
    setPanier(panier.filter((f) => f.film_id !== id));
  };

  const ajouterAuPanier = async (film) => {
    if (panier.find((f) => f.film_id === film.id)) return;
    const item = {
      user_id: user.id,
      film_id: film.id,
      titre: film.titre,
      image: film.image,
      realisateur: film.realisateur,
      note: film.note,
      annee: film.annee,
      synopsis: film.synopsis,
    };
    const { data } = await supabase.from("paniers").insert([item]).select();
    if (data) setPanier([...panier, ...data]);
  };

  const retirerDuPanier = async (film_id) => {
    await supabase.from("paniers").delete().eq("film_id", film_id).eq("user_id", user.id);
    setPanier(panier.filter((f) => f.film_id !== film_id));
  };

  const isAdmin = user && user.email === ADMIN_EMAIL;

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
        onDeconnexion={async () => {
          await supabase.auth.signOut();
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