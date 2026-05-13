import { auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

function Login({ onInvite }) {
  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.log(err.code);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h1>🎬 CinéTracker</h1>
        <p className="login-subtitle">Ta plateforme de films personnalisée</p>

        <button className="btn-google" onClick={handleGoogle}>
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            width="20"
          />
          Se connecter avec Google
        </button>

        <div className="login-separateur">ou</div>

        <button className="btn-invite" onClick={onInvite}>
          Continuer en tant qu'invité →
        </button>
      </div>
    </div>
  );
}

export default Login;