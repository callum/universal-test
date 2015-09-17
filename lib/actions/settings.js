import fetch from 'isomorphic-fetch'
import { REQUEST, RESPOND, UPDATE } from '../constants/settings'

function request () {
  return { type: REQUEST }
}

function respond (settings) {
  return { type: RESPOND, settings }
}

function update (settings) {
  return { type: UPDATE, settings }
}

export function get () {
  return dispatch => {
    dispatch(request())

    return fetch('http://0.0.0.0:8001/settings.json')
      .then(req => req.json())
      .then(res => dispatch(respond(res)))
  }
}

export function post (settings) {
  return dispatch => {
    dispatch(update(settings))
    dispatch(request())

    return fetch('http://0.0.0.0:8001/settings.json', {
      method: 'post',
      body: JSON.stringify(settings)
    })
      .then(req => req.json())
      .then(res => dispatch(respond(res)))
  }
}
