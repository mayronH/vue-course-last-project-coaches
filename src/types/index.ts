export type Coach = {
  id: string
  firstName: string
  lastName: string
  areas: Array<string>
  description: string
  hourlyRate: number
}

export type Request = {
  id: string
  email: string
  message: string
  coachId: string | string[]
}
