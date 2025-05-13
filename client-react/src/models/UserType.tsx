import { Data } from "./dataType";

export type UserRegister = {
    id?: number,
    name: string; 
    email: string;
    password: string;
    matchingDataId:number;
    link:string;
    role:'teacher'|'principal'
    
}
export type User = {
    id: number,
    name: string; 
    email: string;
    password: string;
    matchingDataId:number;
    link:string;
    role:'teacher'|'principal'
    matchingData: Data; 
}

export type UserPostModel = {
    name: string;
    email: string;
    password: string;
    matchingDataId:number;
    link:string;
}