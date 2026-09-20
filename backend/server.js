import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import jobRoutes from "./routes/jobs.js";
import applicationRoutes from "./routes/applications.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req,res)=>res.json({message:"JobConnect API is running"}));
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

const port=process.env.PORT||5000;
mongoose.connect(process.env.MONGO_URI)
 .then(()=>app.listen(port,()=>console.log(`API: http://localhost:${port}`)))
 .catch(err=>{console.error(err.message);process.exit(1)});
