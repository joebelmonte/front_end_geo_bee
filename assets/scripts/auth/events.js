'use strict'
// const mapPage = require('../templates/map.handlebars')
const getFormFields = require(`../../../lib/get-form-fields`)
// const mapEvents = require('../usmap/events.js')
const api = require('./api')
const ui = require('./ui')
const mainPageNav = require('../templates/main-page-nav.handlebars')
const store = require('../store.js')
const landingTemplate = require('../templates/landing.handlebars')
const gameOptions = require('../templates/game-options.handlebars')

const onSignUp = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

const onSignIn = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

const onChangePassword = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}

const onSignOut = function (event) {
  event.preventDefault()
  api.signOut()
    .then(ui.signOutSuccess)
    .then($('#landing-view-container').html(landingTemplate))
    .then($('#main-view-container').html(''))
    .then($('#nav-container').html(''))
    .then($('.jqvmap-label').html(''))
    .then(addLandingHandlers)
    .catch(ui.signOutFailure)
}

const addLandingHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#modal-signin').on('hidden.bs.modal', function () {
    if (store.user !== undefined && store.user !== null) {
      $('#landing-view-container').html('')
      $('#main-view-container').html(mainPageNav)
      $('#sign-out').on('submit', onSignOut)
      $('#change-password').on('submit', onChangePassword)
      $('#game-state-container').html(gameOptions)
    }
  })
}

module.exports = {
  addLandingHandlers
}
