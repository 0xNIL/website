require('../scss/style.scss')
import 'babel-polyfill'
import React from 'react'
import ReactDOM from "react-dom"
import Newsletter from './components/Newsletter'

ReactDOM.render(
    <Newsletter/>,
    document.getElementById('newsletter')
)
