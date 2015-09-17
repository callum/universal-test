import { RESPOND, UPDATE } from '../constants/settings'

const initialSettings = { email: '' }

export default function reducer (settings = initialSettings, action) {
  switch (action.type) {
  case UPDATE:
  case RESPOND:
    return action.settings

  default:
    return settings
  }
}
