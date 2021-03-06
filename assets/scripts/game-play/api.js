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
        'process_of_elimination': currentGame.processOfElmination,
        'map_remaining': '[' + Object.keys(currentGame.map).toString() + ',]',
        'map_completed': '[' + currentGame.mapCompleted.toString() + ',]'
      }
    }
  })
}

const patchGame = (currentGame) => {
  return $.ajax({
    url: config.apiOrigin + '/games/' + currentGame.gameId,
    method: 'PATCH',
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
        'process_of_elimination': currentGame.processOfElmination,
        'map_remaining': '[' + Object.keys(currentGame.map).toString() + ',]',
        'map_completed': '[' + currentGame.mapCompleted.toString() + ',]'
      }
    }
  })
}

const getAllGames = () => {
  return $.ajax({
    url: config.apiOrigin + '/games',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const deleteGame = (gameId) => {
  return $.ajax({
    url: config.apiOrigin + '/games/' + gameId,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const getSingleGame = (gameId) => {
  return $.ajax({
    url: config.apiOrigin + '/games/' + gameId,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  postGame,
  getAllGames,
  deleteGame,
  getSingleGame,
  patchGame
}
