'use strict'

const store = require('../store.js')

const signUpSuccess = (response) => {
  $('#modal-signup').modal('hide')
  document.getElementById('sign-up').reset()

  store.user = response.user
  $('.status-message').text('Account created. Sign In!')
}

const signUpFailure = () => {
  $('.signup-status-message').text('Username taken. Please try again.')
  document.getElementById('sign-up').reset()
}

const signInSuccess = (response) => {
  $('#modal-signin').modal('hide')
  document.getElementById('sign-in').reset()
  store.user = response.user
}

const signInFailure = () => {
  $('.signin-status-message').text('Wrong username and or password.')
}

const changePasswordSuccess = (response) => {
  $('.status-message').text('Password changed successfully.')
  document.getElementById('change-password').reset()
}

const changePasswordFailure = () => {
  $('.status-message').text('Password could not be changed. Please try again.')
}

const signOutSuccess = () => {
  store.user = null // only have one person signed in in a givne session, one browser
  $('.status-message').text('Sign Back In Or Create A New Account.')
}

const signOutFailure = () => {
  $('.status-message').text('Something went wrong. Please try again.')
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  changePasswordSuccess,
  changePasswordFailure
}
