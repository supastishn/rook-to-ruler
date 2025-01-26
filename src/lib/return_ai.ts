import OpenAI from "openai";

//secure this on proeudtion
const openai = new OpenAI({apiKey: "", dangerouslyAllowBrowser: true});

export function getOpenAiSecure() {
	return openai
}
