// import React from 'react'

class IFOButton extends React.Component {

  constructor(props) {
    super(props)
    this.startIFO = this.startIFO.bind(this);
  }

  componentDidMount() {
  }

  startIFO() {
    window.location = window.location.origin + '/whitelist'
  }

  render() {
    return (
    <button className="button lato"
            onClick={this.startIFO}
            style={{padding:'12px 36px', height:64,backgroundColor: '#00b0d0',borderColor: '#54f9ff'}}><div className="desktop">{this.props.value}</div><div className="mobile">{this.props.mValue}</div></button>
    )
  }
}

export default IFOButton