// import React from 'react'
import {formatNumber} from '../utils'

class Stat extends React.Component {

  render() {

    return (
    <div className="column">
      <div className="rounded bord bgwhite centered lato">
        <div>{this.props.label}</div>
        <div className={'b' + (this.props.extraClass ? ' ' + this.props.extraClass : '')}
             style={{fontSize: '140%'}}>{this.props.prefix ? this.props.prefix + ' ' : ''}{formatNumber(this.props.value)}</div>
      </div>
    </div>
    )
  }
}

export default Stat