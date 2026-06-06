const { useRef, useEffect, useState, useCallback } = React;

function pfVar(name, fallback) {
  const root = document.querySelector(".pf");
  if (!root) return fallback;
  const v = getComputedStyle(root).getPropertyValue(name).trim();
  return v || fallback;
}

function PongGame() {
  const canvasRef = useRef(null);
  const stateRef = useRef(null);
  const rafRef = useRef(0);
  const [score, setScore] = useState({ p: 0, ai: 0 });
  const [running, setRunning] = useState(false);
  const [winner, setWinner] = useState(null);

  const W = 720, H = 420, PAD_W = 12, PAD_H = 78, BALL = 9, WIN = 5;

  const init = useCallback(() => {
    stateRef.current = {
      py: H / 2 - PAD_H / 2,
      ay: H / 2 - PAD_H / 2,
      bx: W / 2, by: H / 2,
      vx: Math.random() > 0.5 ? 5 : -5,
      vy: (Math.random() * 4 - 2),
      p: 0, ai: 0,
    };
    setScore({ p: 0, ai: 0 });
    setWinner(null);
  }, []);

  useEffect(() => { init(); }, [init]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const onMove = (e) => {
      const s = stateRef.current; if (!s) return;
      const rect = canvas.getBoundingClientRect();
      const y = ((e.clientY - rect.top) / rect.height) * H;
      s.py = Math.max(0, Math.min(H - PAD_H, y - PAD_H / 2));
    };
    const onKey = (e) => {
      const s = stateRef.current; if (!s) return;
      if (e.key === "ArrowUp") s.py = Math.max(0, s.py - 26);
      if (e.key === "ArrowDown") s.py = Math.min(H - PAD_H, s.py + 26);
    };
    canvas.addEventListener("mousemove", onMove);
    window.addEventListener("keydown", onKey);
    return () => { canvas.removeEventListener("mousemove", onMove); window.removeEventListener("keydown", onKey); };
  }, []);

  useEffect(() => {
    if (!running) return;
    const ctx = canvasRef.current.getContext("2d");

    const step = () => {
      const s = stateRef.current;
      const accent = pfVar("--accent", "#5bbf7a");
      const text = pfVar("--text", "#e0e0e0");
      const faint = pfVar("--border", "#333");
      const bg = pfVar("--bg", "#0a0a0a");

      const target = s.by - PAD_H / 2;
      const diff = target - s.ay;
      s.ay += Math.max(-4.3, Math.min(4.3, diff * 0.09));
      s.ay = Math.max(0, Math.min(H - PAD_H, s.ay));

      s.bx += s.vx; s.by += s.vy;
      if (s.by < BALL || s.by > H - BALL) { s.vy *= -1; s.by = Math.max(BALL, Math.min(H - BALL, s.by)); }

      if (s.bx - BALL < PAD_W + 6 && s.by > s.py && s.by < s.py + PAD_H && s.vx < 0) {
        s.vx = Math.abs(s.vx) * 1.04;
        s.vy += ((s.by - (s.py + PAD_H / 2)) / (PAD_H / 2)) * 3.4;
      }
      if (s.bx + BALL > W - PAD_W - 6 && s.by > s.ay && s.by < s.ay + PAD_H && s.vx > 0) {
        s.vx = -Math.abs(s.vx) * 1.04;
        s.vy += ((s.by - (s.ay + PAD_H / 2)) / (PAD_H / 2)) * 3.4;
      }
      s.vx = Math.max(-11, Math.min(11, s.vx));

      let scored = false;
      if (s.bx < -10) { s.ai += 1; scored = true; }
      if (s.bx > W + 10) { s.p += 1; scored = true; }
      if (scored) {
        s.bx = W / 2; s.by = H / 2;
        s.vx = (s.bx > W / 2 ? -5 : 5) * (Math.random() > 0.5 ? 1 : -1);
        s.vx = (s.ai > s.p ? 5 : -5);
        s.vy = Math.random() * 4 - 2;
        setScore({ p: s.p, ai: s.ai });
        if (s.p >= WIN || s.ai >= WIN) {
          setWinner(s.p >= WIN ? "¡Ganaste!" : "Gana la IA");
          setRunning(false);
          return;
        }
      }

      ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = faint; ctx.setLineDash([8, 12]); ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(W / 2, 0); ctx.lineTo(W / 2, H); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = text;
      ctx.fillRect(6, s.py, PAD_W, PAD_H);
      ctx.fillStyle = accent;
      ctx.fillRect(W - PAD_W - 6, s.ay, PAD_W, PAD_H);
      ctx.beginPath(); ctx.arc(s.bx, s.by, BALL, 0, Math.PI * 2); ctx.fillStyle = text; ctx.fill();

      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [running]);

  useEffect(() => {
    if (running) return;
    const ctx = canvasRef.current.getContext("2d");
    const s = stateRef.current; if (!s) return;
    const text = pfVar("--text", "#e0e0e0"), accent = pfVar("--accent", "#5bbf7a"),
      faint = pfVar("--border", "#333"), bg = pfVar("--bg", "#0a0a0a");
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = faint; ctx.setLineDash([8, 12]); ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(W / 2, 0); ctx.lineTo(W / 2, H); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = text; ctx.fillRect(6, s.py, PAD_W, PAD_H);
    ctx.fillStyle = accent; ctx.fillRect(W - PAD_W - 6, s.ay, PAD_W, PAD_H);
    ctx.beginPath(); ctx.arc(s.bx, s.by, BALL, 0, Math.PI * 2); ctx.fillStyle = text; ctx.fill();
  }, [running, score, winner]);

  return (
    <div>
      <div className="pf-stage-bar">
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <span className="pf-score">{score.p}<span style={{ opacity: .35 }}> · </span>{score.ai}</span>
          <span className="pf-stage-label">{winner ? winner : running ? "Tú · IA — a 5 puntos" : "Tú · IA"}</span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {!running && (
            <button className="pf-game-btn" onClick={() => { if (winner) init(); setRunning(true); }}>
              {winner ? "Jugar otra vez" : score.p || score.ai ? "Seguir" : "▶ Jugar"}
            </button>
          )}
          {running && <button className="pf-game-btn sec" onClick={() => setRunning(false)}>Pausa</button>}
          <button className="pf-game-btn sec" onClick={() => { setRunning(false); init(); }}>Reiniciar</button>
        </div>
      </div>
      <canvas ref={canvasRef} width={W} height={H} className="pf-pong-canvas" tabIndex={0} />
      <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-faint)", marginTop: 12, marginBottom: 0 }}>
        Mueve el ratón sobre el tablero o usa ↑ / ↓ para controlar la pala izquierda.
      </p>
    </div>
  );
}
