const SET_ANIMALS = 'SET_ANIMALS'

const init = { animals: [] }

const mainReducer = (state = init, action) => {
  switch (action.type) {
    case SET_ANIMALS:
      return { ...state, animals: action.data }

    default:
      return { ...state }
  }
}

export default mainReducer

/* ------------------------------- */
