import mongoose from 'mongoose'

// ---------------------------------------------------------------------------
// CONFIG — conexión a MongoDB.
// ---------------------------------------------------------------------------
// ⚠️ Reemplaza usuario-mongo y clave-secreta por los de TU cluster de Atlas.
//    (Atlas → Connect → Drivers → copia la cadena, pon tu usuario y contraseña.)
//
// ⚠️ Tu repo es PÚBLICO: no subas tu contraseña real. Deja los marcadores, o
//    apunta a una base local. Nadie debe poder entrar a tu base desde tu repo.

const MONGODB_URI =
  //'mongodb+srv://usuario-mongo:clave-secreta@cluster0.xxxxx.mongodb.net/plataforma'
  'mongodb+srv://curso3_api:curso3_api@cluster0.u6pcuvs.mongodb.net/plataforma'


export const conectar = async () => {
  await mongoose.connect(MONGODB_URI)
  console.log(`🍃 conectado a MongoDB → base "${mongoose.connection.name}"`)
}
