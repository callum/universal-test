import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { get, post } from '../actions/settings'
import resolve from '../resolve'

function resolver (dispatch) {
  return dispatch(get())
}

function selector ({ settings }) {
  return { settings }
}

@resolve(resolver)
@connect(selector)
export default class Settings extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    settings: PropTypes.object.isRequired
  }

  onChange (event) {
    this.props.dispatch(post({
      email: event.target.value
    }))
  }

  render () {
    const { settings } = this.props

    return <main>
      <form>
        <label>
          Email <input name="email" type="email" value={settings.email} onChange={this.onChange.bind(this)} />
        </label>
      </form>
    </main>
  }
}
