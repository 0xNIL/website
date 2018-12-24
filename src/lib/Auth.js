const db = require('./db').redis
const sigUtil = require('eth-sig-util')

class Auth {

  constructor() {
  }

  verifySignedAuthToken(wallet, token, signature) {

    if (!wallet || !token || !signature) {
      return Promise.resolve({
        success: false,
        error: 'Wrong parameters'
      })
    }
    const recovered = sigUtil.recoverTypedSignature({
      data: [
        {
          type: 'string',
          name: 'AuthToken',
          value: token
        }
      ],
      sig: signature
    })
    if (sigUtil.normalize(recovered) === sigUtil.normalize(wallet)) {
      const authToken = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 12)
      return Promise.resolve({
        success: true,
        authToken
      })
    } else {
      return Promise.resolve({
        success: false,
        error: 'Wrong signature'
      })
    }
  }

  confirmAuthToken(wallet, token) {

    return db.getAsync(`auth-token-${wallet}-${token}`)
    .then(authToken => {
      if (authToken) {
        return Promise.resolve({
          authenticated: true
        })
      } else {
        return Promise.resolve({
          authenticated: false
        })
      }
    })
  }

}

module.exports = new Auth