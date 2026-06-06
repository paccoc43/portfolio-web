const { useState } = React;

const MEM_GLYPHS = ["🌲", "🍄", "🦊", "🌙", "🎮", "⚡", "🐦", "🌿"];

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function freshDeck() {
  return shuffle([...MEM_GLYPHS, ...MEM_GLYPHS]).map((g, i) => ({ id: i, g, up: false, matched: false }));
}

function MemorionGame() {
  const [deck, setDeck] = useState(freshDeck);
  const [sel, setSel] = useState([]);
  const [moves, setMoves] = useState(0);
  const [locked, setLocked] = useState(false);

  const won = deck.every((c) => c.matched);

  const flip = (idx) => {
    if (locked) return;
    const card = deck[idx];
    if (card.up || card.matched) return;
    const nd = deck.map((c, i) => (i === idx ? { ...c, up: true } : c));
    setDeck(nd);
    const ns = [...sel, idx];
    setSel(ns);
    if (ns.length === 2) {
      setMoves((m) => m + 1);
      setLocked(true);
      const [a, b] = ns;
      if (nd[a].g === nd[b].g) {
        setTimeout(() => {
          setDeck((d) => d.map((c, i) => (i === a || i === b ? { ...c, matched: true } : c)));
          setSel([]); setLocked(false);
        }, 480);
      } else {
        setTimeout(() => {
          setDeck((d) => d.map((c, i) => (i === a || i === b ? { ...c, up: false } : c)));
          setSel([]); setLocked(false);
        }, 760);
      }
    }
  };

  const reset = () => { setDeck(freshDeck()); setSel([]); setMoves(0); setLocked(false); };

  const pairs = deck.filter((c) => c.matched).length / 2;

  return (
    <div>
      <div className="pf-stage-bar">
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <span className="pf-score">{pairs}<span style={{ opacity: .35 }}>/8</span></span>
          <span className="pf-stage-label">{won ? `¡Completado en ${moves} intentos!` : `${moves} intentos`}</span>
        </div>
        <button className="pf-game-btn" onClick={reset}>{won ? "Jugar otra vez" : "Barajar"}</button>
      </div>
      <div className="pf-mem-grid">
        {deck.map((c, i) => (
          <div
            key={c.id}
            className={"pf-mem-cell" + (c.up || c.matched ? " up" : "") + (c.matched ? " matched" : "")}
            onClick={() => flip(i)}
          >
            {c.up || c.matched
              ? <span className="pf-mem-face">{c.g}</span>
              : <span className="pf-mem-back">?</span>}
          </div>
        ))}
      </div>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-faint)", marginTop: 14, marginBottom: 0, textAlign: "center" }}>
        Encuentra las 8 parejas en el menor número de intentos.
      </p>
    </div>
  );
}
