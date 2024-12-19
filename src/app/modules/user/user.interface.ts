import { Model } from "mongoose";

export interface IUser {
    name: string;          
    email: string;         
    password: string;       
    role: "admin" | "user"; 
    isBlocked: boolean;     
    
  }

  export interface UserModel extends Model<IUser> {
    isUserExitsByEmail(email :string): Promise<IUser>,
    isUserBlocked( isBlocked: boolean): Promise<boolean>,
    isPasswordMatched(plainTextPassword: string, hashedPassword: string): Promise<boolean>,
  }
  
