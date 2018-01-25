const ls = require('local-storage')
const _ = require('lodash')
import {formatNumber} from '../utils'

import React from 'react'
import * as Scroll from 'react-scroll'
import Web3 from 'web3'
import Stat from './Stat'


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

let timerId

class IFO extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      totalSupply: 0,
      totalParticipants: 0,
      read: false,
      preStartBlock: 0,
      preEndBlock: 0,
      lastBlock: 0,
      connected: 0,
      network: null,
      accountAddress: '',
      currentBalance: -1
    }

    this.updateState = this.updateState.bind(this)
    this.acceptTac = this.acceptTac.bind(this)
    this.fetchFromApi = this.fetchFromApi.bind(this)
    this.checkAnotherWallet = this.checkAnotherWallet.bind(this)
    this.addressChange = this.addressChange.bind(this)

    if (typeof web3 != 'undefined') {
      console.log('Using web3 detected from external source like Metamask')

      this.state.connected = 1

      // this.web3 = new Web3(web3.currentProvider)

      const IFOContract = web3.eth.contract(IFOabi)
      const NILContract = web3.eth.contract(NILabi)

      web3.version.getNetwork((err, netId) => {
        switch (netId) {
          case '1':
            console.log('Connected to the Main network')
            this.state.IFOInstance = IFOContract.at(IFOAddress)
            this.state.NILInstance = NILContract.at(NILAddress)
            this.state.network = netId
            break
          case '4':
            if (!/0xnil\.org/i.test(window.location.hostname) && window.location.search == '?rinkeby=true') {
              console.log('Connected to the Rinkeby network')
              this.state.IFOInstance = IFOContract.at(rinkebyIFOAddress)
              this.state.NILInstance = NILContract.at(rinkebyNILAddress)
              this.state.network = netId
            }
          default:
            console.log('Network not supported')
        }
        if (this.state.network) {
          this.updateState()
          timerId = setInterval(this.updateState, 15e3)
        }
      })

    } else {

      console.log('Using server side api')
      if (!/0xnil\.org/i.test(window.location.hostname) && window.location.search == '?rinkeby=true') {
        this.state.network = '4'
      } else {
        this.state.network = '1'
      }
      this.fetchFromApi()
      let self = this
      timerId = setInterval(function () {
        self.fetchFromApi()
      }, 60e3)
    }
  }

  fetchFromApi() {
    let self = this
    return fetch(window.location.origin + '/api/stats', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        network: this.state.network
      }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      const stats = responseJson.stats
      this.setState({
        totalSupply: stats.totalSupply,
        totalParticipants: stats.totalParticipants,
        preStartBlock: stats.preStartBlock,
        preEndBlock: stats.preEndBlock,
        lastBlock: stats.lastBlock,
        connected: 2,
        ended: stats.preEndBlock && stats.lastBlock > stats.preEndBlock ? true : false
      })

      if (this.state.ended) {
        clearTimeout(timerId)
      } else if (stats.preStartBlock == 0) {
        clearTimeout(timerId)
        timerId = setInterval(function () {
          self.fetchFromApi()
        }, 300e3)
      }

    })
    .catch((error) => {
      console.error(error)
    })

  }


  componentDidMount() {
  }

  updateState() {

    this.state.IFOInstance.totalParticipants((err, result) => {
      if (result != null) {
        this.setState({
          totalParticipants: result.c[0]
        })
      }
    })
    this.state.NILInstance.totalSupply((err, result) => {
      if (result != null) {
        let ts = result.c[0] / 1e9
        this.setState({
          totalSupply: ts
        })
      }
    })
    web3.eth.getBlockNumber((err, result) => {
      if (result != null) {
        this.setState({
          lastBlock: result,
          ended: this.state.preEndBlock && result > this.state.preEndBlock ? true : false
        })

        if (this.state.ended) {
          clearTimeout(timerId)
        }

      }

    })

    if (!this.state.startBlock) {
      this.state.IFOInstance.preStartBlock((err, result) => {
        if (result != null) {
          this.setState({
            preStartBlock: result.c[0]
          })
        }
      })
      this.state.IFOInstance.preEndBlock((err, result) => {
        if (result != null) {
          this.setState({
            preEndBlock: result.c[0]
          })
        }
      })
    }

    if (web3.eth.defaultAccount) {
      this.state.NILInstance.balanceOf(web3.eth.defaultAccount, (err, result) => {
        if (result != null) {
          this.setState({
            currentBalance: result.c[0] / 1e9,
            accountAddress: web3.eth.defaultAccount,
            isDefaultAccount: true
          })
        }
      })
    } else {
      this.setState({
        currentBalance: -1
      })
    }
  }

  acceptTac(event) {
    this.setState({accepted: event.target.checked})
    ls('accepted', event.target.checked)
    if (event.target.checked) {
      Scroll.animateScroll.scrollToTop()
    }
  }

  checkAnotherWallet() {
    if (this.state.customAddress) {
      this.state.NILInstance.balanceOf(this.state.customAddress, (err, result) => {
        if (result != null) {
          isDefaultAccount = this.state.customAddress == web3.eth.defaultAccount
          this.setState({
            currentBalance: result.c[0] / 1e9,
            accountAddress: this.state.customAddress,
            checkingAnother: false,
            customAddress: null,
            isDefaultAccount
          })
        }
      })
    } else {
      this.setState({checkingAnother: true})
    }
  }

  addressChange(event) {
    this.setState({customAddress: event.target.value})
  }

  render() {


    // console.log(this.state)

    let ifoStarted = this.state.preStartBlock && this.state.lastBlock >= this.state.preStartBlock ? true : false

    let averageParticipation = 0
    let left = '-'

    if (this.state.totalSupply && this.state.totalParticipants) {
      averageParticipation = this.state.totalSupply / this.state.totalParticipants
    }

    if (ifoStarted) {
      left = this.state.preEndBlock - this.state.lastBlock
      if (left < 0) {
        left = '-'
      } else {
        left++
      }
    }

    let extraStyle = {
      minHeight: 168
    }

    // }

    // console.log(this.state.totalSupply)

    let instructionsTitle = <div style={{fontSize: '150%'}}>Instructions to participate</div>

    let instructionsContent = <div>Please, read carefully the terms and conditions below and accept them to see the
      instructions.</div>

    let address = this.state.network == '1' ? IFOAddress
    : this.state.network == '4' ? rinkebyIFOAddress : null

    if (this.state.ended) {
      instructionsTitle = ''
      instructionsContent = ''

    } else if (ls('accepted')) {

      let notStartedYet = ''
      if (!ifoStarted) {
        if (this.state.preStartBlock) {
          const blks = this.state.preStartBlock - this.state.lastBlock
          const mins = formatNumber(blks * 15 / 60)

          notStartedYet =
          <div className="rounded darkblue">Your attention, please!<br/>The distribution is not started yet. It will
            start in {blks} blocks, about {mins} minutes. If you send anything before then, you will consume gas for
            nothing.</div>
        } else {
          notStartedYet =
          <div className="rounded darkblue">Your attention, please!<br/>The distribution hasn't been initialized yet. It
            will be initialized on Sunday 28th. Don't send anything before the 9am PST of Monday, January 29th, because
            your transaction would fail and you would consume gas for nothing.</div>
        }
      }


      instructionsContent = this.state.ended ? '' :
      <div>{notStartedYet}
        <div className="pt10">To receive 5,000 NIL for free, send 0 ETH to the address
        </div>
        <div className="b">
          {address}
        </div>
        <div>after than the IFO is started and before than it ends.
        </div>

        <div className="pt10">To receive more NIL, you can repeat the operation, until you reach the cap of 30,000 NIL
          per wallet.
        </div>
        <div className="pt10">
          If your wallet refuses to send 0 ETH, add the following data:<br/><b>0x7a0c396d</b>
        </div>
        <div className="pt10">
          Set the maximum gas at 60,000 or whatever you wallet suggests.
        </div>
        <div className="pt10">
          To minimize the cost of the transaction, look at <a className="dark" href="https://ethgasstation.info"
                                                              target="_blank">ETH Gas Station</a> to check the current
          Gas Price Std and Gas Price SafeLow.
        </div>
      </div>

    }

    if (!address) {
      instructionsContent =
      <div>You are not connected to the Ethereum Main Network. Please change the network in your in browser wallet
        (Metamask, etc.).</div>
    }

    let tac = <div style={{paddingTop: 32, paddingBottom: 32}}>
      <div className={'container tacContainer rounded ' + (ls('accepted') ? 'accepted' : '')}>
        <div className="row padded">
          <div className="column column-100 b bigger lato">Terms and Conditions</div>
        </div>
        <div className="row">
          <div className="column column-100 lato tac">
            <div>0xNIL is a simple experiment, and there is neither a value in the token itself nor a product behind
              the token.
            </div>
            <div>

              Participating, I declare that:
            </div>
            <div>

              I have read everything on the <a href="https://0xnil.org" target="_blank">home page of the official
              website</a>, I also have
              read the <a href="http://bit.ly/0xNIL1" target="_blank">intro to the project</a>, and I understand what
              this experiment is about.

            </div>
            <div>
              I agree that:
            </div>
            <div>

              The price of a NIL is set at zero, implying that there is no intrinsic value in the token.
            </div>
            <div>
              In addition
              there has been no exchange of goods or services in return for the NIL tokens and no value has been
              provided in exchange for the NIL tokens received.
            </div>
            <div>
              Any time that I will send 0 ether to the IFO address, during this first round of distribution, I will
              receive 5,000 NIL tokens, until I reach the maximum of 30,000 tokens per wallet. Sending 0 ether after
              reaching the cap will generate an error, and the transaction will be reverted, consuming gas for
              nothing.
            </div>
            <div>
              I will receive the NILs as soon as the transaction is confirmed. However, the NIL will be transferable
              only at the end of the second round of distribution which is anticipated to take place towards the end of
              February 2018.
            </div>
            <div>
              The goal of the experiment is to understand what happens when a token without a product behind it and
              with no value at all is distributed to people who request it. This implies that this Initial
              Free Offering is not an opportunity for investment and there are no reasonable expectations that the
              token will be traded in the future and will acquire any value. Despite that, anyone who will receive the
              token will be free to do with the token what they like to do with it, in the spirit of the experiment.
            </div>
            <div>
              Specifically, I agree that this is not an investment and I am just participating in an experiment,
              understanding that nobody knows what will be of the NIL in the future.
            </div>
            <div>
              I understand that for any token which will be distributed, another token will be minted for the project
              itself and the
              team. It is so for two reasons: (1) to simulate as best as possible the typical behavior of an Initial
              Coin Offering; (2) to allow the project to evolve using the NIL in future projects. This means that the
              total supply at the end of the first round will be two times the tokens distributed to the participants.
            </div>
            <div>
              I can't request NIL from an exchange or from any wallet which is unable to receive generic ERC20 tokens.
              For this reason, I will send 0 ether from a supported wallet (like MyEtherWallet, Metamask, Parity, or
              Mist), a wallet of which I own the private key.
            </div>
            <div>
              It is not the first time that I participate in a token distribution, and I know what I am doing
              technically.
            </div>
            <div>
              It is clear to me that if I send more than 0 ether, I will receive 5,000 NIL exactly as I was sending 0
              ether. Moreover, in case I send any amount of ether different than zero, I am donating that amount to
              the project, and I won't be refunded for any reason.
            </div>
            <div>
              I am not a citizen, or a resident, of a country which considers requesting tokens which don't have any
              value an illegal action.
            </div>
            <div>
              Each jurisdiction has separate rules concerning taxation of crypto currency transactions. While the price
              is set at 0 ETH for the NIL tokens with a 0 value, we are not and have not provided any opinion on the tax
              consequences of such an exchange. Please consult your tax advisor.
            </div>
            <div>
              <input type="checkbox" onChange={this.acceptTac}
                     checked={ls('accepted') ? true : false}/> I have read carefully and I agree with everything above.

            </div>

          </div>


        </div>
      </div>
    </div>

    let instructions = instructionsTitle || instructionsContent ?
    <div className="rounded bord bgwhite mtp16" style={extraStyle}>

      {instructionsTitle}
      {instructionsContent}
    </div> : ''


    let currentBalance
    if (this.state.connected == 1) {

      let checkAnother = <div onClick={this.checkAnotherWallet} className="link pt16">Check another wallet</div>

      if (this.state.checkingAnother) {
        checkAnother = <div className="pt16">Wallet address
          <input type="text" onChange={this.addressChange}/>
          <button className="button-black" onClick={this.checkAnotherWallet}>Check</button>

        </div>
      }

      // 0x6958De0121F4452FD10f43d2084f851019453794

      if (this.state.currentBalance != -1) {
        currentBalance = <div className="rounded bgwhite lato" style={{fontSize: '40%'}}>There
          are <b>{formatNumber(this.state.currentBalance)}</b> confirmed NIL in the wallet
          at <b>{this.state.accountAddress}</b>
          {
            this.state.currentBalance == 30000
            ?
            <div className="red mt8">If this is yours, be careful, you reached the cap. Don't request more NIL from this
              address, the request would fail.</div>
            // : ifoStarted && !this.state.ended && this.state.isDefaultAccount
            // ? <div className="pt10"><button className="button-black">Request 5,000 NIL now</button></div>
            : ''
          }
          {checkAnother}
        </div>
      }
    }

    return (
    <div>
      <div className="cover pt22 pb16">
        <div className="container">
          <div className="row">
            <div className="column pt16"><a href="/"><img src="img/logoH.png" style={{width: 300, border: 0}}/></a>
              <div className=" darkblue bord rounded ifoname">Initial Free Offering — First Round<br/>

                <div
                className="rounded lato status">{!this.state.network ? 'UNKNOWN STATUS (WRONG NETWORK)' : ifoStarted && !this.state.ended ? 'THE DISTRIBUTION IS ACTIVE' : this.state.ended ? 'THE DISTRIBUTION IS ENDED' : 'THE DISTRIBUTION IS NOT STARTED YET'}</div>

                {currentBalance}


              </div>

            </div>
            <div className="column lato">

              {instructions}
            </div>
          </div>
          <div id="stats " className="row" style={{paddingTop: 16, paddingBottom: 16}}>
            <Stat label="Token Supply" value={this.state.totalSupply}/>
            <Stat label="Participants" value={this.state.totalParticipants}/>
            <Stat label="AVG per wallet" value={averageParticipation}/>
            <Stat label="Starting block" value={this.state.preStartBlock}/>
            <Stat label="Ending block" value={this.state.preEndBlock}/>
            <Stat label="Blocks before end" value={left}/>
          </div>
        </div>
      </div>
      {tac}
    </div>
    )
  }
}

export default IFO
