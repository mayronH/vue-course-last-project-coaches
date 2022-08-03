import { defineStore } from 'pinia'
import { Request } from '../types'
import axios, { AxiosError } from 'axios'
import { useAuthStore } from './auth'

const authStore = useAuthStore()

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
          `${import.meta.env.VITE_FIREBASE_PROJECT_URL}/requests/${
            request.coachId
          }.json?auth=${authStore.token}`,
          {
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
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_FIREBASE_PROJECT_URL}/requests/${
            authStore.userId
          }.json?auth=${authStore.token}`
        )

        if (response.status !== 200) throw new Error('Could not load data')
        if (response.status === 200 && response.data !== null) {
          const requests = Object.values(response.data) as Array<Request>

          this.requests = requests
        }

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
