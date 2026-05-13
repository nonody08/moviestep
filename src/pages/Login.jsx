import { useState } from "react";
import { supabase } from "../supabase";

function Login({ onInvite }) {
  const [mode, setMode] = useState("connexion");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erreur, setErreur] = useState("");
  const [succes, setSucces] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur("");
    setSucces("");

    if (password.length < 8) {
      setErreur("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    if (mode === "inscription") {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setErreur(error.message);
        return;
      }
      // Sauvegarde dans la table users
      await supabase.from("users").insert([{
        id: data.user.id,
        prenom,
        email,
        role: "user"
      }]);
      setSucces("Compte créé ! Tu peux te connecter.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setErreur("Email ou mot de passe incorrect.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h1>🎬 CinéTracker</h1>
        <p className="login-subtitle">Ta plateforme de films personnalisée</p>

        <div className="login-tabs">
          <button
            className={mode === "connexion" ? "active" : ""}
            onClick={() => setMode("connexion")}
          >
            Connexion
          </button>
          <button
            className={mode === "inscription" ? "active" : ""}
            onClick={() => setMode("inscription")}
          >
            Inscription
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {mode === "inscription" && (
            <input
              type="text"
              placeholder="Prénom..."
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe (8 caractères min)..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {erreur && <p className="erreur">{erreur}</p>}
          {succes && <p className="succes">{succes}</p>}
          <button type="submit" className="btn-login">
            {mode === "connexion" ? "Se connecter" : "Créer un compte"}
          </button>
        </form>

        <div className="login-separateur">ou</div>

        <button className="btn-invite" onClick={onInvite}>
          Continuer en tant qu'invité →
        </button>
      </div>
    </div>
  );
}

export default Login;