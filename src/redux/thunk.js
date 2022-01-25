import { newApi } from '../api/index.js'

const SET_ANIMALS = 'SET_ANIMALS'

/* ------------------------------- */

const setAnimals = (data) => {
  return {
    type: SET_ANIMALS,
    data
  }
}

/* ------------------------------- */

export const getAnimalsThunk = () => async (dispatch) => {
  newApi
    .getAnimals()
    .then((animals) => {
      dispatch(setAnimals(animals))
    })
    .catch((e) => console.log(e))
}
