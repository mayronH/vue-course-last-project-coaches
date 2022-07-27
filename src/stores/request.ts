import { defineStore } from 'pinia'
import { Request } from '../types'

export const useRequestStore = defineStore('request', {
  state: () => ({
    requests: [] as Array<Request>,
  }),
  actions: {
    addRequest(request: Request) {
      request.id = new Date().toISOString()
      this.requests.push(request)
    },
  },
})
