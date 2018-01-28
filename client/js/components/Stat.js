// import React from 'react'
import {formatNumber} from '../utils'

class Stat extends React.Component {

  render() {

    return (
    <div className="column">
      <div className="rounded bord bgwhite centered lato">
        <div>{this.props.label}</div>
        <div className="b" style={{fontSize: '140%'}}>{formatNumber(this.props.value)}</div>
      </div>
    </div>
    )
  }
}

export default Stat