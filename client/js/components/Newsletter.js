import React from 'react'
import superagent from 'superagent'
import validator from 'email-validator'
import Modal from 'react-modal'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: 'url("../img/blue-background.png")'
  }
}

class Newsletter extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      errorMessage: null,
      message: null,
      messagesOpacity: 1,
      modalIsOpen: false
    }

    this.openModal = this.openModal.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  none(e) {
    e.preventDefault()
    return false
  }

  handleChange(event) {
    this.setState({
      email: event.target.value,
      errorMessage: null,
      message: null
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    if (validator.validate(this.state.email)) {
      superagent.post('/api/v1/subscribe')
          .send({email: this.state.email})
          .set('accept', 'json')
          .end((err, res) => {
            if (res.body.success) {
              this.setState({
                message: res.body.message
              })
            } else {
              this.setState({
                errorMessage: res.body.message
              })
            }
            this.openModal()
          });
    } else {
      this.setState({errorMessage: 'Invalid email :-('})
      this.openModal()
    }
  }

  render() {
    return (
        <form onSubmit={this.none}>
          <fieldset>
            <div className="row">
              <div className="column lato whiteshadow centered">
                <div style={{margin: '10px'}}>
                  Subscribe to the 0xNIL newsletter
                </div>
              </div>
            </div>
            <div className="row">
              <div className="column centered"><input type="text" placeholder="Your email" value={this.state.value}
                                             onChange={this.handleChange} className="bgwhite" style={{width:'30rem', marginRight: 4}}/>
                <button className="button-black" onClick={this.handleSubmit} style={{marginLeft: 4}}>Subscribe to updates</button>
              </div>
            </div>
          </fieldset>
          <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              style={customStyles}
              contentLabel="Your attention please"
          >
            <b className="lato">Your attention, please</b><br/>
            {
              this.state.message
                  ? <div className="message"><i className="fa fa-thumbs-up"></i> {this.state.message}</div>
                  : this.state.errorMessage
                  ?
                  <div className="errorMessage"><i className="fa fa-exclamation-triangle"></i> {this.state.errorMessage}
                  </div>
                  : null
            }
            <div><button className="button-black" onClick={this.closeModal}>Ok</button></div>
          </Modal>
        </form>
    )
  }
}

export default Newsletter
