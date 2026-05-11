function Header({ page, setPage }) {
    return (
      <header className="header">
        <h1>🎬 MOVIESTEP</h1>
        <nav>
          <button
            className={page === "home" ? "active" : ""}
            onClick={() => setPage("home")}
          >
            Mes films
          </button><br />
          <button
            className={page === "about" ? "active" : ""}
            onClick={() => setPage("about")}
          >
            À propos
          </button>
        </nav>
      </header>
    );
  }
  
  export default Header;