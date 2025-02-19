import { useState } from "react";
import React from 'react';
import ReactDOM from 'react-dom';
import ollama from "ollama/browser";
function displayOutput() {
  var 
}
function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("empy");
  var ollamaOut = ollama.generate( {
      model: "deepseek-r1:1.5b", // Change this to your preferred model
      prompt: input,
      stream: false,
    }); 
  const generatePrompt = async () => {
    if (!input.trim()) return;

    try {
    setOutput(ollamaOut.response);
    alert(ollamaOut.response)
    } 
    catch (error) {
      console.error("Error fetching response:", error);
      setOutput("Failed to generate response.");
    }
  };

  return (
    <div>
      <h1>Ollama Prompt Generator</h1>
      <textarea rows="4" placeholder="Enter your prompt..." value={input} onChange={(e) => setInput(e.target.value)}/>
      <br></br>
      <button onClick={generatePrompt}> Generate </button>
      <br></br>
      Deepseek says: {output}
    </div>
      )
}
export default App;
