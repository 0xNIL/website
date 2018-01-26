const express = require('express')
const router = express.Router()
const jsonParser = require('body-parser').json()
const provider = require('../lib/Provider')


router.post('/stats', jsonParser, function(req, res, next) {

  const network = req.body.network
  provider.stats(res, network)
})

router.get('/', function(req, res, next) {

        res.json({
          success: true,
          message: 'Welcome!'
        })

})



module.exports = router
