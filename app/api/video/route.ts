import { authOptions } from "@/lib/auth";
import { ConnectionToDatabase } from "@/lib/db";
import Video, { Ivideo } from "@/models/Video";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";






export async function GET(){

    try{
        await ConnectionToDatabase();
        const videos=await Video.find({}).sort({createdAt:-1}).lean();//we will get array

        if(!videos || videos.length===0){
            return NextResponse.json([],{status:200});
        }
        return NextResponse.json(videos);
    }catch(error){
       return NextResponse.json({
        error:"Failed to fetch videos!"
       },{status:500});
        

    }

}


export async function POST(request:NextRequest){
    try{
        const session=await getServerSession(authOptions);
        if(!session){
    return NextResponse.json({
        error:"Uauthorised"
       },{status:401});
        }
        await ConnectionToDatabase();

        const body: Ivideo = await request.json();
        if(!body.thumbnailUrl|| !body.title || !body.discription ||!body.videoUrl){
            return NextResponse.json({
        error:"Missing some fields"
       },{status:400});

        }
        const videoData={
            ...body,
            controls:body?.controls??true,
            transformation:{
                height:1920,
                width:1080,
                quality:body.transformation?.quality??100
            }

        }

       const newVideo= await Video.create(videoData);
       return NextResponse.json(newVideo);

    }catch(error){
        return NextResponse.json({error:"failed to create video"},{
            status:500
        })
        
    }
}