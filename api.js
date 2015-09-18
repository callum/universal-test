import http from 'http'
import url from 'url'
import concat from 'concat-stream'

const items = [
  { id: 'a42d', title: 'foo' },
  { id: 'fww3', title: 'bar' },
  { id: '223d', title: 'baz' },
  { id: '89k7', title: 'qux' }
]

let settings = { email: 'callum.jefferies@gmail.com' }

const api = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Content-Type', 'application/json; charset=utf-8')

  const location = url.parse(req.url)

  if (location.pathname === '/items.json') {
    if (req.method === 'GET') {
      res.end(JSON.stringify(items))
      return
    }
  }

  if (location.pathname === '/settings.json') {
    if (req.method === 'GET') {
      res.end(JSON.stringify(settings))
      return
    }

    if (req.method === 'POST') {
      req.pipe(concat(body => {
        const parsed = JSON.parse(body)
        settings = { ...settings, email: parsed.email }
        res.end(JSON.stringify(settings))
      }))

      return
    }
  }

  res.end()
})

api.listen(8001)
console.info('listening on http://0.0.0.0:8001')
