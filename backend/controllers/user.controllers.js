import { User } from "../model/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from "../config.js";



export const singup = async(req, res) => {
  const { firstname, lastname, email, password } = req.body;
  console.log(firstname, lastname, email, password);
  try {
    const user =await User.findOne({ email: email });
    if (user) {
      return res.status(401).json({ error: "user alredy exits" });
    }
    const hashpassword= await bcrypt.hash(password,10);
    const newuser = new User({
      firstname,
      lastname,
      email,
      password: hashpassword,
    });
     await newuser.save();
    return res.status(201).json({ message: "sucessfully user singup" });
  } catch (e) {
    console.log("error in signup ", e.message);
    return res.status(500).json({ error: "error in singup" });
  }
};

export const login = async (req, res) => {
  console.log("login");
  const {  email, password } = req.body;
  try{
    const user=await User.findOne({email:email})
    const ispasswordcorrect=await bcrypt.compare(password,user.password)
    if(!user||!ispasswordcorrect){
        return res.status(403).json({error:"invalid password or user"})
    }
    //jwt code 
    const token=jwt.sign({id:user._id},config.JWT_USER_PASSWORD,{
        expiresIn:"1d"
    })
    const cookieoption={
      expires:new Date(Date.now()+24*60*60*1000),
      httpOnly:true,
      secure:process.env.NODE_ENV==="production",
      sameSite:"strict"
    }
    res.cookie("jwt",token,cookieoption)
    return res.status(201).json({message:"sucessfully login",user,token})
  }catch(e){
    console.log("error in login ", e);
    return res.status(500).json({ error: "error in login" });
  }
};





export const logout = (req, res) => {
  console.log("logout");
  try {
    res.clearCookie("jwt")
    return res.status(201).json({ message: "logout sucessful" });
  } catch (e) {
    console.log("error in logout",e);
    
  }
};
