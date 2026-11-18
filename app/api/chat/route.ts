import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';

// High-availability model candidate pool in priority order
const CANDIDATE_MODELS = [
  'gemini-3.5-flash-lite',
  'gemini-3.6-flash',
  'gemini-flash-lite-latest',
  'gemini-3.8-flash',
  'gemini-3.1-flash-lite',
];

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Gemini API key is not configured' },
        { status: 500 }
      );
    }

    // Load company info knowledge base dynamically from COMPANY_INFO.md
    let companyInfo = '';
    try {
      const companyInfoPath = path.join(process.cwd(), 'COMPANY_INFO.md');
      if (fs.existsSync(companyInfoPath)) {
        companyInfo = fs.readFileSync(companyInfoPath, 'utf8');
      }
    } catch (err) {
      console.warn('Could not read COMPANY_INFO.md, using default context', err);
    }

    const systemPrompt = `You are "Beany", the friendly Master Barista and Roastery Concierge at Velvet Bean Café, located at 428 Artisan Way in the Historic Mill District (Coffee Quarter).
Your personality is exceptionally polite, warm, courteous, and passionate about artisanal coffee craft.

Here is your authoritative knowledge base about Velvet Bean Café:
---
${companyInfo}
---

CRITICAL RESPONSE RULES:
1. NAME: Your name is "Beany".
2. MANNER: Always remain very polite, courteous, and hospitable (e.g., "Welcome to Velvet Bean Café!", "It's my pleasure to assist you!").
3. STRICT LENGTH LIMIT: Your ENTIRE reply MUST be a MAXIMUM OF 5 LINES. Keep answers concise, clear, and direct without unnecessary filler.
4. ACCURACY: Strictly rely on the knowledge base above for prices, menu items, origins, roastery hours (7:00 AM – 9:00 PM daily), Happy Pour Hours (2:00 PM – 5:00 PM daily: 15% off manual pour-overs), and free 2-hour parking behind the building.
5. HIGHLIGHTS: Bold drink names and prices, mention $0 extra charge for plant-based milks when relevant, and note Swiss Water Decaf availability.`;

    // Map conversation history to Gemini contents format
    const formattedContents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' || m.role === 'model' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    let lastError: any = null;
    let replyText = '';

    // Attempt generation across the candidate model pool
    for (const model of CANDIDATE_MODELS) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              systemInstruction: {
                parts: [{ text: systemPrompt }],
              },
              contents: formattedContents,
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 1024,
              },
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const candidate = data.candidates?.[0];
          replyText = candidate?.content?.parts?.[0]?.text?.trim() || '';
          if (replyText) {
            break; // Successfully generated response!
          }
        } else {
          const errorText = await response.text();
          console.warn(`Model ${model} returned ${response.status}: ${errorText.substring(0, 150)}`);
          lastError = { status: response.status, text: errorText };
          // If 503 (high demand) or 429, loop to next candidate model
        }
      } catch (err: any) {
        console.warn(`Fetch error for ${model}:`, err.message);
        lastError = err;
      }
    }

    // If all models failed or returned empty, provide a polite, intelligent fallback from Beany
    if (!replyText) {
      const lastUserMsg = messages[messages.length - 1]?.content?.toLowerCase() || '';

      if (lastUserMsg.includes('hour') || lastUserMsg.includes('open') || lastUserMsg.includes('time')) {
        replyText = "Welcome to Velvet Bean Café! I'm Beany. We are open daily from **7:00 AM to 9:00 PM** at 428 Artisan Way. Our **Happy Pour Hours** run 2:00 PM – 5:00 PM with 15% off all manual pour-overs! How may I assist your cup today?";
      } else if (lastUserMsg.includes('park') || lastUserMsg.includes('location') || lastUserMsg.includes('address')) {
        replyText = "Hello! I'm Beany. You'll find us at **428 Artisan Way** in the Historic Mill District. We have **free 2-hour customer parking** directly behind our roastery building! We would love to welcome you.";
      } else if (lastUserMsg.includes('milk') || lastUserMsg.includes('oat') || lastUserMsg.includes('vegan')) {
        replyText = "Hello! I'm Beany. We proudly offer **Oat, Macadamia, Almond, and Pistachio milks with $0 extra charge**! Any of our specialty espresso beverages can also be crafted with Swiss Water Decaf. What may I prepare for you?";
      } else if (lastUserMsg.includes('recommend') || lastUserMsg.includes('sweet') || lastUserMsg.includes('drink')) {
        replyText = "Welcome! I'm Beany, and I'd be delighted to recommend a cup! For something rich and comforting, try our **Madagascar Vanilla Bean Latte** ($5.25) or **Salted Caramel Macchiato** ($5.50). Would you prefer it hot or iced?";
      } else {
        replyText = "Hello and welcome to Velvet Bean Café! I'm **Beany**, your Master Barista Concierge.\nIt's my pleasure to serve you today! How may I assist your coffee ritual or recommend a special roast?";
      }
    }

    return NextResponse.json({ reply: replyText });
  } catch (error: any) {
    console.error('Chat API general error:', error);
    // Never crash or leave customer stranded: return polite fallback
    return NextResponse.json({
      reply: "Hello and welcome to Velvet Bean Café! I'm **Beany**, your Master Barista Concierge.\nIt is my absolute pleasure to assist you! How may I help guide your coffee ritual today?",
    });
  }
}
