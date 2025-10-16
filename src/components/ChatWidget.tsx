import React, { useEffect, useMemo, useRef, useState } from 'react';

type Message = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
};

type ChatWidgetProps = {
  title?: string;
};

// Suggestion bubbles for initial prompts
const SUGGESTIONS = [
  "What's your tech stack and specialization?",
  "Where are you right now?",
  "What projects have you built?",
  "What makes you unique as a developer?",
];

// Backend URL - update this with your Render URL
const BACKEND_URL = import.meta.env.VITE_CHAT_API_URL || 'https://wisest.onrender.com';

const ChatWidget: React.FC<ChatWidgetProps> = ({ title = 'Ask me Anything' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  // Hide suggestions after first message
  useEffect(() => {
    if (messages.length > 0) {
      setShowSuggestions(false);
    }
  }, [messages]);

  const canSend = useMemo(() => input.trim().length > 0 && !isLoading, [input, isLoading]);

  async function sendMessage() {
    const text = input.trim();
    if (!text) return;
    setInput('');
    const userMsg: Message = { id: crypto.randomUUID(), role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });
      if (!res.ok) throw new Error('Request failed');
      const data = await res.json();
      const assistantMsg: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: data.answer ?? 'Sorry, I could not generate a response.',
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: 'assistant', content: 'Something went wrong. Please try again.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSuggestionClick(suggestion: string) {
    setInput(suggestion);
    // Automatically send the message
    setTimeout(() => {
      const text = suggestion.trim();
      if (!text) return;
      setInput('');
      const userMsg: Message = { id: crypto.randomUUID(), role: 'user', content: text };
      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);
      fetch(`${BACKEND_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })
        .then((res) => {
          if (!res.ok) throw new Error('Request failed');
          return res.json();
        })
        .then((data) => {
          const assistantMsg: Message = {
            id: crypto.randomUUID(),
            role: 'assistant',
            content: data.answer ?? 'Sorry, I could not generate a response.',
          };
          setMessages((prev) => [...prev, assistantMsg]);
        })
        .catch(() => {
          setMessages((prev) => [
            ...prev,
            { id: crypto.randomUUID(), role: 'assistant', content: 'Something went wrong. Please try again.' },
          ]);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 0);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      if (canSend) sendMessage();
    }
  }

  return (
    <div style={{ position: 'fixed', right: 20, bottom: 20, zIndex: 1000 }}>
      {!isOpen && (
        <button
          aria-label="Open chat"
          onClick={() => setIsOpen(true)}
          style={{
            borderRadius: 999,
            padding: '14px',
            background: 'linear-gradient(135deg, rgba(0,0,0,0.75), rgba(237,154,176,0.25))',
            color: '#fff',
            border: '1px solid rgba(237,154,176,0.35)',
            boxShadow: '0 8px 24px rgba(237,154,176,0.25), inset 0 0 0 1px rgba(255,255,255,0.05)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      )}
      {isOpen && (
        <div
          style={{
            width: 320,
            height: 420,
            background:
              'linear-gradient(135deg, rgba(0,0,0,0.65) 0%, rgba(237,154,176,0.15) 100%)',
            border: '1px solid rgba(237,154,176,0.35)',
            borderRadius: 12,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            color: '#f1f1f1',
            backdropFilter: 'blur(8px) saturate(120%)',
            boxShadow: '0 10px 30px rgba(237,154,176,0.25)',
          }}
        >
          <div style={{ padding: '10px 12px', paddingRight: 40, borderBottom: '1px solid rgba(237,154,176,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', position: 'relative' }}>
            <strong style={{ fontSize: 16 }}>{title}</strong>
            <button
              aria-label="Close chat"
              onClick={() => setIsOpen(false)}
              style={{ background: 'transparent', color: '#ed9ab0', border: 'none', cursor: 'pointer', position: 'absolute', right: 10, top: 8 }}
            >
              ✕
            </button>
          </div>
          <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: 12 }} aria-live="polite" aria-atomic>
            {/* Show suggestions if no messages yet */}
            {showSuggestions && messages.length === 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ color: '#e6e6e6', fontSize: 14, marginBottom: 8, textAlign: 'center' }}>
                  👋 Hi! Ask me anything about Shirley
                </div>
                {SUGGESTIONS.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestionClick(suggestion)}
                    style={{
                      background: 'linear-gradient(135deg, rgba(237,154,176,0.25), rgba(0,0,0,0.35))',
                      color: '#e6e6e6',
                      border: '1px solid rgba(237,154,176,0.35)',
                      borderRadius: 10,
                      padding: '10px 12px',
                      cursor: 'pointer',
                      fontSize: 13,
                      textAlign: 'left',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 2px 8px rgba(237,154,176,0.15)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(237,154,176,0.35), rgba(0,0,0,0.45))';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(237,154,176,0.25)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(237,154,176,0.25), rgba(0,0,0,0.35))';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(237,154,176,0.15)';
                    }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
            
            {/* Show messages */}
            {messages.map((m) => (
              <div key={m.id} style={{ margin: '8px 0', display: 'flex' }}>
                <div
                  style={{
                    background:
                      m.role === 'assistant'
                        ? 'linear-gradient(135deg, rgba(0,0,0,0.35), rgba(237,154,176,0.15))'
                        : '#ed9ab0',
                    color: m.role === 'assistant' ? '#e6e6e6' : '#000',
                    padding: '8px 10px',
                    borderRadius: 10,
                    maxWidth: '80%',
                    whiteSpace: 'pre-wrap',
                    border: m.role === 'assistant' ? '1px solid rgba(237,154,176,0.25)' : '1px solid rgba(0,0,0,0.15)',
                    boxShadow:
                      m.role === 'assistant'
                        ? '0 4px 12px rgba(237,154,176,0.15)'
                        : '0 4px 12px rgba(237,154,176,0.35)',
                  }}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div style={{ margin: '8px 0', color: '#aaa', fontSize: 12 }}>Thinking…</div>
            )}
          </div>
          <div style={{ padding: 10, borderTop: '1px solid rgba(237,154,176,0.25)', display: 'flex', gap: 8 }}>
            <input
              type="text"
              placeholder={isLoading ? 'Please wait…' : "Ask about my projects or experience…"}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              aria-label="Message"
              style={{
                flex: 1,
                background: 'rgba(0,0,0,0.45)',
                border: '1px solid rgba(237,154,176,0.35)',
                borderRadius: 8,
                padding: '10px 12px',
                color: '#fff',
                outline: 'none',
                boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.03)'
              }}
            />
            <button
              onClick={sendMessage}
              disabled={!canSend}
              aria-label="Send message"
              style={{
                background: canSend ? '#ed9ab0' : '#2a2a2a',
                color: canSend ? '#000' : '#888',
                border: '1px solid rgba(237,154,176,0.35)',
                borderRadius: 8,
                padding: '10px 12px',
                cursor: canSend ? 'pointer' : 'not-allowed',
                boxShadow: canSend ? '0 6px 18px rgba(237,154,176,0.35)' : 'none',
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;


