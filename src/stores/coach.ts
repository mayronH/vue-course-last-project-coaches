import { defineStore } from 'pinia'
import { Coach } from '../types'
import axios, { AxiosError } from 'axios'
import { useAuthStore } from './auth'

export const useCoachStore = defineStore('coach', {
  state: () => ({
    coaches: [] as Array<Coach>,
    currentCoach: [] as Array<Coach>,
    isLoading: false,
  }),
  actions: {
    getCurrentCoach(id: string | string[]) {
      this.currentCoach = this.coaches.filter((coach: Coach) => {
        return coach.id === id
      })
    },
    async addCoach(coach: Coach) {
      const authStore = useAuthStore()
      coach.id = authStore.userId

      this.isLoading = true
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_FIREBASE_PROJECT_URL}/coaches/${
            coach.id
          }.json?auth=${authStore.token}`,
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
          this.coaches.push(coach)

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
          `${import.meta.env.VITE_FIREBASE_PROJECT_URL}/coaches.json`
        )

        if (response.status !== 200) throw new Error('Could not load data')

        if (response.status === 200 && response.data !== null) {
          this.coaches = Object.values(response.data)
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
