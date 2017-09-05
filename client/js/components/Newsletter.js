import React from 'react'
import Superagent from 'superagent'

class Newsletter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {email: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  none(e) {
    e.preventDefault()
    return false
  }

  handleChange(event) {
    this.setState({email: event.target.value});
  }

  handleSubmit(e) {
    e.preventDefault()

  }

  render() {
    return (
        <form onSubmit={this.none}>
          <fieldset>
            <div className="row">
              <div className="column lato whiteshadow">
                <div style={{margin:'10px'}}>
                  Subscribe to the 0xNIL newsletter
                </div>
              </div>
            </div>
            <div className="row">
              <div className="column"><input type="text" placeholder="Your email" value={this.state.value} onChange={this.handleChange} className="bgwhite"/>
              </div>
              <div className="column">
                <button className="button-black" onClick={this.handleSubmit}>Subscribe to updates</button>
              </div>

            </div>
          </fieldset>
        </form>
    )
  }
}

export default Newsletter
