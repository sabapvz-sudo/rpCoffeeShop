'use client';

import React, { useState, useRef, useEffect } from 'react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const STARTER_SUGGESTIONS = [
  '☕ What are Happy Pour Hours?',
  '✨ Recommend a sweet, cozy drink',
  '🥛 Do you charge for oat milk?',
  '🌿 Tell me about the Panama Geisha',
  '📍 Where is the free parking?',
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content:
        "Hello and welcome to **Velvet Bean Café**! ☕ I'm **Beany**, your friendly Master Barista Concierge.\n\nIt is my absolute pleasure to assist you! How may I help guide your coffee ritual today?",
      timestamp: 'Just now',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, loading]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      // Send conversation history to our Next.js API route
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch response: ${res.status}`);
      }

      const data = await res.json();
      const replyText =
        data.reply ||
        "I'm sorry, I couldn't pull that answer right now. Please ask our baristas at the counter or try again!";

      setMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          role: 'assistant',
          content: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'assistant',
          content:
            "I'm Beany! My connection momentarily paused, but I am ready now. Please feel free to ask again or visit us at 428 Artisan Way!",
          timestamp: 'Just now',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        content:
          "Fresh cup! How can I help guide your coffee ritual today?",
        timestamp: 'Just now',
      },
    ]);
  };

  // Simple Markdown renderer for bold text, bullet points, and paragraphs
  const renderFormattedContent = (content: string) => {
    return content.split('\n').map((line, idx) => {
      // Bullet points
      if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
        const bulletText = line.trim().substring(2);
        return (
          <li key={idx} className="ml-4 list-disc mb-1 leading-relaxed">
            {formatInline(bulletText)}
          </li>
        );
      }
      // Blank lines
      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }
      // Normal paragraph
      return (
        <p key={idx} className="mb-1 leading-relaxed">
          {formatInline(line)}
        </p>
      );
    });
  };

  // Format bold **text**
  const formatInline = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-bold text-primary">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open AI Barista Chat"
            className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-primary text-on-primary shadow-warm-modal hover:bg-primary-container hover:scale-105 active:scale-95 transition-all duration-300 border border-primary-fixed/30 group"
          >
            <div className="relative">
              <span className="material-symbols-outlined text-[22px] group-hover:rotate-12 transition-transform">
                chat_bubble
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 absolute -top-0.5 -right-0.5 ring-2 ring-primary animate-pulse" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold leading-none tracking-wide">
                Ask Beany
              </span>
              <span className="text-[10px] text-primary-fixed/90 font-medium">
                AI Master Barista
              </span>
            </div>
          </button>
        )}
      </div>

      {/* Expanded Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-50 w-[92vw] sm:w-[400px] h-[550px] max-h-[80vh] bg-surface rounded-3xl shadow-2xl border border-primary/20 flex flex-col overflow-hidden animate-slideUp">
          {/* Header */}
          <div className="p-4 bg-surface-container border-b border-primary/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-2xl bg-primary text-on-primary flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-[22px]">local_cafe</span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute -bottom-0.5 -right-0.5 ring-2 ring-surface-container" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-display font-bold text-sm text-on-surface">
                    Beany
                  </h3>
                  <span className="px-1.5 py-0.2 rounded-full bg-secondary-container text-on-secondary-container text-[9px] font-bold uppercase tracking-wider">
                    Gemini AI
                  </span>
                </div>
                <span className="text-[11px] text-on-surface-variant font-medium">
                  Roastery Concierge • Online
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={clearChat}
                title="Restart conversation"
                className="w-8 h-8 rounded-full hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors"
                aria-label="Clear chat"
              >
                <span className="material-symbols-outlined text-[18px]">restart_alt</span>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors"
                aria-label="Close chat"
              >
                <span className="material-symbols-outlined text-[20px]">expand_more</span>
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs sm:text-sm">
            {messages.map(m => (
              <div
                key={m.id}
                className={`flex flex-col ${
                  m.role === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl shadow-sm ${
                    m.role === 'user'
                      ? 'bg-primary text-on-primary rounded-tr-none'
                      : 'bg-surface-container-lowest text-on-surface rounded-tl-none border border-primary/10'
                  }`}
                >
                  {renderFormattedContent(m.content)}
                </div>
                <span className="text-[10px] text-on-surface-variant/60 mt-1 px-1">
                  {m.timestamp}
                </span>
              </div>
            ))}

            {/* Typing Loader */}
            {loading && (
              <div className="flex items-start gap-2">
                <div className="bg-surface-container-lowest text-on-surface-variant p-3.5 rounded-2xl rounded-tl-none border border-primary/10 shadow-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px] animate-spin">
                    progress_activity
                  </span>
                  <span className="text-xs italic">Beany is preparing your answer...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Starter Suggestions (Shown if only welcome message) */}
          {messages.length === 1 && (
            <div className="px-4 pb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant block mb-1.5">
                Suggested Questions
              </span>
              <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
                {STARTER_SUGGESTIONS.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(s)}
                    className="px-3 py-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-[11px] font-semibold text-on-surface whitespace-nowrap border border-primary/10 transition-all active:scale-95 flex-shrink-0"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Footer */}
          <div className="p-3 bg-surface-container border-t border-primary/10">
            <div className="flex items-center gap-2 bg-surface rounded-2xl px-3 py-1.5 border border-primary/15 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
              <input
                ref={inputRef}
                type="text"
                placeholder="Ask about roasts, notes, or hours..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
                className="flex-1 bg-transparent text-xs sm:text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || loading}
                aria-label="Send message"
                className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                  input.trim() && !loading
                    ? 'bg-primary text-on-primary hover:bg-primary-container active:scale-95 shadow-sm'
                    : 'bg-surface-container text-on-surface-variant/40 cursor-not-allowed'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </div>
            <div className="flex items-center justify-between mt-1.5 px-1 text-[10px] text-on-surface-variant/70">
              <span>Press Enter to send</span>
              <span>Powered by Google Gemini</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
