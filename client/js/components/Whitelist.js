const _ = require('lodash')
const tweedentityClient = require('tweedentity/Client')
const Db = require('../utils/Db')
const clientApi = require('../utils/ClientApi')
const config = require('../config')

const Auth = require('../utils/Auth')

window.DEV = /localhost/.test(location.host)

import Account from './Account'

class Whitelist extends React.Component {

  constructor(props) {
    super(props)

    this.db = new Db(data => {
      this.setState({
        data
      })
    })

    this.state = {
      connected: -1,
      connectionChecked: false,
      netId: null,
      err: null,
      loading: false,
      data: this.db.data,
      ready: -1,
      profiles: {},
      disabled: true
    }

    for (let m of [
      'getNetwork',
      'watchAccounts0',
      'getAccounts',
      'getAccountData',
      'handleChange',
      'useThisWallet',
      'handleForcing',
      'goodWallet',
      'signToken',
      'verifyAuthentication'
    ]) {
      this[m] = this[m].bind(this)
    }

    setTimeout(this.getNetwork, 100)
  }

  getNetwork() {

    if (typeof web3 !== 'undefined') {
      console.log('Using web3 detected from external source like MetaMask')

      window.web3js = this.web3js = new Web3(web3.currentProvider)
      this.tClient = new tweedentityClient(this.web3js)

      this.tClient.load()
      .then(() => {
        // console.log(this.tClient)
        this.setState({
          netId: this.tClient.netId,
          connected: 1,
          env: this.tClient.env
        })
        this.whitelist = this.web3js.eth
        .contract(config.contracts.whitelist.abi)
        .at(config.contracts.whitelist[this.tClient.env])

        this.watchAccounts0(true)
        setInterval(this.watchAccounts0, 1000)
      })
      .catch(err => {
        console.log(err)
        this.setState({
          netId: '0',
          connected: 0,
          connectionChecked: true
        })
      })


    } else {
      console.log('web3 not detected')

      this.setState({
        connected: 0,
        connectionChecked: true
      })
    }
  }

  watchAccounts0(setConnection) {
    const wallet = this.web3js.eth.accounts[0]
    if (this.state.wallet !== wallet) {
      this.setState({
        wallet,
        participantWallet: null,
        whitelisted: false
      })
      let shortWallet = wallet.substring(0, 6)
      if (!this.state.data[shortWallet]) {
        this.db.put(shortWallet, {})
      }
      this.getAccounts()
      this.verifyAuthentication()
    }
    if (setConnection) {
      this.setState({
        connectionChecked: true
      })
    }
  }

  verifyAuthentication() {

    let authToken = this.state.data[`auth-${this.shortWallet()}`]
    try {
      if (authToken && parseInt(authToken.split('.')[0], 10) < Date.now()) {
        return clientApi
        .fetch(`auth`, 'POST', {
          wallet: this.state.wallet,
          authToken: authToken
        })
        .then(json => {

          console.log('json', json)

          this.setState({
            authenticated: json.authenticated
          })
        })
      } else {
        this.setState({
          authenticated: false
        })
      }
    } catch (err) {
      this.setState({
        authenticated: false
      })
    }
  }

  isValidAddress(address) {
    return /^0x[0-9a-fA-F]{40}$/.test(address)
  }

  getAccountData(appNickname, userId) {

    return clientApi
    .fetch(`data/${appNickname}`, 'POST', {
      network: this.state.netId,
      userId
    })
    .then(json => {
      const {name, username, avatar, userId} = json.result
      const profile = {
        userId,
        name,
        username,
        avatar,
        appNickname
      }
      return Promise.resolve(profile)
    })
  }

  shortWallet() {
    return this.state.wallet ? this.state.wallet.substring(0, 6) : null
  }

  getAccounts(params = {}) {
    let isProfile = false

    let address = this.state.wallet
    if (address) {

      let count = 0

      return this.tClient.getIdentities(address, params.refresh)
      .then(result => {

        count = _.keys(result).length
        let promises = []
        for (let appNickname in result) {
          promises.push(this.getAccountData(appNickname, result[appNickname]))
        }
        return Promise.all(promises)
      })
      .then(results => {

        let data = {}

        for (let profile of results) {

          data[profile.appNickname] = profile
          this.db.put(this.shortWallet(), data)
        }

        return clientApi
        .fetch(`whitelisted`, 'POST', {
          network: this.state.netId,
          identityWallet: address
        })
        .then(json => {
          if (json.result) {
            this.setState({
              whitelisted: true,
              participantWallet: json.participantWallet
            })
          }
          return Promise.resolve()
        })
      })
    }
  }

  handleChange(e) {
    this.setState({
      participantWallet: _.trim(e.target.value)
    })
    setTimeout(this.goodWallet, 10)
  }

  handleForcing(e) {
    this.setState({
      forcedChoice: e.target.checked
    })
    setTimeout(this.goodWallet, 10)
  }


  goodWallet() {
    const wallet = this.state.participantWallet
    if (wallet && this.isValidAddress(wallet)) {

      if (wallet.toLowerCase() === this.state.wallet.toLowerCase()) {
        this.setState({
          warning: true,
          disabled: this.state.forcedChoice ? false : true
        })
      } else {
        this.setState({
          disabled: false,
          warning: false
        })
      }
    } else {

      this.setState({
        disabled: true,
        warning: false
      })

    }
  }

  useThisWallet(e) {
    e.preventDefault()
    return clientApi
    .fetch(`whitelist`, 'POST', {
      network: this.state.netId,
      participantWallet: this.state.participantWallet,
      identityWallet: this.state.wallet
    })
    .then(json => {
      if (json.result) {
        this.setState({
          whitelisted: true
        })
      } else {
        this.setState({
          error: json.error
        })
      }
      return Promise.resolve()
    })
  }

  signToken() {
    const auth = new Auth(this.web3js)
    console.log(typeof auth, typeof auth.getSignedAuthToken)

    return auth.getSignedAuthToken(this.state.wallet)
    .then(response => {
      console.log(response)
    })
  }


  render() {

    let welcome

    const state = this.state

    if (state.connectionChecked) {

      if (state.connected !== -1) {

        const netId = state.netId

        if (netId == null) {

          welcome = <div className="alert">
            <b>Web3js not found.</b> You must either install MetaMask or use a browser compatible with Ethereum like Mist, Parity or Brave. On mobile, you could use TrustWallet.
          </div>

        } else if (!(netId === '1' || (netId === '3' && DEV))) {

          welcome = <div className="alert">
            <b>Unsupported network.</b> Please connect to the Main Ethereum Network.
          </div>

        } else if (!state.wallet) {

          welcome = <div className="alert">
            <b>Wallet not found.</b> Please, activate your wallet and refresh the page.
          </div>

        } else if (_.keys(state.data[this.shortWallet()]).length > 0) {

          const twitter = <Account
          data={state.data[this.shortWallet()].twitter}
          />

          const reddit = <Account
          data={state.data[this.shortWallet()].reddit}
          />

          let whitelistWallet = <div>
            <h4>The wallet you will use to request NIL tokens</h4>
            <p>

              <input placeholder="Your ethereum wallet" type="text"
                     onChange={this.handleChange}
              />
              {
                state.warning
                ? <div className="warning">
                  <b>It is not a good idea to use your identity wallet for anything else than identity and authentication.</b><br/>
                  <input
                  type="checkbox"
                  onChange={this.handleForcing}
                  value="force"/> Use it anyway
                </div>
                : null
              }
            </p>
            <p>
              <button onClick={this.useThisWallet}
                      disabled={state.disabled}
              >Whitelist the wallet
              </button>
            </p>
          </div>

          let confirmation
          if (state.authenticated !== null && state.authenticated !== true) {
            confirmation = <p>
              <button onClick={this.signToken}>Authenticate your wallet signing a random token.</button>
            </p>
            whitelistWallet = null
          }

          welcome = <div>
            <h4>Your tweedentities</h4>
            <p>
              {twitter}
              {reddit}
            </p>
            {confirmation}
            {whitelistWallet}
          </div>

        } else {

          welcome = <span>
            <div className="alert">
            <b>No tweedentity found.</b> To whitelist a wallet to participate in the second round of the free NIL token distribution you need a tweedentity.
          </div>
            <p style={{margin: '24px 0 12px'}}><b>If you already have one, switch to your identity wallet.</b></p>
            <p><b>If not, you can set one from <a href="https://dapp.tweedentity.com"
                                                  target="_blank">the official Tweedentity DApp</a>.</b><br/>
              It will take some time, depending on how much the Ethereum network is congested. When ready, come back and whitelist the address you would like to use to request NIL tokens.
            </p>
          </span>
        }
      } else {
        welcome = <div style={{padding: '64px 0'}}>
          <p className="centered"><img src="img/spinner.svg"/></p>
          <p className="centered">Connecting to the Ethereum network and retrieving your tweedentity</p>
        </div>
      }
    } else {
      welcome = <div style={{padding: '64px 0'}}>
        <p className="centered"><img src="img/spinner.svg"/></p>
        <p className="centered">Connecting to the Ethereum network and retrieving your tweedentity</p>
      </div>
    }

    return (
    <div style={{backgroundColor: 'white', color: '#0c438B', padding: '24px 0'}}>
      <div className="container">
        <div className="row">
          <div className="column">
            <h3 className="centered">Whitelist for the Second Round of the IFO</h3>
            <div>
              {welcome}
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default Whitelist
