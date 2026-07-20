import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { complete, hasApiKey, type ChatMessage } from "@/lib/anthropic";

export const runtime = "nodejs";

type Body = {
  system?: string;
  max_tokens?: number;
  messages?: ChatMessage[];
};

const KEY_MISSING =
  "Coach Bob isn't connected to his AI yet. Add an ANTHROPIC_API_KEY to the server environment to turn drafting and coaching on.";

export async function POST(req: NextRequest) {
  // Costs real API money per call — restricted to approved accounts so a
  // wide-open trial signup (or a bot that finds this URL) can't drain it.
  const session = await auth();
  if (!session?.user?.approved) {
    return NextResponse.json(
      { error: "This feature isn't available on your account yet.", code: "not_approved" },
      { status: 403 },
    );
  }

  if (!hasApiKey()) {
    return NextResponse.json({ error: KEY_MISSING, code: "no_api_key" }, { status: 503 });
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { system, max_tokens, messages } = body;
  if (!system || !Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "Missing system prompt or messages." }, { status: 400 });
  }

  try {
    const text = await complete({
      system,
      max_tokens: Math.min(Math.max(max_tokens ?? 800, 1), 2000),
      messages,
    });
    return NextResponse.json({ text });
  } catch (err) {
    console.error("[/api/complete]", err);
    return NextResponse.json(
      { error: "Coach Bob couldn’t reach his AI just now. Try again in a moment." },
      { status: 502 },
    );
  }
}
