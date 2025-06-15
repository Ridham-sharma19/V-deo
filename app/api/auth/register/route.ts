import { ConnectionToDatabase } from "@/lib/db";
import User from "@/models/User";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    try{
         const {email,password}=await request.json();
         if(!email || !password){
            return NextResponse.json(
                {error:"Email and password are required"},
                {status:400}
            )
         }
         await ConnectionToDatabase();
        const existingUser= await User.findOne({
            email         
         })
         if(existingUser){
             return NextResponse.json(
                {error:"User already registered"},
                {status:400}
             )  
         }

        const creatingUser= await User.create({
            email,
            password
         })
         if(creatingUser){
            return NextResponse.json(
                {message:"User registered successfully"},
                {status:200}

            )
         }


    }catch{
        console.error(error,"error while registration");
       return NextResponse.json(
                {error:"Failed to register"},
                {status:400}

            )

    }

} 