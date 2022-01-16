import * as axios from 'axios'

const instance = axios.create({
  baseURL: 'https://zoo-animal-api.herokuapp.com/',
  withCredentials: false // default
})

export const newApi = {
  async getAnimals() {
    try {
      const response = await instance.get(`/animals/rand/10`)
      return response.data
    } catch (err) {
      return err
    }
  }
}
