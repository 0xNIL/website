/* globals Promise */
const request = require('superagent')

class Mailchimp {

  subscribe(email, status = 'pending') {
    const listUniqueId = process.env.MAILCHIMP_LISTID,
        mailchimpApiKey = process.env.MAILCHIMP_APIKEY,
        mailchimpInstance = mailchimpApiKey.split('-')[1]

    return request.post('https://' + mailchimpInstance + '.api.mailchimp.com/3.0/lists/' + listUniqueId + '/members/')
        .set('Content-Type', 'application/json;charset=utf-8')
        .set('Authorization', 'Basic ' + new Buffer('any:' + mailchimpApiKey).toString('base64'))
        .send({
          email_address: email,
          status
        })
        .then(() => {
          return Promise.resolve({
            success: true,
            message: 'Subscription confirmed. Thanks.'
                //'Thanks. An email has been sent to your address with further instructions.'
          })
        })
        .catch(err => {
          if (err.response.body.title === 'Member Exists') {
            return Promise.resolve({
              success: true,
              message: 'Oops, this email is already registered.'
            })
          }
          return Promise.resolve({
            success: false,
            message: 'Something went wrong. Try again later, please.'
          })
        })

  }
}

module.exports = new Mailchimp