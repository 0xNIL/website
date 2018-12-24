const tweedentity = require('tweedentity')
const sigUtil = require('eth-sig-util')
const db = require('./db').redis
const _ = require('lodash')
const Web3 = require('web3')
const request = require('superagent')
const gasUrl = 'f'

const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/' + process.env.INFURA_ID))

const IFOabi = [
  {
    'constant': true,
    'inputs': [],
    'name': 'currentState',
    'outputs': [
      {
        'name': '',
        'type': 'bytes32'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'totalSupply',
    'outputs': [
      {
        'name': '',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': '_newOwner',
        'type': 'address'
      }
    ],
    'name': 'transferTokenOwnership',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'founders',
    'outputs': [
      {
        'name': '',
        'type': 'address'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'maxPerWallet',
    'outputs': [
      {
        'name': '',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'baseAmount',
    'outputs': [
      {
        'name': '',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': '_startBlock',
        'type': 'uint256'
      },
      {
        'name': '_duration',
        'type': 'uint256'
      },
      {
        'name': '_project',
        'type': 'address'
      },
      {
        'name': '_founders',
        'type': 'address'
      },
      {
        'name': '_token',
        'type': 'address'
      }
    ],
    'name': 'startPreDistribution',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'preStartBlock',
    'outputs': [
      {
        'name': '',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'preDuration',
    'outputs': [
      {
        'name': '',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'getTokensAmount',
    'outputs': [
      {
        'name': '',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'tokenSupply',
    'outputs': [
      {
        'name': '',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [],
    'name': 'giveMeNILs',
    'outputs': [],
    'payable': true,
    'stateMutability': 'payable',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [],
    'name': 'reserveTokensProjectAndFounders',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'foundersReserve',
    'outputs': [
      {
        'name': '',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'preEndBlock',
    'outputs': [
      {
        'name': '',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'owner',
    'outputs': [
      {
        'name': '',
        'type': 'address'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'totalParticipants',
    'outputs': [
      {
        'name': '',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'projectFoundersReserved',
    'outputs': [
      {
        'name': '',
        'type': 'bool'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'projectReserve',
    'outputs': [
      {
        'name': '',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': 'newOwner',
        'type': 'address'
      }
    ],
    'name': 'transferOwnership',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'project',
    'outputs': [
      {
        'name': '',
        'type': 'address'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'token',
    'outputs': [
      {
        'name': '',
        'type': 'address'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'payable': true,
    'stateMutability': 'payable',
    'type': 'fallback'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'name': 'previousOwner',
        'type': 'address'
      },
      {
        'indexed': true,
        'name': 'newOwner',
        'type': 'address'
      }
    ],
    'name': 'OwnershipTransferred',
    'type': 'event'
  }
]
const NILabi = [
  {
    'constant': true,
    'inputs': [],
    'name': 'mintingFinished',
    'outputs': [
      {
        'name': '',
        'type': 'bool'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'name',
    'outputs': [
      {
        'name': '',
        'type': 'string'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': '_spender',
        'type': 'address'
      },
      {
        'name': '_value',
        'type': 'uint256'
      }
    ],
    'name': 'approve',
    'outputs': [
      {
        'name': '',
        'type': 'bool'
      }
    ],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'totalSupply',
    'outputs': [
      {
        'name': '',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': '_from',
        'type': 'address'
      },
      {
        'name': '_to',
        'type': 'address'
      },
      {
        'name': '_value',
        'type': 'uint256'
      }
    ],
    'name': 'transferFrom',
    'outputs': [
      {
        'name': '',
        'type': 'bool'
      }
    ],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'decimals',
    'outputs': [
      {
        'name': '',
        'type': 'uint8'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [],
    'name': 'unpause',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': '_to',
        'type': 'address'
      },
      {
        'name': '_amount',
        'type': 'uint256'
      }
    ],
    'name': 'mint',
    'outputs': [
      {
        'name': '',
        'type': 'bool'
      }
    ],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'paused',
    'outputs': [
      {
        'name': '',
        'type': 'bool'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': '_spender',
        'type': 'address'
      },
      {
        'name': '_subtractedValue',
        'type': 'uint256'
      }
    ],
    'name': 'decreaseApproval',
    'outputs': [
      {
        'name': 'success',
        'type': 'bool'
      }
    ],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [
      {
        'name': '_owner',
        'type': 'address'
      }
    ],
    'name': 'balanceOf',
    'outputs': [
      {
        'name': 'balance',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [],
    'name': 'finishMinting',
    'outputs': [
      {
        'name': '',
        'type': 'bool'
      }
    ],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [],
    'name': 'pause',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'owner',
    'outputs': [
      {
        'name': '',
        'type': 'address'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'symbol',
    'outputs': [
      {
        'name': '',
        'type': 'string'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': '_to',
        'type': 'address'
      },
      {
        'name': '_value',
        'type': 'uint256'
      }
    ],
    'name': 'transfer',
    'outputs': [
      {
        'name': '',
        'type': 'bool'
      }
    ],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': '_spender',
        'type': 'address'
      },
      {
        'name': '_addedValue',
        'type': 'uint256'
      }
    ],
    'name': 'increaseApproval',
    'outputs': [
      {
        'name': 'success',
        'type': 'bool'
      }
    ],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [
      {
        'name': '_owner',
        'type': 'address'
      },
      {
        'name': '_spender',
        'type': 'address'
      }
    ],
    'name': 'allowance',
    'outputs': [
      {
        'name': 'remaining',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [
      {
        'name': 'newOwner',
        'type': 'address'
      }
    ],
    'name': 'transferOwnership',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'anonymous': false,
    'inputs': [],
    'name': 'Pause',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [],
    'name': 'Unpause',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'name': 'to',
        'type': 'address'
      },
      {
        'indexed': false,
        'name': 'amount',
        'type': 'uint256'
      }
    ],
    'name': 'Mint',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [],
    'name': 'MintFinished',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'name': 'previousOwner',
        'type': 'address'
      },
      {
        'indexed': true,
        'name': 'newOwner',
        'type': 'address'
      }
    ],
    'name': 'OwnershipTransferred',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'name': 'owner',
        'type': 'address'
      },
      {
        'indexed': true,
        'name': 'spender',
        'type': 'address'
      },
      {
        'indexed': false,
        'name': 'value',
        'type': 'uint256'
      }
    ],
    'name': 'Approval',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'name': 'from',
        'type': 'address'
      },
      {
        'indexed': true,
        'name': 'to',
        'type': 'address'
      },
      {
        'indexed': false,
        'name': 'value',
        'type': 'uint256'
      }
    ],
    'name': 'Transfer',
    'type': 'event'
  }
]

const IFOAddress = '0x2B80455F56ca8b84E73460aC9b4db2a5e7c6030C'
const NILAddress = '0x7DEb93314090837fb33bB9a30D62C459BDFdc661'

// for debugging
const rinkebyIFOAddress = '0xf9c5d0fcd359445d5ced6631a9eaa1bc7b02d2a3'
const rinkebyNILAddress = '0xc411fa23fa0bd24753f137afd6e83da9de1dbb76'


class Provider {

  constructor() {

    this.IFOContract = web3.eth.contract(IFOabi)
    this.NILContract = web3.eth.contract(NILabi)

    this.data = {
      // totalSupply: 0,
      // totalParticipants: 0,
      // preStartBlock: 0,
      // preEndBlock: 0,
      // lastBlock: 0,
      // tokenSupply: 0,
      // safeLow: 0,
      // block_time: 0,
      // safeLowWait: 0
    }

    this.tServer = tweedentity.Server

  }

  stats(res, network, usingMetamask) {


    let gets = 0

    const response = dontCacheIt => {
      if (gets === 7) {
        res.json({
          success: true,
          stats: this.data
        })
        if (!dontCacheIt) {
          this.data.now = Date.now()
          db.set('cached-stats', JSON.stringify(this.data))
        }
      }
    }

    db.get('cached-stats', (err, val) => {
      if (false && val) {
        try {
          val = JSON.parse(val)
          if (Date.now() - val.now < 3e4) {
            this.data = val
            gets = 7
            response(true)
            return
          }
        } catch (e) {
        }
      }

      if (network === '4') {
        this.IFOInstance = this.IFOContract.at(rinkebyIFOAddress)
        this.NILInstance = this.NILContract.at(rinkebyNILAddress)
      } else {
        this.IFOInstance = this.IFOContract.at(IFOAddress)
        this.NILInstance = this.NILContract.at(NILAddress)
      }

      if (!usingMetamask) {

        this.NILInstance.totalSupply((err, result) => {

          if (result != null) {
            this.data.totalSupply = parseInt(result.valueOf().replace(/0{9}$/, ''), 10)
          }
          gets++
          response()
        })

        this.IFOInstance.totalParticipants((err, result) => {
          if (result != null) {
            this.data.totalParticipants = result.valueOf()
          }
          gets++
          response()
        })
        this.IFOInstance.tokenSupply((err, result) => {
          if (result != null) {
            this.data.tokenSupply = result.valueOf()
          }
          gets++
          response()
        })
        web3.eth.getBlockNumber((err, result) => {
          if (result != null) {
            this.data.lastBlock = result
          }
          gets++
          response()
        })

        if (!this.preStartBlock) {
          this.IFOInstance.preStartBlock((err, result) => {
            if (result != null) {
              this.data.preStartBlock = result.valueOf()
            }
            gets++
            response()
          })
        } else {
          gets++
          response()
        }
        if (!this.preEndBlock) {
          this.IFOInstance.preEndBlock((err, result) => {
            if (result != null) {
              this.data.preEndBlock = result.valueOf()
            }
            gets++
            response()
          })
        } else {
          gets++
          response()
        }
      } else {
        gets = 6
      }


      request
      .get(gasUrl)
      .set('Accept', 'application/json')
      .then(res2 => {
        gets++
        try {
          this.data.safeLow = res2.body.safeLow
          this.data.block_time = res2.body.block_time
          this.data.safeLowWait = res2.body.safeLowWait
          this.data.average = res2.body.average
          this.data.avgWait = res2.body.avgWait
        } catch (e) {
        }
        response()
      })
      .catch(function (err) {
        console.error('Http error.', err)
      })

    })

  }

  getDataByTID(webApp, userId) {
    const key = `${tweedentity.config.appIds[webApp]}/${userId}`
    return db.getAsync(key)
    .then(user => {
      if (user) {
        return Promise.resolve({
          result: JSON.parse(user)
        })
      } else {
        return this.tServer.getDataById(webApp, userId)
        .then(result => {
          db.set(key, JSON.stringify(result), 'EX', 3600)
          return Promise.resolve({
            result
          })
        })
      }
    })
  }

  isValidAddress(address) {
    return /^0x[0-9a-fA-F]{40}$/.test(address)
  }

  whitelist(identityWallet, participantWallet) {
    return db.getAsync('whitelistClosed')
    .then(result => {
      if (result) {
        return Promise.resolve({success: false, error: 'The whitelisting has been closed'})
      } else {
        return db.getAsync(`whitelist:${identityWallet}`)
      }
    })
    .then(whitelisted => {
      if (whitelisted === participantWallet) {
        return Promise.resolve({success: false, error: 'The address has been already whitelisted'})
      } else {
        return db.getAsync(`whitelisted:${participantWallet}`)
        .then(whitelister => {
          if (!whitelister) {
            return Promise.all([
              db.setAsync(`whitelist:${identityWallet}`, participantWallet),
              db.setAsync(`whitelisted:${participantWallet}`, identityWallet),
              whitelisted ? db.delAsync(`whitelisted:${whitelisted}`) : null
            ])
            .then(() => {
              return Promise.resolve({success: true})
            })
          } else {
            return Promise.resolve({success: false, error: 'The address has been whitelisted by another tweedentity'})
          }
        })
      }
    })
  }

  whitelisted(identityWallet) {
    return Promise.all([
      db.getAsync(`whitelist:${identityWallet}`),
      db.getAsync(`confirmed:${identityWallet}`)
    ])
    .then(([whitelisted, confirmed]) => {
      if (whitelisted) {
        return Promise.resolve({
          success: true,
          confirmed
        })
      } else {
        return Promise.resolve({success: false})
      }
    })
  }

  equal(a, b) {
    return a.toLowerCase() === b.toLowerCase()
  }

  login(identityWallet, token, signature) {

    if (!identityWallet || !token || !signature) {
      return Promise.resolve({success: false, error: 'Wrong parameters'})
    }
    const recovered = sigUtil.recoverTypedSignature({
      data: [
        {
          type: 'string',
          name: 'tweedentity',
          value: token
        }
      ],
      sig: signature
    })
    if (this.equal(recovered, identityWallet)) {
      const authToken = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 12)
      return db.setAsync(`authToken:${identityWallet}`, authToken)
      .then(() => {
        return Promise.resolve({success: true, authToken})
      })
    } else {
      return Promise.resolve({success: false, error: 'Wrong signature'})
    }

  }

}

module.exports = new Provider