import pkg from 'pg';
const { Client } = pkg;


//const obtenerDatos = async() => {

  //Conexión a la DB
  const db = new Client({
  host: 'up7.h.filess.io',
  user: 'Agencia_foxtouchup',
  password: 'ef52ea09111ec4b92270142aea0a418da0a8edc2',
  database: 'Agencia_foxtouchup',
  port: 5432
  })
  /*
  await db.connect()
  const res = await db.query('SELECT * from viajes')
  console.log(res.rows)
  await db.end()
  */
  export default db
//}
/*
obtenerDatos()
  .then((res) => {
    console.log(res)
})
*/

