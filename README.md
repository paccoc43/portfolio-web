# Portfolio

Accede al portfolio desplegado en Vercel:

https://portfolio-web-peach-seven.vercel.app/

Portfolio personal minimalista construido con React y Babel, sin necesidad de build tools o instalación de dependencias.

## Descripción

Un sitio portafolio moderno y responsive que muestra proyectos, habilidades y experiencia. Diseñado con un enfoque mobile-first, tema oscuro por defecto y capacidad de cambio de tema en tiempo real.

### Características

- 🎨 **Tema dinámico**: Cambia entre diferentes esquemas de color
- 📱 **Responsive**: Adaptado para dispositivos móviles, tablets y desktop
- ⚡ **Sin dependencias**: React y Babel cargados desde CDN
- 🎮 **Juegos interactivos**: Mini juegos incluidos en el portafolio
- 🌙 **Tema oscuro**: Dark mode por defecto con opción de personalización
- ⚙️ **Panel de tweaks**: Personalización en vivo del sitio

## Requisitos

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Servidor web local (opcional, pero recomendado)

## Instalación y despliegue en local

### Opción 1: Abrir directamente en el navegador

1. Clona el repositorio:
```bash
git clone https://github.com/paccoc43/portfolio-web.git
cd portfolio-web
```

2. Abre `index.html` en tu navegador:
   - Windows: `start index.html`
   - macOS: `open index.html`
   - Linux: `xdg-open index.html`

### Opción 2: Con servidor local (recomendado)

#### Python
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Luego abre: `http://localhost:8000`

#### Node.js (http-server)
```bash
npm install -g http-server
http-server
```

Luego abre: `http://localhost:8080`

#### Node.js (live-server)
```bash
npm install -g live-server
live-server
```

Se abrirá automáticamente en `http://localhost:8080`

## Estructura del proyecto

```
portfolio-web/
├── index.html          # Archivo principal HTML
├── app.jsx            # Aplicación React principal
├── components.jsx     # Componentes React reutilizables
├── games.jsx          # Juegos interactivos
├── tweaks-panel.jsx   # Panel de personalización
├── data.js            # Datos del portafolio
├── theme.css          # Estilos y variables de tema
└── README.md          # Este archivo
```

## Personalización

### Editar datos del portafolio

Abre `data.js` y modifica:
- Información personal
- Proyectos
- Habilidades
- Enlaces y redes sociales

### Cambiar tema

Abre `theme.css` para personalizar:
- Colores
- Tipografía
- Espaciado
- Efectos visuales

## Navegador recomendado

- Chrome/Chromium (versión 90+)
- Firefox (versión 88+)
- Safari (versión 14+)
- Edge (versión 90+)

## Licencia

Proyecto personal. Siéntete libre de adaptarlo a tus necesidades.

## Autor

Francisco Sánchez Yeste (@paccoc43)
