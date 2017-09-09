const express = require('express')
const router = express.Router()
const jsonParser = require('body-parser').json()
const mailchimp = require('../lib/Mailchimp')

router.post('/subscribe', jsonParser, function(req, res, next) {

  const email = req.body.email

  mailchimp.subscribe(email) //, 'subscribed')
      .then(response => {
        res.json(response)
      })
      .catch(() => {
        res.json({
          success: false,
          message: 'Something went wrong. Try again later, please.'
        })
      })


})

router.get('/', function(req, res, next) {

        res.json({
          success: true,
          message: 'Welcome!'
        })

})



module.exports = router
