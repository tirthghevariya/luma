"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Store user info per session
let userContext: { birthDate?: string; birthTime?: string; birthPlace?: string } = {};

export async function getResponse(prompt: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Detect and store birth details from user input
  const birthDateMatch = prompt.match(/\b(\d{1,2}\s\w+\s\d{4})\b/); 
  const birthTimeMatch = prompt.match(/\b(\d{1,2}:\d{2}\s*(?:AM|PM|am|pm)?)\b/); 
  const birthPlaceMatch = prompt.match(/(?:in|at)\s([A-Za-z\s]+)/); 

  if (birthDateMatch) userContext.birthDate = birthDateMatch[1];
  if (birthTimeMatch) userContext.birthTime = birthTimeMatch[1];
  if (birthPlaceMatch) userContext.birthPlace = birthPlaceMatch[1];

  // Build context summary for Luma
  let contextInfo = "";
  if (userContext.birthDate || userContext.birthTime || userContext.birthPlace) {
    contextInfo = `User has shared: ${userContext.birthDate || "unknown date"}, ${userContext.birthTime || "unknown time"}, ${userContext.birthPlace || "unknown place"}.`;
  }

  const systemPrompt = `
You are Luma, a calm, sweet, and supportive AI astrologer. Respond in the same language as the user. 
Keep responses short, polite, and astrology-focused. 
Remember any birth details the user has provided and do not ask for them again.
If some details are missing, proceed gracefully and give insights using available information.
`;

  const chat = model.startChat({
    history: [
      { role: "user", parts: [{ text: systemPrompt }] },
      { role: "model", parts: [{ text: "Hello, I’m Luma ✨ your calm and sweet astrologer. I’m here to gently guide you through love, career, and your future. May I know your birth date, time, and place so I can look into the stars for you?" }] },
      { role: "user", parts: [{ text: contextInfo + "\n" + prompt }] }
    ]
  });

  const result = await chat.sendMessage(prompt);
  const response = await result.response;
  const text = response.text();

  return text;
}