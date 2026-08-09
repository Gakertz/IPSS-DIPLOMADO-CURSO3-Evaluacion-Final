import * as service from '../services/auth.service.js'

// ---------------------------------------------------------------------------
// CONTROLLERS — autenticación.
// Cada uno recibe la petición, llama al service, y responde con el status
// correcto. Envuelve todo en try/catch para no reventar el servidor.
// ---------------------------------------------------------------------------

// POST /api/auth/registro/profesor
export const registrarProfesor = async (req, res) => {
  try {
    const resultado = await service.registrarProfesor(req.body)
    res.status(201).json(resultado)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// POST /api/auth/registro/alumno
export const registrarAlumno = async (req, res) => {
  try {
    const resultado = await service.registrarAlumno(req.body)
    res.status(201).json(resultado)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const resultado = await service.login(email, password)
    if (!resultado) {
      return res.status(401).json({
        error: 'usuario o clave incorrectos',
      })
    }
    res.status(200).json(resultado)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
