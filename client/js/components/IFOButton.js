import React from 'react'

class IFOButton extends React.Component {

  constructor(props) {
    super(props)
    this.startIFO = this.startIFO.bind(this);
  }

  componentDidMount() {
  }

  startIFO() {
    window.location = window.location.origin + '/ifo-first-round'
  }

  render() {
    return (
    <button className="button lato"
            onClick={this.startIFO}
            style={{fontSize:'120%', padding:'12px 36px', height:64,backgroundColor: '#00b0d0',borderColor: '#54f9ff'}}>{this.props.value}</button>
    )
  }
}

export default IFOButton