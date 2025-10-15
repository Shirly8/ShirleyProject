export type ChatRequest = {
  message: string;
};

export type ChatResponse = {
  answer: string;
};

export async function sendChatMessage(req: ChatRequest): Promise<ChatResponse> {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  });
  if (!res.ok) {
    throw new Error('Failed to send chat message');
  }
  return res.json();
}


