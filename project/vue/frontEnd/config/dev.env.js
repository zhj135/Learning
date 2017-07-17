var merge = require('webpack-merge')
var prodEnv = require('./prod.env')
console.log(merge(prodEnv, {
  NODE_ENV: '"development"'
}))
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
