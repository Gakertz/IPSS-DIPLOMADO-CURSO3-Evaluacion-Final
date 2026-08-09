import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { JWT_SECRET, JWT_EXPIRA } from '../config/jwt.js'
import { Profesor } from '../models/profesor.model.js'
import { Alumno } from '../models/alumno.model.js'

// ---------------------------------------------------------------------------
// SERVICE — autenticación. Habla con la base de datos y con bcrypt/jwt.
// El controller no toca la base directamente: llama a estas funciones.
// ---------------------------------------------------------------------------

// Firma un token con el id y el rol. Úsalo al registrar y al hacer login.
export const firmarToken = (id, rol) =>
  jwt.sign({ id, rol }, JWT_SECRET, { expiresIn: JWT_EXPIRA })

// TODO: registra un profesor.
//   - hashea la password con bcrypt (bcrypt.hash(password, 10))
//   - créalo en la base
//   - devuelve { token, profesor } (sin la password)
export const registrarProfesor = async (datos) => {
  const passwordHash = await bcrypt.hash(datos.password, 10)

  const profesor = await Profesor.create({
    ...datos,
    password: passwordHash,
  })

  const token = firmarToken(profesor._id, 'profesor')

  const profesorSeguro = profesor.toObject()
  delete profesorSeguro.password

  return {
    token,
    profesor: profesorSeguro,
  }
}
// TODO: registra un alumno (igual que el profesor).
export const registrarAlumno = async (datos) => {
  const passwordHash = await bcrypt.hash(datos.password, 10)

  const alumno = await Alumno.create({
    ...datos,
    password: passwordHash,
  })

  const token = firmarToken(alumno._id, 'alumno')

  const alumnoSeguro = alumno.toObject()
  delete alumnoSeguro.password

  return {
    token,
    alumno: alumnoSeguro,
  }
}

// TODO: login.
//   - busca al usuario por email (en Profesor y en Alumno)
//   - compara la password con bcrypt.compare(...)
//   - si coincide, devuelve { token, rol } con el rol correcto
//   - si no, devuelve null (para que el controller responda 401)
export const login = async (email, password) => {
  let usuario = await Profesor.findOne({ email })
  let rol = 'profesor'

  if (!usuario) {
    usuario = await Alumno.findOne({ email })
    rol = 'alumno'
  }

  if (!usuario) {
    return null
  }

  const passwordCorrecta = await bcrypt.compare(
    password,
    usuario.password,
  )

  if (!passwordCorrecta) {
    return null
  }

  const token = firmarToken(usuario._id, rol)

  return {
    token,
    rol,
  }
}