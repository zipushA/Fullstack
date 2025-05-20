export interface MatchingData {
    id: number
    seniority: number
    isBoys: boolean
    isKeruv:boolean
      residentialArea: string
  }
  
  export interface SortedTeacher {
    id: number
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    matchScore: number
    distance?: number
  }
  