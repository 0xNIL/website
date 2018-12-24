const express = require('express')
const router = express.Router()
const jsonParser = require('body-parser').json()
const provider = require('../lib/Provider')
const auth = require('../lib/Auth')


router.post('/stats', jsonParser, function (req, res, next) {

  const network = req.body.network
  const usingMetamask = req.body.usingMetamask
  provider.stats(res, network, usingMetamask)
})

router.get('/', function (req, res, next) {

  res.json({
    success: true,
    message: 'Welcome!'
  })
})

router.post('/data/:webApp', jsonParser, function (req, res, next) {

  const webApp = req.params.webApp

  provider.getDataByTID(webApp, req.body.userId)
  .then(result => {
    res.status(200).json(result)
  })
  .catch(err => {
    res.status(200).json({error: err.message})
  })

})

router.post('/whitelist', jsonParser, function (req, res, next) {

  const identityWallet = req.body.identityWallet.toLowerCase()
  const participantWallet = req.body.participantWallet.toLowerCase()

  provider.whitelist(identityWallet, participantWallet)
  .then(result => {
    res.status(200).json(result)
  })
  .catch(err => {
    res.status(200).json({error: err.message})
  })

})

router.post('/whitelisted', jsonParser, function (req, res, next) {

  const identityWallet = req.body.identityWallet.toLowerCase()

  provider.whitelisted(identityWallet)
  .then(result => {
    res.status(200).json(result)
  })
  .catch(err => {
    res.status(200).json({error: err.message})
  })

})

router.post('/auth', jsonParser, function (req, res, next) {

  const wallet = req.body.wallet
  const authToken = req.body.authToken

  auth.confirmAuthToken(wallet, authToken)
  .then(result => {
    res.status(200).json(result)
  })
  .catch(err => {
    res.status(200).json({error: err.message})
  })

})



module.exports = router
