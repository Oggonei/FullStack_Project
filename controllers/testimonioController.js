import db from '../db/index.js';

const guardarTestimonios = async(req, res) => {
//validaciones por back
  const { nombre, correo, mensaje} = req.body
  const errores = []
  if(nombre.trim() === ''){
    errores.push({mensaje: 'Nombre vacio'})
  }
  if(correo.trim() === ''){
    errores.push({mensaje: 'Correo vacio'})
  }
  if(mensaje.trim() === ''){
    errores.push({mensaje: 'Mensaje vacio'})
  }

  if(errores.length) {
    const response = await db.query('SELECT * FROM viajes.testimonios')
    res.render('testimonios',{
      pagina: 'Testimonios',
      errores,
      nombre,
      correo,
      mensaje,
      testimonio: response.rows
    })
  } else {
    //almacenar en DB
    try {
      const text = 'INSERT INTO viajes.testimonios(nombre, correo, mensaje) VALUES($1, $2, $3)'
      const values = [`${nombre}`, `${correo}`, `${mensaje}`]
      const responmse = await db.query(text, values)
      //const responmse = await db.query(`INSERT INTO testimonios(nombre,correo,mensaje) VALUES('${nombre}', '${correo}','${mensaje}'`)
      res.redirect('/testimonios')
    } catch (error) {
      console.log('Error!!: ',error)
    }
  }
}

export {
  guardarTestimonios
}