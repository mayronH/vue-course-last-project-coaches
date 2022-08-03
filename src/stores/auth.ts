import { defineStore } from 'pinia'
import axios, { AxiosError } from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    userId: '',
    token: '',
    tokenExpiration: 0,
    isLoading: false,
    error: '',
  }),
  actions: {
    async signUp(email: string, password: string) {
      this.isLoading = true

      try {
        const response = await axios.post(
          'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA9HTEWwgVdgaHFSLHWODa6GAc6f2czg2E',
          {
            email: email,
            password: password,
            returnSecureToken: true,
          }
        )
        if (response.status !== 200)
          throw new Error('Server Side Error. Impossible to Sign Up')
        if (response.status === 200) {
          this.userId = response.data.localId
          this.token = response.data.idToken
          this.tokenExpiration = response.data.expiresIn
          return true
        }

        this.isLoading = false
      } catch (err) {
        const error = err as AxiosError
        if (!axios.isAxiosError(error)) {
          this.error = error
          console.log(error)
        } else {
          this.error = error.message
          console.log(error)
        }

        this.isLoading = false
        return false
      }
    },
    async login(email: string, password: string) {
      this.isLoading = true

      try {
        const response = await axios.post(
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA9HTEWwgVdgaHFSLHWODa6GAc6f2czg2E',
          {
            email: email,
            password: password,
            returnSecureToken: true,
          }
        )
        if (response.status !== 200)
          throw new Error('Server Side Error. Impossible to Login')
        if (response.status === 200) {
          this.userId = response.data.localId
          this.token = response.data.idToken
          this.tokenExpiration = response.data.expiresIn
          return true
        }

        this.isLoading = false
      } catch (err) {
        const error = err as AxiosError
        if (!axios.isAxiosError(error)) {
          this.error = error
          console.log(error)
        } else {
          this.error = error.message
          console.log(error.message)
        }

        this.isLoading = false
        return false
      }
    },
    logout() {
      this.userId = ''
      this.token = ''
      this.tokenExpiration = 0

      this.isLoading = false
    },
  },
})
