'use strict'
require('../jquery.vmap.js')
require('../jquery.vmap.usa.js')
const getFormFields = require(`../../../lib/get-form-fields`)
const api = require('./api')
const ui = require('./ui')
const store = require('../store.js')
const gamePlay = require('../templates/game-play.handlebars')

const onGetItems = function (event) {
  event.preventDefault()
  console.log('in onGetItems')
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
    hoverColor: '#c9dfaf',
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
      onGetItems(element, code, region)
    }
  })
}

const onStartNewGame = function (event) {
  event.preventDefault()
  $('#game-state-container').html(gamePlay)
  usMap()
}

const addGameHandlers = () => {
  $('#start-new-game').on('click', onStartNewGame)
}

module.exports = {
  addGameHandlers
}
