
import mongoose from "mongoose";

const MONGODB_URL=process.env.MONGODB_URL!;

if(!MONGODB_URL){
    throw new Error("PLease add mongo url");
}

let cached=global.mongoose;

if(!cached){
    cached=global.mongoose={conn:null,promise:null};
}

export async function ConnectionToDatabase(){
if(cached.conn){
    return cached.conn;
}
    if (!cached.promise) {
    const opts = {
        bufferCommands: true,
        maxPoolSize: 10
    };
    cached.promise = mongoose.connect(MONGODB_URL, opts).then((mongoose) => mongoose.connection);
}

    try{
        cached.conn=await cached.promise

    }catch(error){
        cached.promise=null;
        throw error

    }
    return cached.conn
}