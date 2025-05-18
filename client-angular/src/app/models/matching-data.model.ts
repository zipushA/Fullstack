export interface MatchingData {
    id: number
    name: string
    description: string
    value: number
    createdAt?: Date
    updatedAt?: Date
  }
  
  export interface SortedTeacher {
    id: number
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    residentialArea: string
    matchScore: number
    distance?: number
  }
  