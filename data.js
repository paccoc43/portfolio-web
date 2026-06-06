/* Datos del portfolio — Francisco Sánchez Yeste
   Edita libremente: títulos, descripciones, enlaces, etiquetas. */

window.PF_DATA = {
  person: {
    name: "Francisco Sánchez Yeste",
    role: "Desarrollador creativo",
    tagline: ["Construyo ", "juegos, webs y herramientas", " con curiosidad y código."],
    lead:
      "Desarrollador creativo obsesionado con mantenerme al día en el mundo de la IA, " +
      "aprender herramientas nuevas constantemente y convertir ideas en cosas que se pueden " +
      "tocar y jugar. Entre línea y línea, videojuegos y naturaleza.",
    location: "España",
    available: "Disponible para proyectos freelance",
    email: "hola@franciscosy.dev",
    socials: [
      { label: "GitHub", href: "#" },
      { label: "LinkedIn", href: "#" },
      { label: "itch.io", href: "#" },
      { label: "Email", href: "#" },
    ],
    stats: [
      { n: "6+", l: "proyectos publicados" },
      { n: "4", l: "categorías" },
      { n: "∞", l: "herramientas por aprender" },
    ],
    skills: [
      "JavaScript", "React", "HTML/CSS", "Canvas", "Node",
      "IA / LLMs", "Prompt design", "Game dev", "UI/UX", "Git",
    ],
  },

  categories: [
    { id: "all", label: "Todos" },
    { id: "web", label: "Webs" },
    { id: "game", label: "Juegos" },
    { id: "tool", label: "Herramientas" },
    { id: "lab", label: "Experimentos" },
  ],

  projects: [
    {
      id: "pong",
      title: "Pong",
      category: "game",
      catLabel: "Juego",
      year: "2025",
      featured: true,
      playable: "pong",
      image: "images/pong.png",
      desc: "El clásico de los clásicos, reescrito desde cero en Canvas. Física de rebote, IA rival y marcador a 5.",
      long:
        "Mi homenaje al juego que lo empezó todo. Implementado a mano con la API de Canvas: " +
        "bucle de animación con requestAnimationFrame, detección de colisiones, ángulo de rebote " +
        "según el punto de impacto y una IA rival que sigue la bola con un punto de imperfección " +
        "para que sea ganable. Controla con el ratón o las flechas.",
      tags: ["Canvas", "Vanilla JS", "Game loop"],
      hue: 150,
      meta: { Rol: "Diseño + código", Stack: "HTML Canvas, JS", Tiempo: "Fin de semana", Estado: "Jugable" },
    },
    {
      id: "memorion",
      title: "Memorión",
      category: "game",
      catLabel: "Juego",
      year: "2025",
      featured: true,
      playable: "memorion",
      image: "images/memorion.png",
      desc: "Juego de memoria con cartas. Encuentra todas las parejas en el menor número de intentos.",
      long:
        "Un juego de parejas con animación de volteo en 3D (CSS transforms), barajado aleatorio " +
        "Fisher–Yates, contador de movimientos y detección de victoria. Pensado como base reutilizable " +
        "para prototipos de juegos de cartas. ¡Pruébalo aquí mismo!",
      tags: ["React", "CSS 3D", "Lógica de juego"],
      hue: 285,
      meta: { Rol: "Diseño + código", Stack: "React, CSS", Tiempo: "2 días", Estado: "Jugable" },
    },
    {
      id: "internetcheckpoint",
      title: "Internet Checkpoint",
      category: "web",
      catLabel: "Web",
      year: "2025",
      featured: true,
      playable: null,
      image: "images/internet-checkpoint.png",
      link: "#",
      desc: "Una web-experiencia que captura un instante de internet: cuánta gente está aquí, ahora mismo, contigo.",
      long:
        "Internet Checkpoint es una pausa colectiva: un punto de control donde la gente coincide en " +
        "el mismo momento de la red. Trabajé el ambiente, la tipografía y los micro-detalles para que " +
        "se sienta como un lugar, no como una página. Front en JS con animaciones cuidadas.",
      tags: ["Web", "Frontend", "Experiencia"],
      hue: 200,
      meta: { Rol: "Diseño + frontend", Stack: "JS, CSS", Tiempo: "En curso", Estado: "Online" },
    },
    {
      id: "promptlab",
      title: "Prompt Lab",
      category: "tool",
      catLabel: "Herramienta",
      year: "2026",
      featured: false,
      playable: null,
      image: "images/prompt-lab.png",
      link: "#",
      example: true,
      desc: "Banco de pruebas para iterar prompts de IA: variantes lado a lado, variables y comparación de salidas.",
      long:
        "Una herramienta para diseñar y comparar prompts de LLMs. Permite definir plantillas con variables, " +
        "lanzar varias versiones a la vez y comparar resultados en columnas. (Proyecto de ejemplo — " +
        "cámbialo por una herramienta tuya real.)",
      tags: ["IA / LLMs", "Tooling", "DX"],
      hue: 95,
      meta: { Rol: "Idea + código", Stack: "React, API", Tiempo: "—", Estado: "Ejemplo" },
    },
    {
      id: "garden",
      title: "Generative Garden",
      category: "lab",
      catLabel: "Experimento",
      year: "2026",
      featured: false,
      playable: null,
      image: "images/garden.png",
      link: "#",
      example: true,
      desc: "Jardín generativo: plantas que crecen con sistemas-L y ruido. Cada recarga, un ecosistema distinto.",
      long:
        "Experimento de arte generativo donde la naturaleza se encuentra con el código: sistemas-L para " +
        "ramificar plantas, ruido Perlin para el viento y una paleta que cambia con la hora del día. " +
        "(Proyecto de ejemplo — sustitúyelo por tu propio experimento.)",
      tags: ["Generativo", "Canvas", "Naturaleza"],
      hue: 130,
      meta: { Rol: "Exploración", Stack: "Canvas, JS", Tiempo: "—", Estado: "Ejemplo" },
    },
    {
      id: "weekend",
      title: "Tu próximo proyecto",
      category: "lab",
      catLabel: "Próximamente",
      year: "2026",
      featured: false,
      playable: null,
      image: "images/placeholder.png",
      link: "#",
      placeholder: true,
      desc: "Hueco reservado para lo siguiente que construyas. Duplica una tarjeta y rellénala cuando lo publiques.",
      long:
        "Este es un marcador para mantener el ritmo. En cuanto termines algo nuevo, edita los datos en " +
        "data.js y aparecerá aquí automáticamente.",
      tags: ["WIP"],
      hue: 40,
      meta: { Rol: "—", Stack: "—", Tiempo: "—", Estado: "En construcción" },
    },
  ],

  cv: [
    {
      when: "2024 — Hoy",
      role: "Desarrollador creativo",
      org: "Freelance / proyectos propios",
      desc: "Diseño y construyo juegos, webs y herramientas. Foco en IA aplicada, prototipado rápido y experiencias cuidadas.",
    },
    {
      when: "2023 — 2024",
      role: "Aprendizaje intensivo",
      org: "Auto-formación continua",
      desc: "Cada pocas semanas, una herramienta nueva: frameworks, APIs de IA, motores de juego. Aprender haciendo, publicando y rompiendo cosas.",
    },
    {
      when: "Siempre",
      role: "Jugador & explorador",
      org: "Videojuegos + naturaleza",
      desc: "Dos motores de inspiración: la mecánica y el game-feel de los buenos juegos, y la calma y los sistemas de la naturaleza.",
    },
  ],
};
