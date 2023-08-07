// In src/index.js
const express = require('express')
require('dotenv').config();
const mercadoPagoRouter = require('./v1/routes/mercadoPagoRoutes')
const productsRouter = require('./v1/routes//productsRoutes')
const authenticationRouter = require('./v1/routes/authenticationRoutes')
const salesRouter = require('./v1/routes/salesRoutes')
const mongoose = require('mongoose');

const mongoString = process.env.DATABASE_URL;
const cors = require('cors')


mongoose.connect(mongoString);
const database = mongoose.connection;
database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected');
})

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.use('/api/v1/mercado-pago', mercadoPagoRouter)
app.use('/api/v1/auth', authenticationRouter)
app.use('/api/v1/sales', salesRouter)
app.use('/api/v1/', productsRouter)

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`)
})
