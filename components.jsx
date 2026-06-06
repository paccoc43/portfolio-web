/* Componentes de UI del portfolio. Exportados a window. */

const { useState: useStateC, useEffect: useEffectC, useRef: useRefC } = React;

/* ---- Placeholder de imagen con rayas sutiles según el hue del proyecto ---- */
function ProjectArt({ hue, label }) {
  const style = {
    background:
      `repeating-linear-gradient(135deg,
        oklch(0.62 0.11 ${hue} / 0.16) 0px,
        oklch(0.62 0.11 ${hue} / 0.16) 2px,
        transparent 2px, transparent 13px),
       radial-gradient(120% 120% at 80% 10%,
        oklch(0.62 0.13 ${hue} / 0.20), transparent 60%),
       var(--bg-sunken)`,
  };
  return (
    <div className="ph" style={style} aria-hidden="true">
      <span className="label">{label}</span>
    </div>
  );
}

/* ---- Iconos mínimos (trazo) ---- */
function Icon({ name, size = 18 }) {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };
  const paths = {
    sun: <g><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></g>,
    moon: <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />,
    play: <path d="M6 4l14 8-14 8z" />,
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
    ext: <g><path d="M14 4h6v6" /><path d="M20 4l-9 9" /><path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" /></g>,
    leaf: <g><path d="M11 20A7 7 0 0 1 4 13c0-5 5-9 16-9 0 9-4 13-9 13z" /><path d="M4 20c3-4 6-6 10-7" /></g>,
    pin: <g><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" /><circle cx="12" cy="10" r="2.4" /></g>,
  };
  return <svg {...p}>{paths[name]}</svg>;
}

/* ---- Nav ---- */
function Nav({ data, mode, onToggleMode, theme }) {
  const go = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 70, behavior: "smooth" });
  };
  return (
    <nav className="pf-nav">
      <div className="pf-nav-in">
        <div className="pf-brand">
          <span className={"mark" + (theme === "terminal" ? " term" : "")}>{theme === "terminal" ? "" : "F"}</span>
          <span>{data.person.name.split(" ")[0]} {data.person.name.split(" ")[1]}</span>
        </div>
        <div className="pf-navlinks">
          <button className="pf-navlink" onClick={() => go("proyectos")}>Proyectos</button>
          <button className="pf-navlink hide-sm" onClick={() => go("sobre")}>Sobre mí</button>
          <button className="pf-navlink hide-sm" onClick={() => go("cv")}>CV</button>
          <button className="pf-navlink" onClick={() => go("contacto")}>Contacto</button>
          <button className="pf-iconbtn" onClick={onToggleMode} aria-label="Cambiar modo" title="Modo claro / oscuro">
            <Icon name={mode === "dark" ? "sun" : "moon"} />
          </button>
        </div>
      </div>
    </nav>
  );
}

/* ---- Hero ---- */
function Hero({ data }) {
  const p = data.person;
  return (
    <header className="pf-hero pf-shell" id="top">
      <div className="pf-eyebrow"><span className="dot" /> {p.role} · {p.location}</div>
      <h1 className="pf-h1">{p.tagline[0]}<span className="accent">{p.tagline[1]}</span>{p.tagline[2]}</h1>
      <p className="pf-lead">{p.lead}</p>
      <div className="pf-cta-row">
        <button className="pf-btn primary" onClick={() => { const e = document.getElementById("proyectos"); if (e) window.scrollTo({ top: e.offsetTop - 70, behavior: "smooth" }); }}>
          Ver proyectos <Icon name="arrow" size={17} />
        </button>
        <button className="pf-btn ghost" onClick={() => { const e = document.getElementById("contacto"); if (e) window.scrollTo({ top: e.offsetTop - 70, behavior: "smooth" }); }}>
          Hablemos
        </button>
      </div>
      <div className="pf-stats">
        {p.stats.map((s, i) => (
          <div className="pf-stat" key={i}>
            <div className="n">{s.n}</div>
            <div className="l">{s.l}</div>
          </div>
        ))}
      </div>
    </header>
  );
}

/* ---- Card ---- */
function ProjectCard({ project, onOpen, big }) {
  return (
    <article className={"pf-card" + (big ? "" : " span4")} onClick={() => onOpen(project)}>
      <div className="pf-card-art">
        {project.image ? (
          <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <ProjectArt hue={project.hue} label={project.playable ? "jugable ↗" : project.placeholder ? "próximamente" : "captura del proyecto"} />
        )}
        <span className={"pf-badge" + (project.example || project.placeholder ? " muted" : "")}>{project.catLabel}</span>
        {project.playable && <span className="pf-play-hint"><Icon name="play" size={14} /></span>}
      </div>
      <div className="pf-card-body">
        <div className="pf-card-top">
          <h3 className="pf-card-title">{project.title}</h3>
          <span className="pf-card-year">{project.year}</span>
        </div>
        <p className="pf-card-desc">{project.desc}</p>
        <div className="pf-tags">
          {project.tags.map((t, i) => <span className="pf-tag" key={i}>{t}</span>)}
        </div>
      </div>
    </article>
  );
}

/* ---- About ---- */
function About({ data }) {
  const p = data.person;
  return (
    <section className="pf-section pf-shell" id="sobre">
      <div className="pf-sec-head">
        <div>
          <div className="pf-kicker">Sobre mí</div>
          <h2 className="pf-h2">Curiosidad como método</h2>
        </div>
      </div>
      <div className="pf-about">
        <div>
          <p className="pf-about-lead">
            Soy {p.name}, desarrollador creativo. Me muevo entre el código que funciona y el que se disfruta.
          </p>
          <div className="pf-about-body">
            <p>
              Lo que más me engancha es el momento en que una idea pasa de la cabeza a algo que se puede
              tocar, romper y mejorar. Por eso construyo cosas variadas: un día un juego, otro una web, otro
              una herramienta que me ahorra trabajo.
            </p>
            <p>
              Sigo de cerca el mundo de la IA y los LLMs, y me obligo a aprender una herramienta nueva cada
              poco tiempo: es mi forma de no oxidarme. Cuando cierro el portátil, hay videojuegos —de los que
              estudio el game-feel— y naturaleza, que es donde recargo las ideas.
            </p>
          </div>
        </div>
        <aside className="pf-about-aside">
          <p className="pf-aside-h">Herramientas & habilidades</p>
          <div className="pf-skills">
            {p.skills.map((s, i) => <span className="pf-skill" key={i}>{s}</span>)}
          </div>
          <div className="pf-nowrow"><span className="ico"><Icon name="leaf" size={17} /></span> {p.available}</div>
          <div className="pf-nowrow" style={{ marginTop: 14, paddingTop: 14 }}><span className="ico"><Icon name="pin" size={17} /></span> {p.location}</div>
        </aside>
      </div>
    </section>
  );
}

/* ---- CV ---- */
function CV({ data }) {
  return (
    <section className="pf-section pf-shell" id="cv">
      <div className="pf-sec-head">
        <div>
          <div className="pf-kicker">Trayectoria</div>
          <h2 className="pf-h2">CV & experiencia</h2>
        </div>
      </div>
      <div className="pf-cv">
        {data.cv.map((c, i) => (
          <div className="pf-cv-item" key={i}>
            <div className="pf-cv-when">{c.when}</div>
            <div>
              <h3 className="pf-cv-role">{c.role}</h3>
              <div className="pf-cv-org">{c.org}</div>
              <p className="pf-cv-desc">{c.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---- Footer ---- */
function Footer({ data }) {
  const p = data.person;
  return (
    <footer className="pf-footer" id="contacto">
      <div className="pf-shell">
        <div className="pf-foot-grid">
          <h2 className="pf-foot-big">¿Construimos algo juntos? <a href={"mailto:" + p.email} style={{ color: "var(--accent)" }}>Escríbeme</a>.</h2>
          <div className="pf-socials">
            {p.socials.map((s, i) => <a className="pf-soc" key={i} href={s.href}>{s.label} ↗</a>)}
          </div>
        </div>
        <div className="pf-foot-meta">
          <span>© {new Date().getFullYear()} {p.name}</span>
          <span>Hecho con código y curiosidad</span>
        </div>
      </div>
    </footer>
  );
}

/* ---- Modal de detalle ---- */
function Modal({ project, onClose }) {
  useEffectC(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  if (!project) return null;
  const Game = project.playable === "pong" ? window.PongGame : project.playable === "memorion" ? window.MemorionGame : null;

  return (
    <div className="pf-modal-wrap">
      <div className="pf-modal-bg" onClick={onClose} />
      <div className="pf-modal" role="dialog" aria-modal="true">
        <div className="pf-modal-head">
          <div>
            <h2 className="pf-modal-title">{project.title}</h2>
            <div className="pf-modal-meta">
              <span>{project.catLabel}</span><span>·</span><span>{project.year}</span>
              {project.playable && <><span>·</span><span style={{ color: "var(--accent)" }}>jugable aquí</span></>}
            </div>
          </div>
          <button className="pf-close" onClick={onClose} aria-label="Cerrar">✕</button>
        </div>
        <div className="pf-modal-body">
          {Game ? (
            <div className="pf-stage"><Game /></div>
          ) : (
            <div className="pf-stage" style={{ padding: 0, overflow: "hidden" }}>
              <div style={{ aspectRatio: "16/8", position: "relative" }}>
                <ProjectArt hue={project.hue} label={project.placeholder ? "próximamente" : "captura / demo del proyecto"} />
              </div>
            </div>
          )}
          <p className="pf-modal-desc">{project.long}</p>
          <div className="pf-modal-grid">
            {Object.entries(project.meta).map(([k, v]) => (
              <div key={k}><div className="k">{k}</div><div className="v">{v}</div></div>
            ))}
          </div>
          {project.link && !project.placeholder && (
            <div style={{ marginTop: 20 }}>
              <a className="pf-btn primary" href={project.link}>Visitar proyecto <Icon name="ext" size={16} /></a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Icon, Nav, Hero, ProjectCard, ProjectArt, About, CV, Footer, Modal });
