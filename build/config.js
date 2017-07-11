'use strict'
const pkg = require('../package')

module.exports = {
  port: 4000,
  title: 'firebird',
  // when you use electron please set to relative path like ./
  // otherwise only set to absolute path when you're using history mode
  // TODO: Figure out a way to have this set the same for dev and prod. Right now need the ./ if
  // not serving off the base path
  //publicPath: './',
  publicPath: "/"
}
