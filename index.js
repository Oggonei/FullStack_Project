// Antigua forma
/*
const express = require('express')
const app = express()

//definir puerto
const puerto = process.env.PORT || 4000;

app.listen(puerto,() => {
  console.log('Servidor iniciado en el puerto 4000')
})
*/

//nueva forma
import express from "express";
import router from "./routes/index.js";
import db from "./db/index.js";

const app = express()

//conectar DB
await db.connect()
  .then(() => console.log('Base de datos conectada'))
  .catch((e) => console.log('Error conectando: ',e))

//const res = await db.query('SELECT * from viajes')
//console.log('data:',res.rows[0])

//definir puerto
const puerto = process.env.PORT || 4000;

//Habilitar pug
app.set('view engine','pug')

//middleware => obtener fecha
app.use( (req, res, next) => {
  const year = new Date()
  res.locals.year = year.getFullYear()
  res.locals.nombreSitio = 'Agencia de Viajes'
  next()
})

//definir carpeta publica
app.use(express.static('public'))

//agregar bodyparser para leer los datos de form
app.use(express.urlencoded({
  extended: true
}))

//agregar router
app.use('/', router)

app.listen(puerto,() => {
  console.log('Servidor iniciado en el puerto 4000')
})