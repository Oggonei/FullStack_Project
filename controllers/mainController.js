import db from '../db/index.js';
 
//const res = await pool.query('SELECT * FROM users WHERE id = $1', [1])
//console.log('user:', res.rows[0])

const paginaInicio = async (req, res) => { // rew -> lo que enviamos => res => lo qeu express responde

  const promiseDB = [] 

  promiseDB.push(db.query('select * from viajes.viajes FETCH FIRST 3 ROWS ONLY'))
  promiseDB.push(db.query('SELECT * FROM viajes.testimonios FETCH FIRST 3 ROWS ONLY'))
  
  //console.log(promiseDB)
  //Cosultar 3 viajes del modelo
  try {

    const resultado = await Promise.all(promiseDB)
    console.log(resultado)
    res.render('inicio',{
      pagina: 'Inicio',
      clase: 'home',
      viajes: resultado[0].rows,
      testimonios: resultado[1].rows
    })
  } catch (error) {
    console.log(error)
  }
}

const paginaNosotros = (req, res) => { // rew -> lo que enviamos => res => lo qeu express responde
  res.render('nosotros',{
  pagina: 'Nosotros'
})
}

const paginaViajes = async (req, res) => { // rew -> lo que enviamos => res => lo qeu express responde

  //Consultar DB
  const response = await db.query('SELECT * FROM viajes.viajes')
  //console.log('Data:', response.rows)

  res.render('viajes',{
  pagina: 'Próximos viajes',
  viajes: response.rows
})
}

const paginaTestimonios = async (req, res) => { // rew -> lo que enviamos => res => lo qeu express responde
  try {
    const response = await db.query('SELECT * FROM viajes.testimonios')
    //console.log(response.rows)
    res.render('testimonios',{
      pagina: 'Testimonios',
      testimonios: response.rows
    })
  } catch (error) {
    console.log(error)
  }
  
}



const paginaContacto = (req, res) => { // rew -> lo que enviamos => res => lo qeu express responde
  res.send('Contacto')
}

//pagina por slug
const paginaDetalleViaje = async (req, res) => {
  const { slug } = req.params

  try {
    const response = await db.query(`SELECT * FROM viajes.viajes where slug = '${slug}'`)
    //console.log(response.rows)
    res.render('viaje', {
      pagina: 'Información detallada del viaje',
      response: response.rows
    })
  } catch (error) {
    console.log('Error: ',error)
  }
}

export {
  paginaInicio,
  paginaNosotros,
  paginaViajes,
  paginaTestimonios,
  paginaContacto,
  paginaDetalleViaje
}