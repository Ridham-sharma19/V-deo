"use client"

import error from "next/error";
import { useRouter } from "next/navigation";
import { ReactHTMLElement, useState } from "react";


export default  function Register() {

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [confirmPassword,setConfirmPassword]=useState(""); 

  const router=useRouter();

  const handleSubmit=async(e:React.FormEvent<HTMLElement>)=>{
    e.preventDefault();
    if(password!=confirmPassword){
      return(
        <div className="bg-red-500 text-white">
          Password do not match !!
        </div>
      )
    }
    try{
      const res=await fetch("/api/auth/register",{
       method:"POST",
       headers:{
              "Content-type":"application/json"
       },
       body:JSON.stringify({
        email,
        password
       })
      })
      const data=await res.json();

      if(!res.ok){
        throw new Error(data.error || "Registration Failed")
      }
      console.log(error);
      router.push("/login");

    }catch{
      console.log(error);
    }


  }
  


  return (
   <div className="">
    <h1>Register</h1>
    <form onSubmit={handleSubmit}>
      <input type="email"  placeholder="Your email@" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      <input type="password"  placeholder="Your password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
      <input type="password"  placeholder="confirm password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
      <button type="submit">Register</button>
    </form>
    <div>Already have an account? <a href="/login">Login</a></div>
   </div>
   
  );
}
