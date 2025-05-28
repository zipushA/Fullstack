import { Data } from "./dataType";

export type UserRegister = {
   // id?: number,
    name: string; 
    email: string;
    password: string;
    matchingDataId:number;
    link:string;
    role:string,
    schoolName:string
    
}
export type User = {
    id: number,
    name: string; 
    email: string;
    password: string;
    matchingDataId:number;
    link:string;
    role:string
    matchingData: Data; 
    schoolName:string

}

export type UserPostModel = {
    name: string;
    email: string;
    password: string;
    matchingDataId:number;
    link:string;
    schoolName:string

    
}