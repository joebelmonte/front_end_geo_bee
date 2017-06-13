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

const onGuess = function (element, code, region) {
  event.preventDefault()
  console.log('in Guess')
  console.log('element is ', element)
  console.log('code is ', code)
  console.log('region is ', region)
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
  if ($('#map-choice').val() === 'USA') {
    currentGame.map = usStates
    currentGame.currentGuess = Object.keys(usStates)[Math.floor(Math.random() * Object.keys(usStates).length)]
    console.log('currentGame.currentGuess is ', currentGame.currentGuess)
  }
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
  console.log('mapChoice is ', currentGame.map)
  console.log('difficulty level is ', currentGame.difficultyLevel)
  console.log('processOfElmination is ', currentGame.processOfElmination)
  console.log('Remaining guesses is ', currentGame.guessesRemaining)
  $('#game-state-container').html(gamePlay)
  usMap()
  $('#next-guess-prompt').text(usStates[currentGame.currentGuess])
}

const addGameHandlers = () => {
  $('#start-new-game').on('click', onStartNewGame)
}

module.exports = {
  addGameHandlers
}
