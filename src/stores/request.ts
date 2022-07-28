import { defineStore } from 'pinia'
import { Request } from '../types'
import axios, { AxiosError } from 'axios'
import { useCoachStore } from './coach'

export const useRequestStore = defineStore('request', {
  state: () => ({
    requests: [] as Array<Request>,
    isLoading: false,
  }),
  actions: {
    async addRequest(request: Request) {
      request.id = new Date().toISOString()
      this.isLoading = true
      try {
        const response = await axios.post(
          `https://coaches-vue-36fb0-default-rtdb.firebaseio.com/requests/requests.json`,
          {
            id: request.id,
            email: request.email,
            message: request.message,
            coachId: request.coachId,
          }
        )
        if (response.status !== 200) throw new Error('Could not save data')
        if (response.status === 200) {
          this.isLoading = false
        }
      } catch (err) {
        const error = err as AxiosError
        if (!axios.isAxiosError(error)) {
          console.log(error)
        } else {
          console.log(error.message)
        }
        return false
      }
    },
    async loadRequests() {
      this.isLoading = true

      const coachStore = useCoachStore()
      try {
        const response = await axios.get(
          'https://coaches-vue-36fb0-default-rtdb.firebaseio.com/requests/requests.json'
        )
        if (response.status === 200 && response.data !== null) {
          const requests = Object.values(response.data) as Array<Request>

          this.requests = requests.filter((request: Request) => {
            if (request.coachId === coachStore.loggedInCoach.id) {
              console.log(request)
              return request
            }
          })
        }
        if (response.status !== 200) throw new Error('Could not load data')

        this.isLoading = false
      } catch (err) {
        const error = err as AxiosError
        if (!axios.isAxiosError(error)) {
          console.log(error)
        } else {
          console.log(error.message)
        }
        return false
      }
    },
  },
})
