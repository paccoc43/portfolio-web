/* App principal del portfolio. */

const { useState: useStateA, useEffect: useEffectA, useRef: useRefA } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "bosque",
  "mode": "light",
  "accent": "auto"
}/*EDITMODE-END*/;

const ACCENTS = {
  auto: null,
  bosque: "oklch(0.55 0.11 150)",
  oceano: "oklch(0.58 0.12 230)",
  violeta: "oklch(0.58 0.2 290)",
  ambar: "oklch(0.7 0.14 75)",
  terracota: "oklch(0.62 0.14 40)",
};

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const data = window.PF_DATA;
  const [filter, setFilter] = useStateA("all");
  const [active, setActive] = useStateA(null);

  const theme = t.theme || "bosque";
  const mode = t.mode || "light";

  // contar por categoría
  const counts = {};
  data.categories.forEach((c) => {
    counts[c.id] = c.id === "all" ? data.projects.length : data.projects.filter((p) => p.category === c.id).length;
  });

  const shown = filter === "all" ? data.projects : data.projects.filter((p) => p.category === filter);

  // reveal on scroll
  useEffectA(() => {
    const els = document.querySelectorAll(".pf-reveal");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [filter]);

  // accent override
  const rootStyle = {};
  if (t.accent && t.accent !== "auto" && ACCENTS[t.accent]) rootStyle["--accent"] = ACCENTS[t.accent];

  return (
    <div className="pf" data-theme={theme} data-mode={mode} style={rootStyle}>
      <Nav data={data} mode={mode} theme={theme} onToggleMode={() => setTweak("mode", mode === "dark" ? "light" : "dark")} />
      <Hero data={data} />

      <section className="pf-section pf-shell" id="proyectos">
        <div className="pf-sec-head pf-reveal">
          <div>
            <div className="pf-kicker">Trabajo seleccionado</div>
            <h2 className="pf-h2">Proyectos</h2>
          </div>
          <div className="pf-filters">
            {data.categories.map((c) => (
              <button key={c.id} className="pf-chip" data-on={String(filter === c.id)} onClick={() => setFilter(c.id)}>
                {c.label} <span className="cnt">{counts[c.id]}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="pf-grid">
          {shown.map((p) => (
            <div className="pf-reveal" key={p.id} style={{ display: "contents" }}>
              <ProjectCard project={p} onOpen={setActive} big={p.featured} />
            </div>
          ))}
        </div>
        {shown.length === 0 && (
          <p style={{ fontFamily: "var(--font-mono)", color: "var(--text-faint)", padding: "40px 0" }}>
            Nada por aquí todavía — pronto.
          </p>
        )}
      </section>

      <div className="pf-reveal"><About data={data} /></div>
      <div className="pf-reveal"><CV data={data} /></div>
      <Footer data={data} />

      {active && <Modal project={active} onClose={() => setActive(null)} />}

      <TweaksPanel>
        <TweakSection label="Dirección visual" />
        <TweakRadio
          label="Estilo"
          value={theme}
          options={["bosque", "terminal", "arcade"]}
          onChange={(v) => {
            setTweak("theme", v);
            // sugerir el modo que mejor le sienta a cada estilo (solo la primera vez que cambias)
            if (v === "terminal") setTweak("mode", "dark");
          }}
        />
        <TweakSection label="Modo" />
        <TweakRadio label="Luz" value={mode} options={["light", "dark"]} onChange={(v) => setTweak("mode", v)} />
        <TweakSection label="Acento" />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "2px 0" }}>
          <span style={{ fontSize: 13, opacity: .7 }}>Color</span>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {Object.keys(ACCENTS).map((k) => (
              <button
                key={k}
                onClick={() => setTweak("accent", k)}
                title={k}
                aria-label={"Acento " + k}
                style={{
                  width: 24, height: 24, borderRadius: "50%", cursor: "pointer", padding: 0,
                  outline: "none",
                  border: (t.accent || "auto") === k ? "2px solid currentColor" : "1px solid rgba(128,128,128,.4)",
                  boxShadow: (t.accent || "auto") === k ? "0 0 0 2px var(--bg-elev, #fff)" : "none",
                  background: k === "auto"
                    ? "conic-gradient(from 90deg, oklch(0.6 0.18 150), oklch(0.6 0.18 290), oklch(0.6 0.18 40), oklch(0.6 0.18 150))"
                    : ACCENTS[k],
                }}
              />
            ))}
          </div>
        </div>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
