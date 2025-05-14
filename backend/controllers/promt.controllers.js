// import OpenAI from "openai/index.mjs";

// const openai=new OpenAI({
//     baseURL:"https://api.openai.com/v1",
//     apiKey:process.env.API_KEY
// })
// console.log(openai.apiKey);

// export const sendpromt = async (req, res) => {
//     console.log("Promt sending");
//     const {contents}=req.body

//     if(!content||content.trim()===""){
//         return res.status(400).json({error:"promt content is required"})
//     }
//     try {
//         const userpromt=await promt.create({
//             role:"user",
//             contents
//         })
//         //send to open ai

//         const completion = await openai.chat.completions.create({
//             messages: [{ role: "user", content:contents }],
//             model: "deepseek-chat",
//           });
//           const aicontent=completion.choices[0].message.content
//           console.log(aicontent);

//           const aimessage=await promt.create({
//             role:"user",
//             content:aicontent
//         })
//         return res.status(200).json({reply:aicontent})

//     } catch (e) {
//         console.log("error in api",e);
//         return res.status(500).json({message:"something went wrong with ai response"})

//     }

//   };


// import { GoogleGenAI } from "@google/genai";
// import { promt } from "../model/prompt.model.js";

// const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// export const sendpromt = async (req, res) => {
//   const { contents } = req.body;
//   if (!contents || contents.trim() === "") {
//     return res.status(400).json({ error: "promt content is required" });
//   }

//   try {
//     const userpromt = await promt.create({
//       role: "user",
//       contents,
//     });
//     //send to open ai

//     const completion = await ai.models.generateContent({
//       role: "user",
//       model: "gemini-2.0-flash",
//       contents: contents,
//     });

//     const aicontent = completion.text;
//     console.log(aicontent);

//     const aimessage = await promt.create({
//       role: "assistant",
//       contents: aicontent,
      
//     });
    
         
//     return res.status(200).json({ reply: aicontent });
//   } catch (e) {
//     console.log("error in api", e);
//     return res
//       .status(500)
//       .json({ message: "something went wrong with ai response" });
//   }
// };

// import { GoogleGenAI } from "@google/genai";
// // import { promt } from "../model/prompt.model";
// const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// export const sendpromt=async (req,res)=> {
//    const { contents } = req.body;
//    console.log(contents)
//    if (!contents || contents.trim() === "") {
//     return res.status(400).json({ error: "promt content is required" });
//   }
//    try {
//     const userpromt = await promt.create({
//       role: "user",
//       contents,
//     });
//     //send to open ai

//     const completion = await ai.models.generateContent({
//       role: "user",
//       model: "gemini-2.0-flash",
//       contents: contents,
//     });

//     const aicontent = completion.text;
//     console.log(aicontent);

//     const aimessage = await promt.create({
//       role: "assistant",
//       contents: aicontent,
      
//     });
    
         
//     return res.status(200).json({ reply: aicontent });
//   } catch (e) {
//     console.log("error in api", e);
//     return res
//       .status(500)
//       .json({ message: "something went wrong with ai response" });
//   }
//   const response = await ai.models.generateContent({
//     model: "gemini-2.0-flash",
//     contents: contents,
//   });
//   console.log(response.text);
//cfgjghjfhnfgngx }




// import { GoogleGenAI } from "@google/genai";
// import { promt } from "../model/prompt.model.js";

// const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// export const sendpromt = async (req, res) => {
//   const { contents } = req.body;

//   if (!contents || contents.trim() === "") {
//     return res.status(400).json({ error: "prompt content is required" });
//   }

//   try {
//     // Save user prompt to DB
//     await promt.create({ role: "user", contents });

//     // Send to Gemini
//     const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
//     const result = await model.generateContent([
//       { role: "user", parts: [{ text: contents }] },
//     ]);

//     const aicontent = result.response.text();
//     console.log("AI content:", aicontent);

//     // Save AI response to DB
//     await promt.create({ role: "assistant", contents: aicontent });

//     return res.status(200).json({ reply: aicontent });
//   } catch (e) {
//     console.log("error in api", e);
//     return res.status(500).json({ message: "Something went wrong with AI response" });
//   }
// };



// import OpenAI from "openai";
// import { Promt } from "../model/prompt.model.js";

// const openai = new OpenAI({
//   baseURL: "https://api.deepseek.com",
//   apiKey: process.env.OPENAI_API_KEY,
// });
// export const sendPromt = async (req, res) => {
//   const { content } = req.body;
//   const userId = req.userId;

//   if (!content || content.trim() === "") {
//     return res.status(400).json({ errors: "Promt content is required" });
//   }
//   try {
//     // save user promt
//     const userPromt = await Promt.create({
//       userId,
//       role: "user",
//       content,
//     });

//     // send to openAI
//     const completion = await openai.chat.completions.create({
//       messages: [{ role: "user", content: content }],
//       model: "deepseek-chat",
//     });
//     const aiContent = completion.choices[0].message.content;

//     // save assistant promt
//     const aiMessage = await Promt.create({
//       userId,
//       role: "assistant",
//       content: aiContent,
//     });
//     return res.status(200).json({ reply: aiContent });
//   } catch (error) {
//     console.log("Error in Promt: ", error);
//     return res
//       .status(500)
//       .json({ error: "Something went wrong with the AI response" });
//   }
// };


// import { GoogleGenAI } from "@google/genai";
// import { promt } from "../model/prompt.model.js";

// // Initialize Gemini
// const genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });

// export const sendPromt = async (req, res) => {
//   const { content } = req.body;
//   console.log(req.body)
  

//   if (!content || content.trim() === "") {
//     return res.status(400).json({ error: "Prompt content is required" });
//   }

//   try {
//     // Save user's prompt
//     await promt.create({
     
//       role: "user",
//       content,
//     });

//     // Get Gemini model
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//     // Use a text-only input (Gemini supports string input too)
//     const result = await model.generateContent(content);

//     // Extract generated response
//     const aiContent = result.response.text();

//     // Save AI response
//     await promt.create({
    
//       role: "assistant",
//       content: aiContent,
//     });

//     return res.status(200).json({ reply: aiContent });
//   } catch (error) {
//     console.error("Error in Prompt: ", error);
//     return res.status(500).json({
//       error: "Something went wrong with the AI response",
//     });
//   }
// };


import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "YOUR_API_KEY" });

export const sendpromt= async (req,res)=> {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: "Explain how AI works in a few words",
  });
  console.log(response.text);
}






// import { GoogleGenAI } from "@google/genai";
// import { promt } from "../model/prompt.model.js"; // Uncomment this if needed

// const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// export const sendpromt = async (req, res) => {
//   const { content } = req.body;
//   console.log(content);

//   if (!content || content.trim() === "") {
//     return res.status(400).json({ error: "Prompt content is required" });
//   }

//   try {
//     // Save user message
//     const userMessage = await promt.create({
//       role: "user",
//       content,
//     });

//     // Generate AI response
//     const result = await ai.generateContent({
//       model: "gemini-1.5-flash",
//       contents: [
//         {
//           role: "user",
//           parts: [{ text: content }],
//         },
//       ],
//     });

//     const aicontent = result.response.text();

//     // Save AI response
//     const aiMessage = await promt.create({
//       role: "assistant",
//       content: aicontent,
//     });

//     return res.status(200).json({ reply: aicontent });

//   } catch (error) {
//     console.error("Error in AI API:", error);
//     return res.status(500).json({ message: "Something went wrong with AI response" });
//   }
// };
