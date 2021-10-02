import client from "../../client";
import bcrypt from "bcrypt"; 

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
          throw new Error("This username/password is already taken.");
        }
          //hash password
        const uglyPassword=await bcrypt.hash(password,10);
        await client.user.create({
          data: {
            username,
            email,
            firstName,
            lastName,
            password:uglyPassword,
          },
        });
        return {
          ok:true,
        };
        }catch(e){
          return {
            ok:false,
            error:"Cant create account"
            };
        }
        //save and return the user
      },
    
   }
};