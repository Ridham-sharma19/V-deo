import mongoose, { Schema, models, model } from "mongoose";

export const Video_dimensions={height:1920,
    width:1080,}as const
    
export interface Ivideo{ 
    _id?:mongoose.Types.ObjectId;
    title:string;
    discription:string;
    videoUrl:string;
    thumbnailUrl:string;
    controls?:boolean;
    transformation?:{
        height:number,
        width:number,
        quality?:number,
    }

}
const videoSchema=new Schema<Ivideo>({
    title:{type:String,required:true},
    discription:{type:String,required:true},
    videoUrl:{type:String,required:true},
    thumbnailUrl:{type:String,required:true},
    controls:{type:Boolean,default:true},
    transformation:{
        height:{type:Number,default:Video_dimensions.height},
        width:{type:Number,default:Video_dimensions.width},
        quality:{type:Number,min:1,max:100}

    }
    
},{
    timestamps:true
}
)

const Video=models?.Video||model<Ivideo>("Video",videoSchema);
export default Video;