import { route } from 'redux-routing'
import Home from './components/Home'
import Items from './components/Items'
import Settings from './components/Settings'

const routes = [
  route('/', Home),
  route('/items', Items),
  route('/settings', Settings)
]

export default routes
