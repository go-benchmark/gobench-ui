import actions from './actions'

const initialState = {
  list: [],
  detail: {},
  total: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
