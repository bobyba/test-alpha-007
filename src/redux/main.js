const SET_COINS = 'SET_COINS'

const init = { coins: [] }

const mainReducer = (state = init, action) => {
  switch (action.type) {
    case SET_COINS:
      return { ...state, coins: action.data.data }

    default:
      return { ...state }
  }
}

export default mainReducer

/* ------------------------------- */
