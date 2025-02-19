function parseJSONPrompt(objIn) {
	const words = dbgOut(objIn)
	return words;
	// TODO: Further checking and sanitizing if the LLM does not return a valid JSON Object. 
}


function dbgOut (objIn) {
	var manip = objIn;
	console.log(manip);
	const objectRE = new RegExp("\".*,.*,.*\"","gi");
	manip = manip.match(objectRE)
	console.log(manip);
// so it turns out parsing varying LLM outputs is quite a masterclass in data sanitization but can work mostly. 
	convToPrompt(manip)
	return(manip)

} 
function convToPrompt(strIn) {
	console.log(strIn)
	var prompt = JSON.stringify(strIn);
	console.log(prompt);


// 	
}
export {parseJSONPrompt};

