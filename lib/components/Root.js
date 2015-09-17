import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { match } from 'redux-routing'
import routes from '../routes'
import Layout from './Layout'

function selector ({ route }) {
  return { route }
}

@connect(selector)
export default class Root extends Component {
  static propTypes = {
    route: PropTypes.object.isRequired
  }

  render () {
    const matched = match(this.props.route.href, routes)

    if (matched) {
      return <Layout>
        <matched.handler />
      </Layout>
    }

    return <main>404 not found</main>
  }
}
