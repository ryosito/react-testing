import { useState } from "react";
import React from 'react';
// import ollama from "ollama/browser";
import './App.css';
import axios from "axios";
import { parseJSONPrompt } from "./JSONParser.js";  
// boilerplate imports go here

function App() {
    // define variables for updating on page
    //surely there is a better way to do this than statically preset them
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("empy");
  const [response, setResponse] = useState("");


const generatePrompt = async() => {
  // static prompt, could be prettified by making it an import from somewhere else I guess
  const prompt = input;
  var request = {
    "model": "",
    "prompt": prompt,
    "max_tokens": 2048,
    "temperature": 1
  }


    var out =
      await axios.get('http://127.0.0.1:5001/api/v1/model') 
       .catch(function (error) {
        // generic error catching to analyze errors from axios docs 
    if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log('Something went wrong.');
      return;
    } 
  });
    // This just exists to silently ignore the error.
    if (typeof out !== 'undefined') {
      setOutput(out.data['result'])
      console.log(out.data['result'])
      }

  // code above to verify there is a model running.   
  var answer = await axios.post('http://127.0.0.1:5001/v1/completions',request)
  var outText = parseJSONPrompt(answer.data.choices[0].text);
  // Parse useless parts of the response to extract the prompt
  setResponse(outText);
}

  return (


    
    <div id="root" align="center" >
      <h1>LLM prompt generator</h1>
      <div id="rcorners1">
      <textarea rows="6" cols="60" placeholder="Enter your prompt..." value={input} onChange={(e) => setInput(e.target.value)}/>
      <br />
      <button onClick={generatePrompt}> Generate </button>
      </div>
      <br />
    <div id="rcorners1">
      Running:<br></br> {output}
    </div>
    <br />
    <div id="rcorners1">
      {response}
    </div>
    </div>
      )
}
export default App;
