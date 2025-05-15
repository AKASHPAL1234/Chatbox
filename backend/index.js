import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from './routes/user.route.js';
import promtRoutes from './routes/promt.route.js';
import cors from 'cors';

import cookieparser from 'cookie-parser'

const app = express();

dotenv.config();
const port = process.env.PORT || 3000;
const Mongo_url = process.env.MONGO_URL;
app.use(express.json());
app.use(cookieparser());


app.use(cors({
  origin: process.env.FRONTEND_URL, // .trim() ensures no trailing slash
  credentials: true,
  methods: ["POST", "GET", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));



mongoose.connect(Mongo_url).then(()=>{
    console.log("connect to db")
}).catch(e=>{
    console.log(e);

})


app.use("https://skymomentai.onrender.com/api/v1/user",userRoutes);
app.use("https://skymomentai.onrender.com/api/v1/skymoment",promtRoutes);




app.listen(port, () => {
  console.log("server was listin on port 8080");
});

app.get("/", (req, res) => {
  res.send("AKASH");
});
