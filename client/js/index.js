import IFO from './components/IFO'
import Whitelist from './components/Whitelist'
import IFOButton from './components/IFOButton'

if (document.getElementById('IFO')) {
  ReactDOM.render(
  <IFO/>,
  document.getElementById('IFO')
  )
} else if (document.getElementById('Whitelist')) {
  ReactDOM.render(
  <Whitelist/>,
  document.getElementById('Whitelist')
  )
} else {
  if (document.getElementById('IFOButton0')) {
    ReactDOM.render(
    <IFOButton value="Whitelist your wallet for the Second Round of the IFO"
               mValue="Whitelist your wallet"/>,
    document.getElementById('IFOButton0')
    )
  }
  if (document.getElementById('IFOButton')) {
    ReactDOM.render(
    <IFOButton value="Whitelist your wallet for the Second Round of the IFO"
               mValue="Whitelist your wallet"/>,
    document.getElementById('IFOButton')
    )
  }
}