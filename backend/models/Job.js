import mongoose from "mongoose";
const schema=new mongoose.Schema({
 title:{type:String,required:true},
 company:{type:String,required:true},
 location:{type:String,required:true},
 category:{type:String,required:true},
 description:{type:String,required:true},
 skills:[String],
 salary:{type:String,default:"Not disclosed"},
 experience:{type:String,default:"Fresher"},
 employer:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}
},{timestamps:true});
export default mongoose.model("Job",schema);
