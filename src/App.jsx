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

  useEffect(() => {
    const fetchFilms = async () => {
      const { data, error } = await supabase.from("Films").select("*");
      console.log("films:", data, error);
      setFilms(data || []);
    };
    fetchFilms();
  }, []);

  useEffect(() => {
    if (user) {
      const fetchPanier = async () => {
        const { data, error } = await supabase
          .from("Paniers")
          .select("*")
          .eq("user_id", user.id);
        console.log("panier:", data, error);
        setPanier(data || []);
      };
      fetchPanier();
    }
  }, [user]);

  const ajouterFilm = async (film) => {
    const { data, error } = await supabase.from("Films").insert([film]).select();
    console.log("ajout film:", data, error);
    if (data) setFilms([...films, ...data]);
  };

  const supprimerFilm = async (id) => {
    await supabase.from("Films").delete().eq("id", id);
    await supabase.from("Paniers").delete().eq("film_id", id);
    setFilms(films.filter((f) => f.id !== id));
    setPanier(panier.filter((f) => f.film_id !== id));
  };

  const modifierFilm = async (id, newData) => {
    await supabase.from("Films").update(newData).eq("id", id);
    setFilms(films.map((f) => (f.id === id ? { ...f, ...newData } : f)));
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
    const { data, error } = await supabase.from("Paniers").insert([item]).select();
    console.log("ajout panier:", data, error);
    if (data) setPanier([...panier, ...data]);
  };

  const retirerDuPanier = async (film_id) => {
    await supabase.from("Paniers").delete().eq("film_id", film_id).eq("user_id", user.id);
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
          isAdmin={isAdmin}
        />
      )}
      {page === "panier" && !invite && !isAdmin && (
        <Panier panier={panier} onRetirer={retirerDuPanier} />
      )}
      {page === "admin" && isAdmin && (
        <Admin
          films={films}
          onAjouter={ajouterFilm}
          onSupprimer={supprimerFilm}
          onModifier={modifierFilm}
        />
      )}
    </div>
  );
}

export default App;