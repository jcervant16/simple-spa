# jsimple-spa

**jsimple-spa** es una librería ligera que permite implementar un sistema de rutas en aplicaciones creadas con **Vanilla JavaScript**, ideal para construir **Single Page Applications (SPA)** sin necesidad de frameworks pesados.

---

## 🚀 Instalación

Instálala con **npm**:

```bash
npm install jsimple-spa
```

---

## 📖 Modo de uso

### 1. Definir rutas con `router`

La función `router` recibe como parámetro un **array de objetos** con las propiedades:

- **path** → ruta de la aplicación.
- **page** → archivo HTML que se renderizará.

```js
import { router } from "jsimple-spa";

router([
  { path: "/home", page: "./home.html" },
  { path: "/about", page: "./about.html" },
]);
```

---

### 2. Navegar entre páginas con `navigate`

Para cambiar de página dentro de la aplicación, usa la función `navigate` pasando la ruta deseada:

```js
import { navigate } from "jsimple-spa";

navigate("/home");
```

Esto actualizará el contenido dinámicamente sin recargar la página.

---

## 📌 Características

- ✨ Ligera y sin dependencias.
- ⚡ Compatible con proyectos de **Vanilla JS**.
- 📂 Permite organizar vistas en archivos HTML externos.
- 🔄 Navegación fluida entre páginas.

---

## 🛠 Ejemplo completo

```js
import { router, navigate } from "jsimple-spa";

// Configuración de rutas
router([
  { path: "/home", page: "./home.html" },
  { path: "/about", page: "./about.html" },
]);

// Navegar a /home al iniciar
navigate("/home");
```

---

## 📄 Licencia
Este proyecto está licenciado bajo los términos de la  
**GNU General Public License v3.0 o posterior (LGPL-3.0-or-later)**.  


Puedes ver una copia completa en el archivo [LICENSE](./LICENSE) de este repositorio  
o en [gnu.org/licenses/lgpl-3.0](https://www.gnu.org/licenses/lgpl-3.0).
