import jwt from "jsonwebtoken";
export function protect(req,res,next){
 const h=req.headers.authorization;
 if(!h?.startsWith("Bearer ")) return res.status(401).json({message:"Login required"});
 try{req.user=jwt.verify(h.split(" ")[1],process.env.JWT_SECRET);next()}
 catch{res.status(401).json({message:"Invalid or expired token"})}
}
export function employerOnly(req,res,next){
 if(req.user?.role!=="employer") return res.status(403).json({message:"Employer access required"});
 next();
}
export function seekerOnly(req,res,next){
 if(req.user?.role!=="seeker") return res.status(403).json({message:"Job seeker access required"});
 next();
}
