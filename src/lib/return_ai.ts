import OpenAI from "openai";

//secure this on proeudtion
//change api key
const openai = new OpenAI({apiKey: 'YOUR API KEY HERE', dangerouslyAllowBrowser: true});

export function getOpenAiSecure() {
	return openai
}
