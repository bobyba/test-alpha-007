import * as axios from 'axios'

const instance = axios.create({
  baseURL: 'https://api.coincap.io/v2',
  withCredentials: false // default
})

export const newApi = {
  async getTopCoins() {
    try {
      const response = await instance.get(`/assets`)
      return response.data
    } catch (err) {
      console.error(err.toJSON())
    }
  }
}
