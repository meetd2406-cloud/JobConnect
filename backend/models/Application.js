import mongoose from "mongoose";
const schema=new mongoose.Schema({
 job:{type:mongoose.Schema.Types.ObjectId,ref:"Job",required:true},
 applicant:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
 resume:{type:String,default:""},
 coverLetter:{type:String,default:""},
 status:{type:String,enum:["Applied","Shortlisted","Rejected","Hired"],default:"Applied"}
},{timestamps:true});
schema.index({job:1,applicant:1},{unique:true});
export default mongoose.model("Application",schema);
