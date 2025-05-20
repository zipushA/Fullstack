export interface User {
    id: number
    name:string
    email: string
    role?: string
    data?: any
     roleList: Role[];
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
  
 export interface Role {
  id: number;
  roleName: string;
  permissionList: any[]; // תוכל להגדיר גם טיפוס `Permission` בעתיד
}