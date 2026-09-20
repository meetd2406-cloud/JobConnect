import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
const r=express.Router();
const token=u=>jwt.sign({id:u._id,name:u.name,role:u.role},process.env.JWT_SECRET,{expiresIn:"7d"});
const safe=u=>({id:u._id,name:u.name,email:u.email,role:u.role,company:u.company});

r.post("/register",async(req,res)=>{
 try{
  const {name,email,password,role="seeker",company=""}=req.body;
  if(!name||!email||!password) return res.status(400).json({message:"Name, email and password are required"});
  if(await User.findOne({email})) return res.status(409).json({message:"Email already registered"});
  const u=await User.create({name,email,password:await bcrypt.hash(password,10),role,company});
  res.status(201).json({token:token(u),user:safe(u)});
 }catch(e){res.status(500).json({message:e.message})}
});
r.post("/login",async(req,res)=>{
 try{
  const u=await User.findOne({email:req.body.email});
  if(!u||!(await bcrypt.compare(req.body.password,u.password))) return res.status(401).json({message:"Invalid credentials"});
  res.json({token:token(u),user:safe(u)});
 }catch(e){res.status(500).json({message:e.message})}
});
export default r;
