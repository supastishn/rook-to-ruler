import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';


const endpointSecret = ""



export const POST: RequestHandler = async ({request, cookies, url}) => {
	import OpenAI from "openai";
const openai = new OpenAI();

const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
        { role: "system", content: "You are a chess bot that is built to solve a position. You shall recieve a position in FEN, then tell the user the best move along with an explanation on why this is the best move." },
        {
            role: "user",
            content: "Hello! Please help me with this fen position: " + request.body.fen,
        },
    ],
    store: true,
});

console.log(completion.choices[0].message);
}
