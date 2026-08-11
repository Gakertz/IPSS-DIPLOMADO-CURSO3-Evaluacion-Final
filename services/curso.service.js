import { Curso } from '../models/curso.model.js'

// ---------------------------------------------------------------------------
// SERVICE — cursos. Habla con la base de datos.
// Las REGLAS DE NEGOCIO (validar estado, propiedad, etc.) pueden ir aquí o en
// el controller: tú decides, pero que estén en el servidor, no en el cliente.
// ---------------------------------------------------------------------------

// TODO: implementa las funciones que tus controllers necesiten. Por ejemplo:
//   - listarCursos()            → Curso.find().populate('profesor').populate('alumnos')
export const listarCursos = async () => {
    return Curso.find()
        .populate('profesor', '-password')
        .populate('alumnos', '-password')
    }
//   - crearCurso(datos)
export const crearCurso = async (datos) => {
    return Curso.create(datos)
}
//   - buscarCurso(id)
export const buscarCurso = async (id) => {
    return Curso.findById(id)
}
//   - editarCurso(id, datos)
export const editarCurso = async (id, datos) => {
    return Curso.findByIdAndUpdate(
        id,
        datos,
        {
        new: true,
        runValidators: true,
        },
    )
}
//   - borrarCurso(id)
export const borrarCurso = async (id) => {
    return Curso.findByIdAndDelete(id)
}
//   - cursosDelProfesor(profesorId)
export const cursosDelProfesor = async (profesorId) => {
    return Curso.find({
        profesor: profesorId,
    })
        .populate('profesor', '-password')
        .populate('alumnos', '-password')
}
//   - cursosDelAlumno(alumnoId)
export const cursosDelAlumno = async (alumnoId) => {
    return Curso.find({
        alumnos: alumnoId,
    })
        .populate('profesor', '-password')
        .populate('alumnos', '-password')
}

// Piensa qué necesita cada ruta y crea solo lo que uses.
