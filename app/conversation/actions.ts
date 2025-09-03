"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Store user info per session
const userContext: {
  birthDate?: string;
  birthTime?: string;
  birthPlace?: string;
  gender?: string;
} = {};

export async function getResponse(prompt: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // ----- 1️⃣ Detect birth details from user input -----
  const birthDateMatch = prompt.match(
    /(\d{1,2}\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s\d{4})|(\d{1,2}\/\d{1,2}\/\d{4})|(\d{1,2}-\d{1,2}-\d{4})/i
  );
  if (birthDateMatch) userContext.birthDate = birthDateMatch[0];

  const birthTimeMatch = prompt.match(/\b(\d{1,2}(:\d{2})?\s*(AM|PM|am|pm)?)\b/);
  if (birthTimeMatch) userContext.birthTime = birthTimeMatch[0];

  const birthPlaceMatch = prompt.match(
    /(?:born in|birthplace is|birth place|my birthplace (?:is|was)|at)\s+([A-Za-z\s]+)/i
  );
  if (birthPlaceMatch) userContext.birthPlace = birthPlaceMatch[1].trim();

  const genderMatch = prompt.match(/\b(I am|My gender is)\s+(male|female|other)\b/i);
  if (genderMatch) userContext.gender = genderMatch[2].toLowerCase();

  // ----- 2️⃣ Build context info for AI -----
  const knownInfo = `Known birth details:
- Date: ${userContext.birthDate || "unknown"}
- Time: ${userContext.birthTime || "unknown"}
- Place: ${userContext.birthPlace || "unknown"}
- Gender: ${userContext.gender || "unknown"}`;

  const missingInfo: string[] = [];
  if (!userContext.birthDate) missingInfo.push("birth date");
  if (!userContext.birthTime) missingInfo.push("birth time");
  if (!userContext.birthPlace) missingInfo.push("birth place");
  if (!userContext.gender) missingInfo.push("gender");

  let missingInfoText = "";
  if (missingInfo.length > 0) {
    missingInfoText = `Please ask politely for the following missing info if necessary: ${missingInfo.join(
      ", "
    )}.`;
  }

  // ----- 3️⃣ System prompt -----
  const systemPrompt = `
You are Luma, a calm, sweet, and supportive AI astrologer.
Use the following information if available and never ask for details already provided:
${knownInfo}

${missingInfoText}

Always answer all user questions directly based on available information.
If something is missing, politely ask for that specific detail.
Keep responses short, polite, astrology-focused, and in the language the user uses.
`;

  // ----- 4️⃣ Start chat -----
  const chat = model.startChat({
    history: [
      { role: "user", parts: [{ text: systemPrompt }] }, // system prompt goes as first user message
      {
        role: "model",
        parts: [
          {
            text:
              "Hello! I’m Luma ✨ your calm and sweet astrologer. I’m here to guide you gently through love, career, and your future.",
          },
        ],
      },
      { role: "user", parts: [{ text: prompt }] },
    ],
  });  

  const result = await chat.sendMessage(prompt);
  const response = await result.response;
  const text = response.text();

  return text;
}