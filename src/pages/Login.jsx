import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

function Login({ onInvite }) {
  const [mode, setMode] = useState("connexion");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erreur, setErreur] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur("");
    try {
      if (mode === "inscription") {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      if (err.code === "auth/email-already-in-use") setErreur("Email déjà utilisé.");
      else if (err.code === "auth/wrong-password") setErreur("Mot de passe incorrect.");
      else if (err.code === "auth/user-not-found") setErreur("Aucun compte avec cet email.");
      else if (err.code === "auth/weak-password") setErreur("Mot de passe trop court (6 car. min).");
      else setErreur("Une erreur est survenue.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h1>🎬 CinéTracker</h1>
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
          <input
            type="email"
            placeholder="Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {erreur && <p className="erreur">{erreur}</p>}
          <button type="submit" className="btn-login">
            {mode === "connexion" ? "Se connecter" : "Créer un compte"}
          </button>
        </form>

        <button className="btn-invite" onClick={onInvite}>
          Continuer en tant qu'invité →
        </button>
      </div>
    </div>
  );
}

export default Login;