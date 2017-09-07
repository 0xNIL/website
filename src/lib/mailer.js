// const bluebird = require('bluebird')
// const email = require('emailjs')
// const Mustache = require('mustache')
// const path = require('path')
// const fs = require('./fs')
// const Logger = require('./Logger')
//
// // Use Smtp Protocol to send Email
// class Mailer {
//
//   send(to, subject, text, attachment) {
//
//     var server = email.server.connect({
//       user: "no-reply@sameteam.co",
//       password: process.env.NO_REPLY_PWD,
//       host: "smtp.gmail.com",
//       ssl: true,
//       port: 465
//     })
//
//     server.send({
//       from: "0xNIL Newsletter <no-reply@0xnil.org>",
//       to,
//       subject,
//       text,
//       attachment
//     }, function (err, res) { Logger.trace(res, err) });
//
//
//     return Promise.resolve()
//
//     //
//     //
//     return server.sendAsync({
//       from: "0xNIL Newsletter <no-reply@0xnil.org>",
//       to,
//       subject,
//       text,
//       attachment: att
//     }).then(response => {
//       Logger.trace(response.message)
//       return Promise.resolve("Message sent: " + response.message);
//     }).catch(err => {
//       console.error(err.stack)
//       return Promise.resolve(null)
//     })
//
//   }
//
//   sendConfirmationCode(to, code) {
//
//     let tmpl = fs.readFileSync(path.resolve(__dirname, '../tmpl/subscribe.html'), 'utf-8')
//     let val = {
//       code,
//       fullHost: process.env.DEBUG_MODE ? 'http://felice0' : 'https://0xnil.org'
//     }
//     let data = Mustache.render(tmpl, val)
//
//     let text = Mustache.render(`Please Confirm Your Subscription clicking the following link:
// {{fullHost}}/api/v1/subscribe?code={{code}}
// If you received this email by mistake, ignore it. You will be subscribed only if you confirm your address.
//
// For any doubt, please contact:
// info@0xNIL.org`, val)
//
//     return this.send(to, 'Confirm your subscription to 0xNIL Newsletter', text,
//         [
//           {data, alternative:true},
//           {
//             path: path.resolve(__dirname, '../../static/img/Logo_0xNIL2.png'),
//             type: "image/jpg",
//             headers: {"Content-ID": "<Logo_0xNIL2@0xnil>"}
//           }
//         ]
//     ).then(result => {
//       return {
//         success: true,
//         message: 'Message send.'
//       }
//     })
//   }
// }
//
// module.exports = new Mailer