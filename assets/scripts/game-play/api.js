'use strict'

const config = require('../config.js')
const store = require('../store.js')
// const currentGame = require('../current-game.js')

const postGame = (currentGame) => {
  console.log('in postGame and currentGame is ', currentGame)
  return $.ajax({
    url: config.apiOrigin + '/games',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      'game': {
        'guesses_total': currentGame.numberCompleted + currentGame.incorrectGuesses,
        'guesses_correct': currentGame.numberCompleted,
        'guesses_incorrect': currentGame.incorrectGuesses,
        'difficulty': currentGame.difficultyLevel,
        'game_complete': currentGame.gameComplete,
        'game_result': currentGame.result,
        'geography': currentGame.mapChoice
      }
    }
  })
}

module.exports = {
  postGame
}
