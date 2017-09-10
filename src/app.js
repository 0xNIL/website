const express = require('express')
const path = require('path')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const rfs = require('rotating-file-stream')
const api = require('./routes/api')
const fs = require('./lib/fs')
const Logger = require('./lib/Logger')

process.on('uncaughtException', function (error) {

  Logger.error(error.message)
  Logger.error(error.stack)

  // if(!error.isOperational)
  //   process.exit(1)
})

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

const logDirectory = '/var/log/0xNIL'
fs.ensureDirSync(logDirectory)
const accessLogStream = rfs('access.log', {
  interval: '1d', // rotate daily
  path: logDirectory
})
app.use(morgan('combined', {stream: accessLogStream}))

app.use(cookieParser())

app.get('/debug-only.html', function (req, res, next) {
  if (process.env.DEBUG_MODE) {
    res.contentType('html')
    res.send(fs.readFileSync(path.resolve(__dirname, '../static/debug-only.html'), 'utf-8'))
  } else res.sendStatus(403)
})

app.use(express.static(path.resolve(__dirname, '../static')))

// app.use('/', index)
app.use('/api/v1', api)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.render('error', {
      title: 'Error',
      message: err.message,
      error: process.env.DEBUG_MODE ? err : ''
    })
  })
}

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
