import { defineStore } from 'pinia'
import { Coach } from '../types'

export const useCoachStore = defineStore('coach', {
  state: () => ({
    coaches: [
      {
        id: 'c1',
        firstName: 'Maximilian',
        lastName: 'Schwarzmüller',
        areas: ['frontend', 'backend', 'career'],
        description:
          "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
        hourlyRate: 30,
      },
      {
        id: 'c2',
        firstName: 'Julie',
        lastName: 'Jones',
        areas: ['frontend', 'career'],
        description:
          'I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
        hourlyRate: 30,
      },
    ] as Array<Coach>,
    currentCoach: [] as Array<Coach>,
  }),
  actions: {
    getCurrentCoach(id: string | string[]) {
      this.currentCoach = this.coaches.filter((coach: Coach) => {
        return coach.id === id
      })
    },
    addCoach(coach: Coach) {
      coach.id = new Date().toISOString()
      this.coaches.push(coach)
    },
  },
})
