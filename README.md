# 🎓 Evaluación Integradora · Plataforma de Cursos

> **Diplomado IPS · Módulo 3** — Backend y APIs REST
> Instituto Profesional San Sebastián

Video demostrativo

YouTube:

<https://youtu.be/APjka1NCqxY>

---

## 🚀 Cómo empezar

Haz un **fork** para tener tu copia, clónala, e instala:

```bash
git clone https://github.com/TU-USUARIO/IPSS-DIPLOMADO-CURSO3-Evaluacion-Final.git
cd IPSS-DIPLOMADO-CURSO3-Evaluacion-Final
npm install
```

**Configura tu MongoDB:** abre `config/db.js` y reemplaza `usuario-mongo` y `clave-secreta`
por los de tu cluster de Atlas.

Levanta el servidor:

```bash
npm run dev
```

Si ves `✅ API escuchando en http://localhost:3000`, ya está. Entra a
`http://localhost:3000/` y deberías ver `{ "ok": true, ... }`.

---

## 📂 Qué hay en el repositorio

```
├── server.js              arranque (listo — solo descomenta tus rutas)
├── config/
│   ├── db.js              conexión a Mongo (pon tu cadena)
│   └── jwt.js             el secreto para firmar los tokens
├── models/                ← los 3 schemas (TÚ los defines)
│   ├── profesor.model.js
│   ├── alumno.model.js
│   └── curso.model.js
├── middlewares/
│   └── proteger.js        el guardia JWT + el filtro por rol (TÚ los completas)
├── routes/                conecta cada ruta con su controller
├── controllers/           reciben la petición y responden
└── services/              hablan con la base de datos
```

Los archivos con **`// TODO:`** son los que tienes que completar. Los demás
(`server.js`, `config/`, el manejo de errores en los `try/catch`) ya funcionan.

---

## 🗺️ El orden sugerido para resolverlo

No intentes hacerlo todo de una. Un camino que funciona:

1. **Los 3 modelos** (`models/`) — sin ellos, nada persiste.
2. **El registro y login** (`auth.*`) — para poder obtener un token.
3. **El middleware `proteger`** — para que las rutas protegidas dejen entrar.
4. **El CRUD de cursos** — crear, listar (con `.populate()`), editar, borrar.
5. **Las reglas de negocio** — asignarme, matricularme, y sus validaciones (el `409`).
6. **El `soloRol`** — para separar lo que puede el profesor de lo que puede el alumno.

Ve probando cada paso con Postman antes de seguir al siguiente.

---

## 📋 Lo que se evalúa

El enunciado completo (rutas, reglas de negocio, rúbrica y ponderación) está en el
material de la evaluación. En resumen:

- **Modelado y CRUD** — los 3 modelos, sus relaciones, y `.populate()`.
- **Reglas de negocio** — matrícula según el estado del curso, asignación "primero que
  llega", cada profesor ve solo sus cursos. **Es lo que más pesa.**
- **Autenticación y roles** — JWT + bcrypt, y el rol que restringe el acceso.
- **Códigos de estado** — el correcto en cada caso (200, 201, 400, 401, 403, 404, 409).
- **Un video** demostrando el flujo y explicando tus decisiones.

> ⚠️ Tu repositorio es **público**. No subas tu contraseña real de MongoDB: deja los
> marcadores en `config/db.js`.

---

**Instituto Profesional San Sebastián** · Diplomado · Módulo 3 — Backend y APIs REST
