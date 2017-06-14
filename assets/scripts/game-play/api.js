'use strict'

const config = require('../config.js')
const store = require('../store.js')
// const currentGame = require('../current-game.js')

const postGame = (currentGame) => {
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
        'geography': currentGame.mapChoice,
        'map_remaining': '[' + Object.keys(currentGame.map).toString() + ',]'
      }
    }
  })
}

const getAllGames = () => {
  console.log('in getAllGames and currentGame')
  return $.ajax({
    url: config.apiOrigin + '/games',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const deleteGame = (gameId) => {
  console.log('in getAllGames and currentGame')
  return $.ajax({
    url: config.apiOrigin + '/games/' + gameId,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  postGame,
  getAllGames,
  deleteGame
}
