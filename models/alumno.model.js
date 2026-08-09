import mongoose from 'mongoose'

// ---------------------------------------------------------------------------
// MODELO — Alumno.
// ---------------------------------------------------------------------------
// TODO: define el schema del alumno. Campos (ver enunciado):
//   - nombre    (texto, obligatorio)
//   - email     (texto, único, obligatorio)
//   - telefono  (texto)
//   - password  (texto, obligatorio) → HASHEADO con bcrypt

const alumnoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    telefono: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

export const Alumno = mongoose.model('Alumno', alumnoSchema, 'alumnos')
