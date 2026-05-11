function Stats({ films }) {
    const total = films.length;
    const vus = films.filter((f) => f.statut === "vu").length;
    const aVoir = total - vus;
  
    return (
      <div className="stats">
        <span>🎬 Total : <strong>{total}</strong></span>
        <span>✅ Vus : <strong>{vus}</strong></span>
        <span>🕐 À voir : <strong>{aVoir}</strong></span>
      </div>
    );
  }
  
  export default Stats;