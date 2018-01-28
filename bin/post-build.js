const fs = require('fs')
const path = require('path')

let dev = fs.readFileSync(path.resolve(__dirname, '../static/debug-index.html'), 'utf-8')
    .replace(RegExp('id="prebody" integrity=""'), `id="prebody" integrity="sha256-${process.env.PREBODY}"`)

fs.writeFileSync(path.resolve(__dirname, '../static/index.html'), dev)


dev = fs.readFileSync(path.resolve(__dirname, '../static/debug-ifo-first-round.html'), 'utf-8')
.replace(RegExp('id="prebody" integrity=""'), `id="prebody" integrity="sha256-${process.env.PREBODY}"`)

fs.writeFileSync(path.resolve(__dirname, '../static/ifo-first-round.html'), dev)


