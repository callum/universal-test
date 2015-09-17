import fs from 'fs'
import http from 'http'
import url from 'url'

import React from 'react'
import { Provider } from 'react-redux'
import { match, navigate } from 'redux-routing'

import configureStore from './lib/configureStore'
import routes from './lib/routes'
import Root from './lib/components/Root'

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    const location = url.parse(req.url)

    if (location.pathname === '/bundle.js') {
      res.setHeader('Content-Type', 'application/javascript; charset=utf-8')
      fs.createReadStream(__dirname + '/public/bundle.js').pipe(res)
      return
    }

    const store = configureStore()

    store.dispatch(navigate(location))

    let promise

    const matched = match(location.pathname, routes)

    if (matched && matched.handler.resolve) {
      promise = matched.handler.resolve(store.dispatch)
    } else {
      promise = Promise.resolve()
    }

    promise.then(() => {
      const state = JSON.stringify(store.getState())

      const html = React.renderToString(<Provider store={store}>
        {() => <Root />}
      </Provider>)

      const doc = `<!doctype html>
        <html>
          <body>
            <div id="root">${html}</div>
            <script>window._state = ${state}</script>
            <script src="/bundle.js"></script>
          </body>
        </html>`

      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      res.end(doc)
    })
  }
})

server.listen(8000)
console.info('listening on http://0.0.0.0:8000')
