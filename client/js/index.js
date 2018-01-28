// import 'babel-polyfill'
// import React from 'react'
// import ReactDOM from "react-dom"
import IFO from './components/IFO'
import IFOButton from './components/IFOButton'

if (document.getElementById('IFO')) {
  ReactDOM.render(
  <IFO/>,
  document.getElementById('IFO')
  )
}

if (document.getElementById('IFOButton0')) {
  ReactDOM.render(
  <IFOButton value="Participate to the first round of the Initial Free Offering"
             mValue="Participate to the First Round"/>,
  document.getElementById('IFOButton0')
  )
}

if (document.getElementById('IFOButton')) {
  ReactDOM.render(
  <IFOButton value="Participate to the First Round"
             mValue="Participate to the First Round"/>,
  document.getElementById('IFOButton')
  )
}
