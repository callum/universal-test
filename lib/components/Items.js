import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { get } from '../actions/items'
import resolve from '../resolve'

function resolver (dispatch) {
  return dispatch(get())
}

function selector ({ items }) {
  return { items }
}

@resolve(resolver)
@connect(selector)
export default class Home extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired
  }

  render () {
    const { items } = this.props

    return <main>
      <ol>
        {items.map(item => {
          return <li key={item.id}>
            {item.title}
          </li>
        })}
      </ol>
    </main>
  }
}
