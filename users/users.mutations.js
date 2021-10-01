import client from "../client";
import bcrypt from "bcrypt"; 
import jwt, { JsonWebTokenError } from "jsonwebtoken";
export default {
   Mutation:{
     createAccount:async (_,{
      firstName,
      lastName,
      username,
      email,
      password})=>{
        //check in username or email are already on DB.
        try{
          const existingUser=await client.user.findFirst({
            where:{
            OR:[
              {
               username,
              },
              {
               email,
              },
            ],
          },
        });
        if(existingUser){
          throw new Error("This username/password is already taken.")
        }
          //hash password
        const uglyPassword=await bcrypt.hash(password,10);
        return client.user.create({
          data: {
            username,
            email,
            firstName,
            lastName,
            password:uglyPassword,
          },
        });
        }catch(e){
          return e;
        }
        //save and return the user
      },
     login: async (_,{username,password})=>{
       const user=await client.user.findFirst({where:{username}});
       if(!user){
         return{
           ok:false,
           error:"User not found"
         }
       }
       const passwordOK=await bcrypt.compare(password,user.password);
       if(!passwordOK){
         return{
           ok:false,
           error:"Incorrect password.",
         }
       }
       const token=await jwt.sign({id:user.id},process.env.SECRET_KEY);
       return {
         ok:true,
         token,
       }
     },
   }
};