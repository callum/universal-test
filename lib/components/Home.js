import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { get as getItems } from '../actions/items'
import { get as getSettings } from '../actions/settings'
import resolve from '../resolve'

function resolver (dispatch) {
  return Promise.all([
    dispatch(getItems()),
    dispatch(getSettings())
  ])
}

function selector ({ items, settings }) {
  return { items, settings }
}

@resolve(resolver)
@connect(selector)
export default class Home extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    settings: PropTypes.object.isRequired
  }

  render () {
    const { items, settings } = this.props

    return <main>
      <div>{settings.email && `Email: ${settings.email}`}</div>
      <div>{items.length} items</div>
    </main>
  }
}
