import express from 'express';
import { login, logout, singup } from '../controllers/user.controllers.js';
 const router=express.Router();


 router.post("/signup",singup)
 router.post("/login",login)
 router.get("/logout",logout)
 export default router;