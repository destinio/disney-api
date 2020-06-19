const { json } = require('express')
const mongoose = require('mongoose')
const path = require('path')
const morgan = require('morgan')
const cors = require('cors')

const config = require('./config')
const router = require('../api-routes/')

module.exports = (app) => {
// connect to database
  mongoose.connect(config.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  mongoose.Promise = global.Promise
  mongoose.connection.on('error', err => {
    console.error(`${err.message}`)
  })
  mongoose.connection.once('open', function () {
    console.log('Connection Successful!')
  })
  app.use(morgan('dev'))
  app.use(cors())
  app.use(json())
  app.use('/api', router)
}