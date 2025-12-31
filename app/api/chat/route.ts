// // /app/api/chat/route.ts
// import Groq from "groq-sdk";
// import { NextRequest } from "next/server";
// import * as z from "zod";

// const chatSchema = z.object({
//   message: z.string().min(1).max(2000),
//   history: z
//     .array(
//       z.object({
//         role: z.enum(["user", "model"]),
//         parts: z.array(z.object({ text: z.string() })),
//       })
//     )
//     .optional()
//     .default([]),
// });

// const groq = new Groq({
//   apiKey: process.env.GROQ_API_KEY,
// });

// function toGroqMessages(history: any[], userMsg: string) {
//   const messages = history.map((msg) => ({
//     role: msg.role === "user" ? "user" : "assistant",
//     content: msg.parts[0].text,
//   }));

//   messages.push({
//     role: "user",
//     content: userMsg,
//   });

//   return messages;
// }

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const validated = chatSchema.parse(body);

//     const groqMessages = toGroqMessages(validated.history, validated.message);

//     const completion = await groq.chat.completions.create({
//       model: "llama-3.3-70b-versatile", // ✅ UPDATED MODEL
//       messages: groqMessages,
//       stream: true,
//     });

//     const stream = new ReadableStream({
//       async start(controller) {
//         const encoder = new TextEncoder();

//         for await (const chunk of completion) {
//           const delta = chunk.choices[0]?.delta?.content;
//           if (delta) {
//             controller.enqueue(
//               encoder.encode(`data: ${JSON.stringify({ text: delta })}\n\n`)
//             );
//           }
//         }

//         controller.enqueue(encoder.encode(`data: {"done": true}\n\n`));
//         controller.close();
//       },
//     });

//     return new Response(stream, {
//       headers: {
//         "Content-Type": "text/event-stream",
//         "Cache-Control": "no-cache, no-transform",
//         Connection: "keep-alive",
//       },
//     });

//   } catch (err) {
//     console.error("GROQ API ERROR:", err);
//     return new Response(JSON.stringify({ error: "Chat failed" }), {
//       status: 500,
//     });
//   }
// }

// export function GET() {
//   return new Response("Method not allowed", { status: 405 });
// }


import Groq from "groq-sdk";
import { NextRequest } from "next/server";
import * as z from "zod";

type Msg = { role: "user" | "assistant"; content: string };

const schema = z.object({
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

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const toMsgs = (
  h: { role: "user" | "model"; parts: { text: string }[] }[],
  m: string
): Msg[] => {
  const historyMsgs: Msg[] = h.map((x) => ({
    role: x.role === "user" ? "user" : "assistant",
    content: x.parts[0]?.text ?? "",
  }));
 return [...historyMsgs, { role: "user", content: m }];
};

export async function POST(req: NextRequest) {
  try {
    const { message, history } = schema.parse(await req.json());

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: toMsgs(history, message),
      stream: true,
    });

    const stream = new ReadableStream({
      async start(c) {
        const e = new TextEncoder();
        for await (const ch of completion) {
          const d = ch.choices[0]?.delta?.content;
          if (d) c.enqueue(e.encode(`data: ${JSON.stringify({ text: d })}\n\n`));
        }
        c.enqueue(e.encode(`data: {"done": true}\n\n`));
        c.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch {
    return new Response(JSON.stringify({ error: "Chat failed" }), { status: 500 });
  }
}
