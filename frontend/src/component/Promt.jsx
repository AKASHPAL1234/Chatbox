import { useEffect, useRef, useState } from "react";
import logo from "../assets/2.png";
import { ArrowUp, Bot, Globe, Paperclip } from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow as codeTheme } from "react-syntax-highlighter/dist/esm/styles/prism";


function Promt() {
  const apiKey = import.meta.env.VITE_API_KEY;

  const [inputValue, setInputValue] = useState("");
  const [typeMessage, setTypeMessage] = useState("");
  const [reply, setReply] = useState("");

  const [promt, setPromt] = useState([]);
  const [loading, setLoading] = useState(false);
  const promtEndRef = useRef();

 useEffect(() => {
    promtEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [promt, loading]);

  

  const handelkeydown = (e) => {
    if (e.key === "Enter") {
      handleclick();
    }
  };

  
  

  const handleclick = async () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    setInputValue("");
    setLoading(true);
    setTypeMessage(trimmed);

    const ai = new GoogleGenAI({
      apiKey: apiKey,
    });

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: trimmed,
      });
      {loading}
      const reply = response.text;
      console.log("AI Reply:", reply);
      setReply(reply);

      setPromt((prev) => [
        ...prev,
        { role: "user", content: trimmed },
        { role: "assistant", content: reply },
      ]);
    } catch (error) {
      console.error("AI Request Failed:", error);

      setPromt((prev) => [
        ...prev,
        { role: "user", content: trimmed },
        {
          role: "assistant",
          content: error.message?.includes("503")
            ? "⚠️ Gemini is currently overloaded. Please try again shortly."
            : "❌ Something went wrong while getting the AI response.",
        },
      ]);
    } finally {
      setLoading(false);
      setTypeMessage("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-between flex-1 w-full px-4 pb-4 md:pb-8 bg-black">
      {/* ➤ Greeting Section */}
      <div className="mt-8 md:mt-10 text-center ">
        <div className="flex items-center justify-center gap-2">
          <img
            src={logo}
            alt="Skymoment Logo"
            className="h-6 md:h-20 rounded-full"
          />
          <h1 className="text-2xl md:text-3xl font-semibold text-white mb-2">
            Hi, I'm Skymoment.
          </h1>
        </div>
        <p className="text-gray-400 text-base md:text-lg mt-2">
          💬 How can I help you today?
        </p>
      </div>

      <div className="text-white  ml-[70%]  rounded-lg mb-2 p-2 ">
        {typeMessage}
      </div>
    ``
     
      {/* <div className="w-full max-w-4xl h-80 overflow-y-auto mb-4 px-4">
        {promt.map((msg, index) => (
          <div
            key={index}
            className={`text-white mb-2 p-2 rounded-lg ${
              msg.role === "user"
                ? "bg-black ml-auto text-right"
                : "bg-black mr-auto text-left"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div> */}


    

<div className="w-full max-w-4xl flex-1 overflow-y-auto mt-6 mb-4 space-y-4 max-h-[60vh] px-1">
  {promt.map((msg, index) => (
    <div
      key={index}
      className={`w-full flex ${
        msg.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      {msg.role === "assistant" ? (
        <div className="w-full bg-[#000000] text-white rounded-xl px-4 py-3 text-sm whitespace-pre-wrap">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={codeTheme}
                    language={match[1]}
                    PreTag="div"
                    className="rounded-lg mt-2"
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code className="bg-gray-800 px-1 py-0.5 rounded" {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {msg.content}
          </ReactMarkdown>
        </div>
      ) : (
        <div className="w-[30%] bg-blue-600 text-white rounded-xl px-4 py-3 text-sm whitespace-pre-wrap self-start">
          {msg.content}
        </div>
      )}
    </div>
  ))}
        {loading && typeMessage && (
          <div
            className="whitespace-pre-wrap px-4 py-3 rounded-2xl text-sm break-words
           bg-blue-600 text-white self-end ml-auto max-w-[40%]"
          >
            {typeMessage}
          </div>
        )}

           {loading && (
          <div className="flex justify-start w-full">
            <div className="bg-[#2f2f2f] text-white px-4 py-3 rounded-xl text-sm animate-pulse">
              🤖Loading...
            </div>
          </div>
        )}
  <div ref={promtEndRef} />

</div>
























      {/* ➤ Input Box */}
      <div className="w-full max-w-4xl relative mt-auto">
        <div className="bg-[#2f2f2f] rounded-[2rem] px-4 md:px-6 py-6 md:py-8 shadow-md">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            onKeyDown={handelkeydown}
            placeholder="💬 Message DeepSeek"
            className="bg-transparent w-full text-white placeholder-gray-400 text-base md:text-lg outline-none"
          />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 gap-4">
            {/* 🛠️ Functional Buttons */}
            <div className="flex gap-2 flex-wrap">
              <button className="flex items-center gap-2 border border-gray-500 text-white text-sm md:text-base px-3 py-1.5 rounded-full hover:bg-gray-600 transition">
                <Bot className="w-4 h-4" />
                Skymoment (R1)
              </button>
              <button className="flex items-center gap-2 border border-gray-500 text-white text-sm md:text-base px-3 py-1.5 rounded-full hover:bg-gray-600 transition">
                <Globe className="w-4 h-4" />
                Search
              </button>
            </div>

            {/* ➤ Send Button */}
            <div className="flex items-center gap-2 ml-auto">
              <button className="text-gray-400 hover:text-white transition">
                <Paperclip className="w-5 h-5" />
              </button>
              <button
                onClick={handleclick}
                className="bg-gray-500 hover:bg-blue-600 p-2 rounded-full text-white transition"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Promt;

//  <div className='w-[90%] bg-black items-center justify-center flex text-white '>
//       <div className='items-center'>
//         <div className='items-center flex  '>
//           <img src={logo} alt='' className='h-16 w-12 rounded-full '></img>
//          <h1 className='text-3xl'> Hi I'm Skymoment</h1>
//         </div>
//         <h1 className='text-xl ml-10 text-gray-400'> 💬how i can help you today?</h1>
//       <div>

//       </div>
//       <div className=' h-24 w-1/2 items-center'>
//         <input type='text' placeholder=' 💬Message Skymoment' className='bg-gray-500 w-full'></input>
//         <div className=' flex  gap-8'>
//           <div>
//             <button><Bot/>Skymoment thinking (R1)</button>
//           </div>
//           <div>
//             <button><Globe/>search</button>
//           </div>
//           <div>
//             <button>isdfhi</button>
//           </div>
//         </div>
//         <div className=''>
//           <button><Paperclip/></button>
//           <button><ArrowUp/></button>
//         </div>
//       </div>
//       </div>
//     </div>

