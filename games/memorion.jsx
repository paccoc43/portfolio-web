const { useState, useEffect } = React;

const MEM_GLYPHS = ["🌲", "🍄", "🦊", "🌙", "🎮", "⚡", "🐦", "🌿"];
const MEM_BEST_KEY = "pf-memorion-best";

function loadBest() {
  const raw = localStorage.getItem(MEM_BEST_KEY);
  return raw ? Number(raw) : null;
}

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

function settlePair(setDeck, setSel, setLocked, a, b, matched) {
  setDeck((d) => d.map((c, i) => (i === a || i === b ? { ...c, ...(matched ? { matched: true } : { up: false }) } : c)));
  setSel([]);
  setLocked(false);
}

function MemorionGame() {
  const [deck, setDeck] = useState(freshDeck);
  const [sel, setSel] = useState([]);
  const [moves, setMoves] = useState(0);
  const [locked, setLocked] = useState(false);
  const [best, setBest] = useState(loadBest);

  const won = deck.every((c) => c.matched);

  useEffect(() => {
    if (won && (best === null || moves < best)) {
      setBest(moves);
      localStorage.setItem(MEM_BEST_KEY, String(moves));
    }
  }, [won]);

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
      const matched = nd[a].g === nd[b].g;
      setTimeout(() => settlePair(setDeck, setSel, setLocked, a, b, matched), matched ? 480 : 760);
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
          {best !== null && <span className="pf-stage-label" style={{ opacity: .5 }}>Mejor: {best}</span>}
        </div>
        <button type="button" className="pf-game-btn" onClick={reset}>{won ? "Jugar otra vez" : "Barajar"}</button>
      </div>
      <div className="pf-mem-grid">
        {deck.map((c, i) => (
          <button
            type="button"
            key={c.id}
            className={"pf-mem-cell" + (c.up || c.matched ? " up" : "") + (c.matched ? " matched" : "")}
            onClick={() => flip(i)}
            aria-label={c.up || c.matched ? `Carta ${c.g}` : "Carta oculta"}
          >
            {c.up || c.matched
              ? <span className="pf-mem-face">{c.g}</span>
              : <span className="pf-mem-back">?</span>}
          </button>
        ))}
      </div>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-faint)", marginTop: 14, marginBottom: 0, textAlign: "center" }}>
        Encuentra las 8 parejas en el menor número de intentos.
      </p>
    </div>
  );
}
