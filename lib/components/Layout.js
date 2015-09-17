import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { navigate } from 'redux-routing'

@connect()
export default class Layout extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  onNavigate (event) {
    this.props.dispatch(navigate(event.target.href))
    event.preventDefault()
  }

  render () {
    return <main>
      <header>
        <nav>
          <a href="/" onClick={this.onNavigate.bind(this)}>Home</a>
          <a href="/settings" onClick={this.onNavigate.bind(this)}>Settings</a>
          <a href="/items" onClick={this.onNavigate.bind(this)}>Items</a>
        </nav>
      </header>
      {this.props.children}
    </main>
  }
}
