import { newApi } from '../api/index.js'

const SET_COINS = 'SET_COINS'

/* ------------------------------- */

const setCoins = (data) => {
  return {
    type: SET_COINS,
    data
  }
}

/* ------------------------------- */

export const getTopCoinsThunk = () => async (dispatch) => {
  let coins = await newApi.getTopCoins()
  coins && dispatch(setCoins(coins))
}
