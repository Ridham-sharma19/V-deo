"use client"
import { signIn } from "next-auth/react"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function LoginPage() {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const router=useRouter();

    const handleSubmit=async(e:React.FormEvent<HTMLElement>)=>{
        e.preventDefault();
        const result=await signIn("credentials",{ 
            email,
            password,
            redirect:false
        }) 
        
        if(!result?.ok){
            console.log(result?.error)
        }
        else{
            router.push("/");
        }
    }

  return (
    <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
      <input type="email"  placeholder="Your email@" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      <input type="password"  placeholder="Your password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
      
      <button type="submit">Register</button>
    </form>
    <div>Don't have an account? <a href="/register">Login</a></div>

    </div>
  )
}


