import fetch from 'isomorphic-fetch'
import { REQUEST, RESPOND } from '../constants/items'

function request () {
  return { type: REQUEST }
}

function respond (items) {
  return { type: RESPOND, items }
}

export function get () {
  return dispatch => {
    dispatch(request())

    return fetch('http://0.0.0.0:8001/items.json')
      .then(req => req.json())
      .then(res => dispatch(respond(res)))
  }
}
