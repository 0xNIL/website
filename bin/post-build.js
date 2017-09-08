const fs = require('fs')
const path = require('path')

let dev = fs.readFileSync(path.resolve(__dirname, '../static/debug-only.html'), 'utf-8')

dev = dev
    .replace(RegExp('id="endbody" integrity=""'), `id="endbody" integrity="sha256-${process.env.ENDBODY}"`)
    .replace(RegExp('id="prebody" integrity=""'), `id="prebody" integrity="sha256-${process.env.PREBODY}"`)
    .replace(RegExp('id="particle" integrity=""'), `id="particle" integrity="sha256-${process.env.PARTICLE}"`)
    .replace(RegExp('id="bundle" integrity=""'), `id="bundle" integrity="sha256-${process.env.BUNDLE}"`)

fs.writeFileSync(path.resolve(__dirname, '../static/index.html'), dev)


