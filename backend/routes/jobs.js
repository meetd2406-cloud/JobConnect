import express from "express";
import Job from "../models/Job.js";
import {protect,employerOnly} from "../middleware/auth.js";
const r=express.Router();

r.get("/",async(req,res)=>{
 const {search="",location="",category=""}=req.query;
 const q={};
 if(search) q.$or=[{title:{$regex:search,$options:"i"}},{company:{$regex:search,$options:"i"}},{skills:{$regex:search,$options:"i"}}];
 if(location) q.location={$regex:location,$options:"i"};
 if(category) q.category=category;
 res.json(await Job.find(q).populate("employer","name company").sort({createdAt:-1}));
});
r.get("/mine",protect,employerOnly,async(req,res)=>res.json(await Job.find({employer:req.user.id}).sort({createdAt:-1})));
r.get("/:id",async(req,res)=>{
 const j=await Job.findById(req.params.id).populate("employer","name company");
 if(!j)return res.status(404).json({message:"Job not found"}); res.json(j);
});
r.post("/",protect,employerOnly,async(req,res)=>{
 try{res.status(201).json(await Job.create({...req.body,employer:req.user.id}))}
 catch(e){res.status(400).json({message:e.message})}
});
r.put("/:id",protect,employerOnly,async(req,res)=>{
 const j=await Job.findOneAndUpdate({_id:req.params.id,employer:req.user.id},req.body,{new:true,runValidators:true});
 if(!j)return res.status(404).json({message:"Job not found"});res.json(j);
});
r.delete("/:id",protect,employerOnly,async(req,res)=>{
 const j=await Job.findOneAndDelete({_id:req.params.id,employer:req.user.id});
 if(!j)return res.status(404).json({message:"Job not found"});res.json({message:"Job deleted"});
});
export default r;
