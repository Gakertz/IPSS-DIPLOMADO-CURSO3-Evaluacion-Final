import * as service from '../services/curso.service.js'

// ---------------------------------------------------------------------------
// CONTROLLERS — cursos. Aquí viven las reglas de negocio.
// El id y el rol del usuario que hace la petición vienen en req.usuario
// (lo puso el middleware `proteger` desde el token).
// ---------------------------------------------------------------------------

// GET /api/cursos — todos los cursos (con populate de profesor y alumnos).
export const listar = async (req, res) => {
  try {
    const cursos = await service.listarCursos()
    res.status(200).json(cursos)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// POST /api/cursos — crea un curso (nace EN_MATRICULA, sin profesor).
export const crear = async (req, res) => {
  try {
    const curso = await service.crearCurso(req.body)
    res.status(201).json(curso)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export const editar = async (req, res) => {
  try {
    const curso = await service.editarCurso(
      req.params.id,
      req.body,
    )
    if (!curso) {
      return res.status(404).json({
        error: 'Curso no encontrado',
      })
    }
    res.status(200).json(curso)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// DELETE /api/cursos/:id — borra un curso.
export const borrar = async (req, res) => {
  try {
    const curso = await service.borrarCurso(req.params.id)
    if (!curso) {
      return res.status(404).json({
        error: 'Curso no encontrado',
      })
    }
    res.status(200).json({
      mensaje: 'Curso eliminado correctamente',
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// GET /api/cursos/mis-cursos — los cursos que dicta ESTE profesor.
export const misCursos = async (req, res) => {
  try {
    // TODO: filtra los cursos por profesor = req.usuario.id.
    const cursos = await service.cursosDelProfesor(
      req.usuario.id,
    )
    res.status(200).json(cursos)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// POST /api/cursos/:id/asignarme — el profesor se asigna un curso libre.
export const asignarme = async (req, res) => {
  try {
    // TODO — REGLA DE NEGOCIO:
    //   1. Busca el curso. Si no existe → 404.
    //   2. Si YA tiene profesor → 409 (nadie se lo quita a otro).
    //   3. Si está libre → asígnale req.usuario.id como profesor. Guarda.
    const curso = await service.buscarCurso(req.params.id)
    if (!curso) {
      return res.status(404).json({
        error: 'Curso no encontrado',
      })
    }
    if (curso.profesor) {
      return res.status(409).json({
        error: 'El curso ya tiene un profesor asignado',
      })
    }
    curso.profesor = req.usuario.id
    await curso.save()
    res.status(200).json(curso)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// GET /api/cursos/:id/alumnos — solo el profesor que dicta el curso.
export const alumnosDelCurso = async (req, res) => {
  try {
    // TODO — REGLA DE PROPIEDAD:
    //   1. Busca el curso. Si no existe → 404.
    //   2. Si el profesor del curso NO es req.usuario.id → 403.
    //   3. Devuelve la lista de alumnos (con populate).
    const curso = await service.buscarCurso(req.params.id)
    if (!curso) {
      return res.status(404).json({
        error: 'Curso no encontrado',
      })
    }
    if (
      !curso.profesor ||
      curso.profesor.toString() !== req.usuario.id
    ) {
      return res.status(403).json({
        error: 'No tienes permiso para ver los alumnos de este curso',
      })
    }
    await curso.populate('alumnos', '-password')
    res.status(200).json(curso.alumnos)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// GET /api/cursos/mis-matriculas — los cursos donde está matriculado ESTE alumno.
export const misMatriculas = async (req, res) => {
  try {
    // TODO: filtra los cursos que tengan a req.usuario.id en su array de alumnos.
    const cursos = await service.cursosDelAlumno(
      req.usuario.id,
    )
    res.status(200).json(cursos)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// POST /api/cursos/:id/matricularme — el alumno se matricula a sí mismo.
export const matricularme = async (req, res) => {
  try {
    // TODO — REGLA DE NEGOCIO:
    //   1. Busca el curso. Si no existe → 404.
    //   2. Si NO está EN_MATRICULA → 409 (curso cerrado).
    //   3. Si el alumno YA está en el curso → 409 (no duplicar).
    //   4. Agrega req.usuario.id al array de alumnos. Guarda.
    const curso = await service.buscarCurso(req.params.id)
    if (!curso) {
      return res.status(404).json({
        error: 'Curso no encontrado',
      })
    }
    if (curso.estado !== 'EN_MATRICULA') {
      return res.status(409).json({
        error: 'El curso no se encuentra en periodo de matricula',
      })
    }
    const yaMatriculado = curso.alumnos.some(
      (alumnoId) =>
        alumnoId.toString() === req.usuario.id,
    )
    if (yaMatriculado) {
      return res.status(409).json({
        error: 'El alumno ya esta matriculado en este curso',
      })
    }
    curso.alumnos.push(req.usuario.id)
    await curso.save()
    res.status(200).json(curso)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// DELETE /api/cursos/:id/matricularme — el alumno se sale del curso.
export const desmatricularme = async (req, res) => {
  try {
    // TODO:
    //   1. Busca el curso. Si no existe → 404.
    //   2. Si NO está EN_MATRICULA → 409.
    //   3. Quita a req.usuario.id del array de alumnos. Guarda.
    const curso = await service.buscarCurso(req.params.id)
    if (!curso) {
      return res.status(404).json({
        error: 'Curso no encontrado',
      })
    }
    if (curso.estado !== 'EN_MATRICULA') {
      return res.status(409).json({
        error: 'El curso no se encuentra en periodo de matricula',
      })
    }
    curso.alumnos = curso.alumnos.filter(
      (alumnoId) =>
        alumnoId.toString() !== req.usuario.id,
    )
    await curso.save()
    res.status(200).json(curso)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

