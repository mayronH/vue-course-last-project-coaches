import { defineStore } from 'pinia'
import axios, { AxiosError } from 'axios'

let timer: number

export const useAuthStore = defineStore('auth', {
  state: () => ({
    userId: '',
    token: '',
    isLoading: false,
    error: '',
    didLogout: false,
  }),
  actions: {
    async signUp(email: string, password: string) {
      return await this.auth(email, password, 'signup')
    },
    async login(email: string, password: string) {
      return await this.auth(email, password)
    },
    async auth(email: string, password: string, method = 'login') {
      let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${
        import.meta.env.VITE_FIREBASE_KEY
      }`
      let errorMessage = 'Server Side Error. Impossible to Login'
      if (method === 'signup') {
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${
          import.meta.env.VITE_FIREBASE_KEY
        }`
        errorMessage = 'Server Side Error. Impossible to Sign Up'
      }

      this.isLoading = true

      try {
        const response = await axios.post(url, {
          email: email,
          password: password,
          returnSecureToken: true,
        })
        if (response.status !== 200) throw new Error(errorMessage)
        if (response.status === 200) {
          this.userId = response.data.localId
          this.token = response.data.idToken
          this.didLogout = false

          localStorage.setItem('token', this.token)
          localStorage.setItem('userId', this.userId)

          const expirationDate =
            new Date().getTime() + response.data.expiresIn * 1000

          localStorage.setItem('tokenExpiration', expirationDate.toString())

          timer = setTimeout(() => {
            this.autoLogout()
          }, response.data.expiresIn * 1000)

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
    autoLogin() {
      const token = localStorage.getItem('token')
      const userId = localStorage.getItem('userId')
      const tokenExpiration = localStorage.getItem('tokenExpiration')

      if (tokenExpiration) {
        const expiresIn = parseInt(tokenExpiration) - new Date().getTime()

        if (expiresIn < 10000) {
          return
        }

        timer = setTimeout(() => {
          this.autoLogout()
        }, expiresIn)
      }

      if (token && userId) {
        this.userId = userId
        this.token = token
      }
    },
    autoLogout() {
      this.logout()
      this.didLogout = true
    },
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('tokenExpiration')

      clearTimeout(timer)

      this.userId = ''
      this.token = ''

      this.isLoading = false
    },
  },
})
