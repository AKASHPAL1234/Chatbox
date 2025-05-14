import express from 'express';
import { sendpromt } from '../controllers/promt.controllers.js';
import userMiddleware from '../middleware/promt.middleware.js';
 const router=express.Router();


 router.post("/promt",userMiddleware,sendpromt);

 export default router;