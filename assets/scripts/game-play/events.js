'use strict'
require('../jquery.vmap.js')
require('../jquery.vmap.usa.js')
// const getFormFields = require(`../../../lib/get-form-fields`)
const api = require('./api')
const ui = require('./ui')
// const store = require('../store.js')
// const usStates = require('../us-states.js')
// const usStateCapitals = require('../us-state-capitals.js')
let currentGame = require('../current-game.js')
const gamePlay = require('../templates/game-play.handlebars')
const saveAbortButtons = require('../templates/save-abort-buttons.handlebars')
const saveDiscardProgressButtons = require('../templates/save-discard-progress-buttons.handlebars')
const gameOptions = require('../templates/game-options.handlebars')
const allGamesTable = require('../templates/all-games-table.handlebars')
const backToGameOptionsButton = require('../templates/back-to-game-options-button.handlebars')
const playAgainButtons = require('../templates/play-again-buttons.handlebars')
const instructionsButton = require('../templates/instructions-button.handlebars')
const instructionsText = require('../templates/instructions-text.handlebars')

let usStates = {}
let usStateCapitals = {}
let instructionsDisplayed = false

const filterObj = function (obj, array) {
  // This function is used by the resume game feature.
  // It's need to filter the US States object to only inlcude
  // States that the user has remaining to be guessed.
  const filteredObj = {}
  for (let i = 0; i < array.length; i++) {
    filteredObj[array[i]] = obj[array[i]]
  }
  return filteredObj
}

const defineUsStates = function () {
  usStates = {
    al: 'Alabama',
    ak: 'Alaska',
    az: 'Arizona',
    ar: 'Arkansas',
    ca: 'California',
    co: 'Colorado',
    ct: 'Connecticut',
    de: 'Delaware',
    fl: 'Florida',
    ga: 'Georgia',
    hi: 'Hawaii',
    id: 'Idaho',
    il: 'Illinois',
    in: 'Indiana',
    ia: 'Iowa',
    ks: 'Kansas',
    ky: 'Kentucky',
    la: 'Louisiana',
    me: 'Maine',
    md: 'Maryland',
    ma: 'Massachusetts',
    mi: 'Michigan',
    mn: 'Minnesota',
    ms: 'Mississippi',
    mo: 'Missouri',
    mt: 'Montana',
    ne: 'Nebraska',
    nv: 'Nevada',
    nh: 'New Hampshire',
    nj: 'New Jersey',
    nm: 'New Mexico',
    ny: 'New York',
    nc: 'North Carolina',
    nd: 'North Dakota',
    oh: 'Ohio',
    ok: 'Oklahoma',
    or: 'Oregon',
    pa: 'Pennsylvania',
    ri: 'Rhode Island',
    sc: 'South Carolina',
    sd: 'South Dakota',
    tn: 'Tennessee',
    tx: 'Texas',
    ut: 'Utah',
    vt: 'Vermont',
    va: 'Virginia',
    wa: 'Washington',
    wv: 'West Virginia',
    wi: 'Wisconsin',
    wy: 'Wyoming'
  }
}

const defineUsStateCapitals = function () {
  usStateCapitals = {
    al: 'Montgomery',
    ak: 'Juneau',
    az: 'Phoenix',
    ar: 'Little Rock',
    ca: 'Sacramento',
    co: 'Denver',
    ct: 'Hartford',
    de: 'Dover',
    fl: 'Tallahassee',
    ga: 'Atlanta',
    hi: 'Honolulu',
    id: 'Boise',
    il: 'Springfield',
    in: 'Indianapolis',
    ia: 'Des Moines',
    ks: 'Topeka',
    ky: 'Frankfort',
    la: 'Baton Rouge',
    me: 'Augusta',
    md: 'Annapolis',
    ma: 'Boston',
    mi: 'Lansing',
    mn: 'Saint Paul',
    ms: 'Jackson',
    mo: 'Jefferson City',
    mt: 'Helena',
    ne: 'Lincoln',
    nv: 'Carson City',
    nh: 'Concord',
    nj: 'Trenton',
    nm: 'Santa Fe',
    ny: 'Albany',
    nc: 'Raleigh',
    nd: 'Bismarck',
    oh: 'Columbus',
    ok: 'Oklahoma City',
    or: 'Salem',
    pa: 'Harrisburg',
    ri: 'Providence',
    sc: 'Columbia',
    sd: 'Pierre',
    tn: 'Nashville',
    tx: 'Austin',
    ut: 'Salt Lake City',
    vt: 'Montpelier',
    va: 'Richmond',
    wa: 'Olympia',
    wv: 'Charleston',
    wi: 'Madison',
    wy: 'Cheyenne'
  }
}

const nextTurn = function () {
  currentGame.currentGuess = Object.keys(currentGame.map)[Math.floor(Math.random() * Object.keys(currentGame.map).length)]
  currentGame.numberOfItemsRemaining = Object.keys(currentGame.map).length
  $('#next-guess-prompt').text(currentGame.map[currentGame.currentGuess])
  $('#incorrect-guesses').text(currentGame.incorrectGuesses)
  $('#remaining-guesses').text(currentGame.guessesRemaining)
  $('#number-completed').text(currentGame.numberCompleted)
  $('#number-remaining').text(currentGame.numberOfItemsRemaining)
}

const processOfElimColoring = function (code) {
  if (currentGame.processOfElmination === 'on') {
    const processOfElimColors = {}
    processOfElimColors[code] = '#090000'
    $('#vmap').vectorMap('set', 'colors', processOfElimColors)
    $('#process-of-elimination-indicator').text(' with process of elimination on')
  }
}

const isGuessCorrect = function (code, region) {
  if (currentGame.currentGuess === code) {
    $('#game-play-feedback').text('Correct! Next question:')
    if (currentGame.mapChoice === 'U.S. State Capitals') {
      $('#game-play-feedback').text('Correct! ' + currentGame.map[currentGame.currentGuess] + ' is the capital of ' + region + '. Next question:')
    }
    currentGame.numberCompleted += 1
    currentGame.mapCompleted.push(code)
    $('#number-completed').text(currentGame.numberCompleted)
    currentGame.numberOfItemsRemaining -= 1
    $('#number-remaining').text(currentGame.numberOfItemsRemaining)
    delete currentGame.map[currentGame.currentGuess]
    currentGame.currentGuessCorrect = true
    processOfElimColoring(code)
  }
  if (currentGame.currentGuess !== code) {
    $('#game-play-feedback').text('Nope, that\'s ' + region + '. Try again...')
    if (currentGame.mapChoice === 'U.S. State Capitals') {
      $('#game-play-feedback').text('Nope, ' + currentGame.map[currentGame.currentGuess] + ' isn\'t the capital of ' + region + '. Try again...')
    }
    currentGame.incorrectGuesses += 1
    $('#incorrect-guesses').text(currentGame.incorrectGuesses)
    currentGame.guessesRemaining -= 1
    $('#remaining-guesses').text(currentGame.guessesRemaining)
    currentGame.currentGuessCorrect = false
  }
}

const onRetryGame = function () {
  $('#save-abort-buttons').html(saveAbortButtons)
  $('#save-game').on('click', onSaveGame)
  $('#abort-game').on('click', onAbortGame)
  currentGame.isResumed = false
  currentGame.result = 'In Progress'
  currentGame.isResumable = null
  currentGame.numberCompleted = 0
  currentGame.incorrectGuesses = 0
  if (currentGame.difficultyLevel === 'hard') {
    currentGame.guessesRemaining = 3
  }
  if (currentGame.difficultyLevel === 'sudden-death') {
    currentGame.guessesRemaining = 0
  }
  if (currentGame.difficultyLevel === 'easy') {
    currentGame.guessesRemaining = Infinity
  }
  $('#game-state-container').html(gamePlay)
  if (currentGame.mapChoice === 'U.S. States') {
    defineUsStates()
    currentGame.map = usStates
    $('#next-guess-prompt-outer').html('Where is <span id="next-guess-prompt"></span>?')
    usMap()
  }
  if (currentGame.mapChoice === 'U.S. State Capitals') {
    defineUsStateCapitals()
    currentGame.map = usStateCapitals
    $('#next-guess-prompt-outer').html('<span id="next-guess-prompt"></span> is the capital of what state?')
    usMap()
  }
  if (currentGame.processOfElmination === 'on') {
    $('#process-of-elimination-indicator').text(' with process of elimination on')
  }
  $('#game-map').text(currentGame.mapChoice)
  $('#game-difficulty').text(currentGame.difficultyLevel)
  currentGame.numberOfItemsRemaining = Object.keys(currentGame.map).length
  $('#game-play-feedback').text('Next question:')
  nextTurn()
}

const usMapRemoveClicks = function () {
  $('#vmap').off('click')
}

const checkGameOver = function () {
  if (currentGame.guessesRemaining < 0) {
    currentGame.result = 'Lost'
    currentGame.gameComplete = true
    currentGame.isResumable = 'No'
    $('#next-guess-prompt-outer').html('Game Over - You Lost.<br><h3>Click above to play again or return to the Game Options menu.</h3>')
    $('#game-play-feedback').text('')
    $('#save-abort-buttons').html(playAgainButtons)
    $('#retry-game').on('click', onRetryGame)
    $('#return-to-game-options').on('click', backToGameOptions)
    usMapRemoveClicks()
    $('#remaining-guesses').text('NA')
    // need to disable map click functionality
    return 'Lost'
  }
  if (currentGame.numberOfItemsRemaining === 0) {
    currentGame.result = 'Won'
    currentGame.gameComplete = true
    currentGame.isResumable = 'No'
    $('#next-guess-prompt-outer').html('Game Over - You Won! Congratulations!<br><h3>Click above to play again or return to the Game Options menu.</h3>')
    $('#game-play-feedback').text('')
    $('#save-abort-buttons').html(playAgainButtons)
    $('#retry-game').on('click', onRetryGame)
    $('#return-to-game-options').on('click', backToGameOptions)
    usMapRemoveClicks()
    return 'Won'
  } else {
    return false
  }
}

const onGuess = function (element, code, region) {
  event.preventDefault()
  isGuessCorrect(code, region)
  if (checkGameOver() === 'Won' && currentGame.isResumed === false) {
    api.postGame(currentGame)
  }
  if (checkGameOver() === 'Lost' && currentGame.isResumed === false) {
    api.postGame(currentGame)
  }
  if (checkGameOver() === 'Won' && currentGame.isResumed === true) {
    api.patchGame(currentGame)
  }
  if (checkGameOver() === 'Lost' && currentGame.isResumed === true) {
    api.patchGame(currentGame)
  }
  if (checkGameOver() === false && currentGame.currentGuessCorrect === true) {
    nextTurn()
  }
  if (checkGameOver() === false && currentGame.currentGuessCorrect === false) {
  }
}

const usMap = function () {
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
    selectedColor: null,
    selectedRegions: null,
    showTooltip: false,
    // onRegionOver: function (element, code, region) {
    //   $('#map-tooltip').text(region)
    // },
    onRegionClick: function (element, code, region) {
      onGuess(element, code, region)
    }
  })
}

const onSaveGame = function () {
  api.postGame(currentGame)
  .then(ui.saveGameSuccess)
  .then(() => {
    $('#save-abort-buttons').html('')
    showGameOptionsPage()
    addGameHandlers()
  })
  .catch(ui.saveGameFailure)
}

const onAbortGame = function () {
  currentGame = {}
  // $('#game-state-container').html(gameOptions)
  $('#save-abort-buttons').html('')
  showGameOptionsPage()
  addGameHandlers()
}

const onStartNewGame = function (event) {
  event.preventDefault()
  $('#save-abort-buttons').html(saveAbortButtons)
  $('#save-game').on('click', onSaveGame)
  $('#abort-game').on('click', onAbortGame)
  currentGame = {}
  currentGame.mapCompleted = []
  currentGame.mapCompleted.length = 0
  currentGame.isResumed = false
  currentGame.result = 'In Progress'
  currentGame.isResumable = null
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
  currentGame.mapChoice = $('#map-choice :selected').text()
  $('#game-state-container').html(gamePlay)
  if (currentGame.mapChoice === 'U.S. States') {
    defineUsStates()
    currentGame.map = usStates
    $('#next-guess-prompt-outer').html('Where is <span id="next-guess-prompt"></span>?')
    usMap()
  }
  if (currentGame.mapChoice === 'U.S. State Capitals') {
    defineUsStateCapitals()
    currentGame.map = usStateCapitals
    $('#next-guess-prompt-outer').html('<span id="next-guess-prompt"></span> is the capital of what state?')
    usMap()
  }
  $('#game-map').text(currentGame.mapChoice)
  $('#game-difficulty').text(currentGame.difficultyLevel)
  if (currentGame.processOfElmination === 'on') {
    $('#process-of-elimination-indicator').text(' with process of elimination on')
  }
  currentGame.numberOfItemsRemaining = Object.keys(currentGame.map).length
  $('#game-play-feedback').text('Next question:')
  nextTurn()
}

const deleteGame = function (event) {
  const gameId = $(event.target).attr('data-id')
  api.deleteGame(gameId)
  .then(() => {
    getAllGames()
  })
}

const onSaveProgress = function () {
  api.patchGame(currentGame)
  .then(() => {
    $('#save-abort-buttons').html('')
    showGameOptionsPage()
    addGameHandlers()
  })
}

const onDiscardProgress = function () {
  $('#save-abort-buttons').html('')
  showGameOptionsPage()
  addGameHandlers()
}

const resumeGame = function (event) {
  currentGame = {}
  const gameId = $(event.target).attr('data-id')
  currentGame.gameId = gameId
  currentGame.isResumed = true
  api.getSingleGame(gameId)
  .then((data) => {
    $('#save-abort-buttons').html(saveDiscardProgressButtons)
    $('#save-progress').on('click', onSaveProgress)
    $('#discard-progress').on('click', onDiscardProgress)
    currentGame.result = 'In Progress'
    currentGame.isResumable = null
    currentGame.numberCompleted = data.game.guesses_correct
    currentGame.incorrectGuesses = data.game.guesses_incorrect
    currentGame.difficultyLevel = data.game.difficulty
    if (currentGame.difficultyLevel === 'hard') {
      currentGame.guessesRemaining = 3 - currentGame.incorrectGuesses
    }
    if (currentGame.difficultyLevel === 'sudden-death') {
      currentGame.guessesRemaining = 0
    }
    if (currentGame.difficultyLevel === 'easy') {
      currentGame.guessesRemaining = Infinity
    }
    currentGame.mapChoice = data.game.geography
    $('#game-state-container').html(gamePlay)
    if (currentGame.mapChoice === 'U.S. States') {
      defineUsStates()
      currentGame.map = filterObj(usStates, data.game.map_remaining)
      $('#next-guess-prompt-outer').html('Where is <span id="next-guess-prompt"></span>?')
      usMap()
    }
    if (currentGame.mapChoice === 'U.S. State Capitals') {
      defineUsStateCapitals()
      currentGame.map = filterObj(usStateCapitals, data.game.map_remaining)
      $('#next-guess-prompt-outer').html('<span id="next-guess-prompt"></span> is the capital of what state?')
      usMap()
    }
    $('#game-map').text(currentGame.mapChoice)
    $('#game-difficulty').text(currentGame.difficultyLevel)
    currentGame.processOfElmination = data.game.process_of_elimination
    currentGame.mapCompleted = data.game.map_completed
    if (currentGame.processOfElmination === 'on') {
      for (let i = 0; i < currentGame.mapCompleted.length; i++) {
        processOfElimColoring(currentGame.mapCompleted[i])
      }
    }
    $('#game-play-feedback').text('Next question:')
    nextTurn()
  })
}

const backToGameOptions = function () {
  $('#save-abort-buttons').html('')
  showGameOptionsPage()
  addGameHandlers()
}

const getAllGames = function () {
  api.getAllGames()
  .then((data) => {
    for (let i = 0; i < data.games.length; i++) {
      if (data.games[i].game_complete === null) {
        data.games[i].renderResumeButton = 'yes'
      } else {
        data.games[i].renderResumeButton = null
      }
      data.games[i].percentComplete = Math.round(data.games[i].guesses_correct / (data.games[i].guesses_correct + data.games[i].map_remaining.length) * 100)
      if (data.games[i].game_result === 'Won') {
        data.games[i].percentComplete = 100
      }
    }
    const fullStatsHTML = allGamesTable({ games: data.games })
    $('#game-state-container').html(fullStatsHTML)
    $('.delete-game').on('click', deleteGame)
    $('.resume-game').on('click', resumeGame)
  })
  $('#save-abort-buttons').html(backToGameOptionsButton)
  $('#back-to-game-options').on('click', backToGameOptions)
}

const addGameHandlers = () => {
  $('#start-new-game').on('click', onStartNewGame)
  $('#get-full-stats').on('click', getAllGames)
}

const onInstructionsButton = function () {
  if (instructionsDisplayed === false) {
    $('#instructions-text').hide()
    $('#instructions-text').html(instructionsText)
    $('#instructions-text').slideDown()
    // $('#instructions-text').slideDown()
  }
  if (instructionsDisplayed === true) {
    // $('#instructions-text').html('')
    $('#instructions-text').slideUp()
  }
  instructionsDisplayed = !instructionsDisplayed
}

const showGameOptionsPage = function () {
  $('#game-state-container').html(gameOptions)
  $('#save-abort-buttons').html(instructionsButton)
  $('#instructions-button').on('click', onInstructionsButton)
  instructionsDisplayed = false
  api.getAllGames()
  .then((data) => {
    const gamesStarted = data.games.length
    $('#games-started').text(gamesStarted)
    const gamesComplete = data.games.filter(function (game) {
      if (game.game_complete === true) {
        return true
      }
    })
    $('#games-completed').text(gamesComplete.length)
    const gamesWon = data.games.filter(function (game) {
      if (game.game_result === 'Won') {
        return true
      }
    })
    $('#games-won').text(gamesWon.length)
    const gamesLost = data.games.filter(function (game) {
      if (game.game_result === 'Lost') {
        return true
      }
    })
    $('#games-lost').text(gamesLost.length)
    let winPercentage = 0
    if (gamesComplete.length > 0) {
      winPercentage = Math.round(gamesWon.length / gamesComplete.length * 100)
    }
    $('#win-percentage').text(winPercentage)
  })
}

module.exports = {
  addGameHandlers,
  showGameOptionsPage
}
