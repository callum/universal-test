import React from 'react'
import { Provider } from 'react-redux'
import { History, navigate } from 'redux-routing'

import Root from './lib/components/Root'
import configureStore from './lib/configureStore'

const store = configureStore(window._state, History)

store.dispatch(navigate(window._state.route.href))

React.render(<Provider store={store}>
  {() => <Root />}
</Provider>, document.getElementById('root'))
