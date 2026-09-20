import express from "express";
import Application from "../models/Application.js";
import Job from "../models/Job.js";
import {protect,seekerOnly,employerOnly} from "../middleware/auth.js";
const r=express.Router();

r.post("/:jobId",protect,seekerOnly,async(req,res)=>{
 try{
  const exists=await Application.findOne({job:req.params.jobId,applicant:req.user.id});
  if(exists)return res.status(409).json({message:"Already applied"});
  const a=await Application.create({job:req.params.jobId,applicant:req.user.id,...req.body});
  res.status(201).json(a);
 }catch(e){res.status(400).json({message:e.message})}
});
r.get("/mine",protect,seekerOnly,async(req,res)=>{
 res.json(await Application.find({applicant:req.user.id}).populate("job"));
});
r.get("/job/:jobId",protect,employerOnly,async(req,res)=>{
 const job=await Job.findOne({_id:req.params.jobId,employer:req.user.id});
 if(!job)return res.status(404).json({message:"Job not found"});
 res.json(await Application.find({job:req.params.jobId}).populate("applicant","name email"));
});
r.put("/:id/status",protect,employerOnly,async(req,res)=>{
 const a=await Application.findById(req.params.id).populate("job");
 if(!a||String(a.job.employer)!==req.user.id)return res.status(404).json({message:"Application not found"});
 a.status=req.body.status;await a.save();res.json(a);
});
export default r;
