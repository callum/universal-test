import { RESPOND } from '../constants/items'

export default function reducer (items = [], action) {
  switch (action.type) {
  case RESPOND:
    return action.items

  default:
    return items
  }
}
