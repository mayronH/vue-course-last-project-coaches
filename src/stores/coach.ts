import { defineStore } from 'pinia'
import { Coach } from '../types'
import axios, { AxiosError } from 'axios'

export const useCoachStore = defineStore('coach', {
  state: () => ({
    coaches: [] as Array<Coach>,
    currentCoach: [] as Array<Coach>,
    loggedInCoach: {} as Coach,
    isLoggedIn: false,
    isLoading: false,
  }),
  actions: {
    getCurrentCoach(id: string | string[]) {
      this.currentCoach = this.coaches.filter((coach: Coach) => {
        return coach.id === id
      })
    },
    async addCoach(coach: Coach) {
      coach.id = new Date().toISOString()
      this.isLoading = true
      try {
        const response = await axios.post(
          'https://coaches-vue-36fb0-default-rtdb.firebaseio.com/coaches/coaches.json',
          {
            id: coach.id,
            firstName: coach.firstName,
            lastName: coach.lastName,
            description: coach.description,
            areas: coach.areas,
            hourlyRate: coach.hourlyRate,
          }
        )
        if (response.status !== 200) throw new Error('Could not save data')
        if (response.status === 200) {
          this.isLoggedIn = true
          this.coaches.push(coach)
          this.loggedInCoach = coach

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
    async loadCoaches() {
      this.isLoading = true
      try {
        const response = await axios.get(
          'https://coaches-vue-36fb0-default-rtdb.firebaseio.com/coaches/coaches.json'
        )
        if (response.status === 200 && response.data !== null) {
          this.coaches = Object.values(response.data)

          this.isLoading = false
        }
        if (response.status !== 200) throw new Error('Could not load data')
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
