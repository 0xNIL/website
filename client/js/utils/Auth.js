const sigUtil = require('eth-sig-util')

class Auth {

  constructor(web3js) {
    this.web3js = web3js
  }

  getSignedAuthToken(wallet, token) {
    if (!token) {
      const month = 30 * 24 * 60 * 60 * 1000
      token = `${Date.now() + month}.${Math.random().toString(36)}`
      console.log(token)
    }
    const msgParams = [
      {
        type: 'string',
        name: 'AuthToken',
        value: token
      }
    ]
    return this.web3js.currentProvider.sendAsync({
      method: 'eth_signTypedData',
      params: [
        msgParams,
        wallet
      ],
      from: wallet,
    }, (err, result) => {
      if (err || result.error) {
        return Promise.reject(new Error('Signature denied'))
      } else {
        const recovered = sigUtil.recoverTypedSignature({
          data: msgParams,
          sig: result.result
        })
        if (recovered === wallet) {
          return Promise.resolve({
            signature: result.result,
            token
          })
        } else {
          return Promise.reject(new Error('Wrong signature'))
        }
      }
    })
  }

}

module.exports = Auth