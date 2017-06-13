'use strict'
require('../jquery.vmap.js')
require('../jquery.vmap.usa.js')
const getFormFields = require(`../../../lib/get-form-fields`)
const api = require('./api')
const ui = require('./ui')
const store = require('../store.js')
// const usStatesArray = require('../us-states-array.js')
const usStates = require('../us-states.js')
let currentGame = require('../current-game.js')
const gamePlay = require('../templates/game-play.handlebars')

const nextTurn = function () {
  currentGame.currentGuess = Object.keys(currentGame.map)[Math.floor(Math.random() * Object.keys(currentGame.map).length)]
  currentGame.numberOfItemsRemaining = Object.keys(currentGame.map).length
  console.log('currentGame.currentGuess is ', currentGame.currentGuess)
  $('#next-guess-prompt').text(currentGame.map[currentGame.currentGuess])
  $('#incorrect-guesses').text(currentGame.incorrectGuesses)
  $('#remaining-guesses').text(currentGame.guessesRemaining)
  $('#number-completed').text(currentGame.numberCompleted)
  $('#number-remaining').text(currentGame.numberOfItemsRemaining)
}

const isGuessCorrect = function (code) {
  if (currentGame.currentGuess === code) {
    console.log('correct guess')
    currentGame.numberCompleted += 1
    $('#number-completed').text(currentGame.numberCompleted)
    currentGame.numberOfItemsRemaining -= 1
    $('#number-remaining').text(currentGame.numberOfItemsRemaining)
    delete currentGame.map[currentGame.currentGuess]
    currentGame.currentGuessCorrect = true
  }
  if (currentGame.currentGuess !== code) {
    console.log('incorrect guess')
    currentGame.incorrectGuesses += 1
    $('#incorrect-guesses').text(currentGame.incorrectGuesses)
    currentGame.guessesRemaining -= 1
    $('#remaining-guesses').text(currentGame.guessesRemaining)
    currentGame.currentGuessCorrect = false
  }
}

const checkGameOver = function () {
  if (currentGame.guessesRemaining === 0 && currentGame.difficultyLevel !== 'sudden-death') {
    currentGame.result = 'lost'
    currentGame.gameComplete = true
    return 'lost'
  }
  if (currentGame.guessesRemaining === -1 && currentGame.difficultyLevel === 'sudden-death') {
    currentGame.result = 'lost'
    currentGame.gameComplete = true
    return 'lost'
  }
  if (currentGame.numberOfItemsRemaining === 0) {
    currentGame.result = 'won'
    currentGame.gameComplete = true
    return 'won'
  } else {
    return false
  }
}

const onGuess = function (element, code, region) {
  event.preventDefault()
  console.log('in Guess')
  console.log('element is ', element)
  console.log('code is ', code)
  console.log('region is ', region)
  isGuessCorrect(code)
  if (checkGameOver() === 'won') {
    console.log('you won and currentGame.result is ', currentGame.result)
    api.postGame(currentGame)
  }
  if (checkGameOver() === 'lost') {
    console.log('you lost and currentGame.result is ', currentGame.result)
    console.log('prior to sending to the API the currentGame object is ', currentGame)
    api.postGame(currentGame)
  }
  if (checkGameOver() === false && currentGame.currentGuessCorrect === true) {
    console.log('Correct - time for another turn')
    nextTurn()
  }
  if (checkGameOver() === false && currentGame.currentGuessCorrect === false) {
    console.log('try again!')
    console.log('checkGameOver is ', checkGameOver())
    console.log('currentGame.currentGuess ', currentGame.currentGuess)
    console.log('code is ', code)
  }
}

const usMap = function () {
  console.log('in the usMap function')
  $('#vmap').vectorMap({
    map: 'usa_en',
    backgroundColor: 'rgba(0,0,0,0)',
    borderColor: '#818181',
    borderOpacity: 0.25,
    borderWidth: 1,
    color: '#f4f3f0',
    enableZoom: false,
    hoverColor: '#0033cc',
    hoverOpacity: null,
    normalizeFunction: 'linear',
    scaleColors: ['#b6d6ff', '#005ace'],
    selectedColor: '#c9dfaf',
    selectedRegions: null,
    showTooltip: false,
    // onRegionOver: function (element, code, region) {
    //   $('#map-tooltip').text(region)
    // },
    onRegionClick: function (element, code, region) {
      console.log('element is ', element)
      console.log('code is ', code)
      console.log('region is ', region)
      onGuess(element, code, region)
    }
  })
}

const onStartNewGame = function (event) {
  event.preventDefault()
  currentGame = {}
  currentGame.numberCompleted = 0
  currentGame.incorrectGuesses = 0
  currentGame.difficultyLevel = $('#difficulty-level').val()
  if (currentGame.difficultyLevel === 'hard') {
    currentGame.guessesRemaining = 3
  }
  if (currentGame.difficultyLevel === 'sudden-death') {
    currentGame.guessesRemaining = 0
  }
  if (currentGame.difficultyLevel === 'easy') {
    currentGame.guessesRemaining = Infinity
  }
  currentGame.processOfElmination = $('#process-of-elimination').val()
  currentGame.mapChoice = $('#map-choice').val()
  $('#game-state-container').html(gamePlay)
  if (currentGame.mapChoice === 'USA') {
    console.log('in map choice if statement')
    currentGame.map = usStates
    usMap()
  }
  console.log('mapChoice is ', currentGame.map)
  console.log('difficulty level is ', currentGame.difficultyLevel)
  console.log('processOfElmination is ', currentGame.processOfElmination)
  console.log('Remaining guesses is ', currentGame.guessesRemaining)
  nextTurn()
}

const addGameHandlers = () => {
  $('#start-new-game').on('click', onStartNewGame)
}

module.exports = {
  addGameHandlers
}
