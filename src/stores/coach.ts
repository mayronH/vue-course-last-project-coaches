import { defineStore } from 'pinia'
import { Coach } from '../types'
import axios, { AxiosError } from 'axios'

export const useCoachStore = defineStore('coach', {
  state: () => ({
    coaches: [] as Array<Coach>,
    currentCoach: [] as Array<Coach>,
    loggedInCoach: {} as Coach,
    isLoggedIn: false,
  }),
  actions: {
    getCurrentCoach(id: string | string[]) {
      this.currentCoach = this.coaches.filter((coach: Coach) => {
        return coach.id === id
      })
    },
    addCoach(coach: Coach) {
      coach.id = new Date().toISOString()
      axios
        .post(
          'https://coaches-vue-36fb0-default-rtdb.firebaseio.com//coaches.json',
          {
            id: coach.id,
            firstName: coach.firstName,
            lastName: coach.lastName,
            description: coach.description,
            areas: coach.areas,
            hourlyRate: coach.hourlyRate,
          }
        )
        .then((response) => {
          if (response.status !== 200) throw new Error('Could not save data')
          if (response.status === 200) {
            this.isLoggedIn = true
            this.coaches.push(coach)
            this.loggedInCoach = coach
          }
        })
        .catch((err) => {
          console.log(err)
          return false
        })
    },
    async loadCoaches() {
      try {
        const response = await axios.get(
          'https://coaches-vue-36fb0-default-rtdb.firebaseio.com//coaches.json'
        )
        this.coaches = Object.values(response.data)
      } catch (err) {
        const error = err as AxiosError
        if (!axios.isAxiosError(error)) {
          console.log(error)
        } else {
          console.log(error.message)
        }
      }
    },
  },
})
