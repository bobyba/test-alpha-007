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
  try {
    const animals = await newApi.getAnimals()
    dispatch(setAnimals(animals))
  } catch (error) {
    console.log(error.toJSON())
  }
}
