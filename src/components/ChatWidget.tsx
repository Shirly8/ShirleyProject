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
  "What personal projects have you built?",
  "What makes you unique?",
  "When do you graduate?"
];

// Backend URL - update this with your Render URL
const BACKEND_URL = import.meta.env.VITE_CHAT_API_URL || 'https://wisest.onrender.com';

const ChatWidget: React.FC<ChatWidgetProps> = ({ title = 'Ask me Anything' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [showInfoTooltip, setShowInfoTooltip] = useState(false);
  const [typingMessageId, setTypingMessageId] = useState<string | null>(null);
  const [displayedContent, setDisplayedContent] = useState<{ [key: string]: string }>({});
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  // Show suggestions when no messages or after assistant responds (and typing is done)
  useEffect(() => {
    if (messages.length === 0) {
      setShowSuggestions(true);
    } else {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'user') {
        // Hide suggestions when user sends a message
        setShowSuggestions(false);
      }
      // Suggestions will be shown when typing completes (handled in typing effect)
    }
  }, [messages]);

  // Typing animation effect for assistant messages
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage || lastMessage.role !== 'assistant') return;
    
    // Check if this message is already fully displayed
    if (displayedContent[lastMessage.id] === lastMessage.content) return;
    
    // Start typing animation
    setTypingMessageId(lastMessage.id);
    setShowSuggestions(false); // Hide suggestions while typing
    let currentIndex = 0;
    const fullContent = lastMessage.content;
    
    const typingInterval = setInterval(() => {
      currentIndex++;
      setDisplayedContent(prev => ({
        ...prev,
        [lastMessage.id]: fullContent.slice(0, currentIndex)
      }));
      
      if (currentIndex >= fullContent.length) {
        clearInterval(typingInterval);
        setTypingMessageId(null);
        setShowSuggestions(true); // Show suggestions after typing completes
      }
    }, 20); // Adjust speed here (lower = faster)
    
    return () => clearInterval(typingInterval);
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
    if (e.key === 'Enter') {
      e.preventDefault();
      if (canSend) sendMessage();
    }
  }

  return (
    <>
      <style>
        {`
          @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }
        `}
      </style>
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
            <strong style={{ fontSize: 14 }}>{title}</strong>
            <div 
              style={{ 
                position: 'relative', 
                display: 'inline-flex', 
                marginLeft: 6,
                cursor: 'help'
              }}
              onMouseEnter={() => setShowInfoTooltip(true)}
              onMouseLeave={() => setShowInfoTooltip(false)}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(237,154,176,0.7)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ 
                  transition: 'stroke 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.stroke = '#ed9ab0'}
                onMouseLeave={(e) => e.currentTarget.style.stroke = 'rgba(237,154,176,0.7)'}
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              {showInfoTooltip && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '-140px',
                    marginTop: 8,
                    width: 280,
                    background: 'linear-gradient(135deg, rgba(0,0,0,0.95), rgba(237,154,176,0.15))',
                    border: '1px solid rgba(237,154,176,0.4)',
                    borderRadius: 8,
                    padding: '12px',
                    color: '#e6e6e6',
                    fontSize: 11,
                    lineHeight: '1.5',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.6), 0 0 0 1px rgba(237,154,176,0.2)',
                    zIndex: 1001,
                    backdropFilter: 'blur(12px)',
                    pointerEvents: 'none'
                  }}
                >
                  <div style={{ fontWeight: 600, color: '#ed9ab0', marginBottom: 6 }}>
                    🤖 RAG-Powered Chat
                  </div>
                  <div style={{ fontSize: 10 }}>
                    This chat uses <strong>Retrieval Augmented Generation</strong> to provide accurate answers about my experiences.
                  </div>
                  <div style={{ marginTop: 8, fontSize: 10, color: '#ccc' }}>
                    <strong style={{ color: '#ed9ab0' }}>Tech Stack:</strong>
                    <br />
                    • <strong>Cohere</strong> embeddings for semantic search
                    <br />
                    • <strong>Supabase</strong> vector database for storage
                    <br />
                    • <strong>Groq AI</strong> for fast LLM inference
                    <br />
                    • Custom <strong>query</strong> backend
                  </div>
                </div>
              )}
            </div>
            <button
              aria-label="Close chat"
              onClick={() => setIsOpen(false)}
              style={{ background: 'transparent', color: '#ed9ab0', border: 'none', cursor: 'pointer', position: 'absolute', right: 10, top: 8 }}
            >
              ✕
            </button>
          </div>
          <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: 12 }} aria-live="polite" aria-atomic>
            {/* Show messages */}
            {messages.map((m) => {
              const contentToShow = m.role === 'assistant' && displayedContent[m.id] 
                ? displayedContent[m.id] 
                : m.content;
              const isCurrentlyTyping = typingMessageId === m.id;
              
              return (
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
                      fontSize: 13,
                      whiteSpace: 'pre-wrap',
                      border: m.role === 'assistant' ? '1px solid rgba(237,154,176,0.25)' : '1px solid rgba(0,0,0,0.15)',
                      boxShadow:
                        m.role === 'assistant'
                          ? '0 4px 12px rgba(237,154,176,0.15)'
                          : '0 4px 12px rgba(237,154,176,0.35)',
                    }}
                  >
                    {contentToShow}
                    {isCurrentlyTyping && (
                      <span style={{ 
                        opacity: 0.7, 
                        animation: 'blink 1s infinite',
                        marginLeft: 2
                      }}>▋</span>
                    )}
                  </div>
                </div>
              );
            })}
            
            {/* Show suggestions after assistant response */}
            {showSuggestions && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: messages.length > 0 ? 12 : 0 }}>
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
                      fontSize: 12,
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
            
            {isLoading && (
              <div style={{ margin: '8px 0', color: '#aaa', fontSize: 11 }}>Thinking…</div>
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
                fontSize: 13,
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
                fontSize: 13,
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
    </>
  );
};

export default ChatWidget;


