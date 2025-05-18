export interface User {
    // length: number
    // filter(arg0: (u: User) => boolean): unknown
    // slice(arg0: number, arg1: number): User[]
    id: number
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    residentialArea?: string
    role?: string
    data?: any
    createdAt?: Date
    updatedAt?: Date
  }
  
  export interface UserDto extends User {
    data: any
  }
  
  export interface LoginModel {
    email: string
    password: string
  }
  
  export interface LoginResponseDto {
    token: string
    user: User
  }
  
  export interface RegisterModel extends User {
    password: string
  }
  