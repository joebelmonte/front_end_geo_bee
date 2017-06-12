'use strict'
const getFormFields = require(`../../../lib/get-form-fields`)
const api = require('./api')
const ui = require('./ui')
const store = require('../store.js')

const onStartNewGame = function (event) {
  event.preventDefault()
  console.log('in onStartNewGame')
}

const addGameHandlers = () => {
  $('#start-new-game').on('click', onStartNewGame)
}

module.exports = {
  addGameHandlers
}
