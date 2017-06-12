'use strict'
const getFormFields = require(`../../../lib/get-form-fields`)
const api = require('./api')
const ui = require('./ui')
const store = require('../store.js')
const gamePlay = require('../templates/game-play.handlebars')

const onStartNewGame = function (event) {
  event.preventDefault()
  $('#game-state-container').html(gamePlay)
}

const addGameHandlers = () => {
  $('#start-new-game').on('click', onStartNewGame)
}

module.exports = {
  addGameHandlers
}
