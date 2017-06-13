'use strict'

// const store = require('../store.js')

const saveGameSuccess = (response) => {
  console.log('in saveGameSuccess')
}

const saveGameFailure = (response) => {
  console.log('in saveGameFailure')
}

module.exports = {
  saveGameSuccess,
  saveGameFailure
}
