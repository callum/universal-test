import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { createMiddleware, reducer as routeReducer } from 'redux-routing'
import itemsReducer from './reducers/items'
import settingsReducer from './reducers/settings'

export default function configureStore (initialState, history) {
  const routingMiddleware = createMiddleware(history)
  const createStoreWithMiddleware = applyMiddleware(thunk, routingMiddleware)(createStore)

  const reducer = combineReducers({
    items: itemsReducer,
    route: routeReducer,
    settings: settingsReducer
  })

  return createStoreWithMiddleware(reducer, initialState)
}
