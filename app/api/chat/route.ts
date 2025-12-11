// /app/api/chat/route.ts
import Groq from "groq-sdk";
import { NextRequest } from "next/server";
import * as z from "zod";

const chatSchema = z.object({
  message: z.string().min(1).max(2000),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "model"]),
        parts: z.array(z.object({ text: z.string() })),
      })
    )
    .optional()
    .default([]),
});

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

function toGroqMessages(history: any[], userMsg: string) {
  const messages = history.map((msg) => ({
    role: msg.role === "user" ? "user" : "assistant",
    content: msg.parts[0].text,
  }));

  messages.push({
    role: "user",
    content: userMsg,
  });

  return messages;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = chatSchema.parse(body);

    const groqMessages = toGroqMessages(validated.history, validated.message);

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile", // ✅ UPDATED MODEL
      messages: groqMessages,
      stream: true,
    });

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();

        for await (const chunk of completion) {
          const delta = chunk.choices[0]?.delta?.content;
          if (delta) {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ text: delta })}\n\n`)
            );
          }
        }

        controller.enqueue(encoder.encode(`data: {"done": true}\n\n`));
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });

  } catch (err) {
    console.error("GROQ API ERROR:", err);
    return new Response(JSON.stringify({ error: "Chat failed" }), {
      status: 500,
    });
  }
}

export function GET() {
  return new Response("Method not allowed", { status: 405 });
}
