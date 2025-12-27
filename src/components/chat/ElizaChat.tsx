'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  content: string;
  authorId: string;
  isAgent: boolean;
  createdAt: string;
}

interface SessionData {
  sessionId: string;
  channelId: string;
  agentId: string;
  userId: string;
  expiresAt: string;
}

interface SlashCommand {
  name: string;
  description: string;
  icon: string;
}

const ELIZA_URL = 'http://localhost:3000';
const SESSION_KEY = 'eliza_session';

const SLASH_COMMANDS: SlashCommand[] = [
  { name: 'suggestions', description: 'Get conversation starters', icon: '✨' },
  { name: 'help', description: 'Show available commands', icon: '?' },
  { name: 'about', description: 'Learn about the moonspeaker', icon: '🐺' },
  { name: 'clear', description: 'Clear chat history', icon: '🗑' },
  { name: 'new', description: 'Start a new session', icon: '↻' },
];

const PROMPT_SUGGESTIONS = [
  "Tell me about the six wolf tribes of Primordia",
  "What happened to Nogard?",
  "What's the current moon phase?",
];

function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function getStoredUserId(): string {
  if (typeof window === 'undefined') {
    return generateUUID();
  }

  const stored = localStorage.getItem('eliza_user_id');
  if (stored) {
    return stored;
  }

  const newUserId = generateUUID();
  localStorage.setItem('eliza_user_id', newUserId);
  return newUserId;
}

export default function ElizaChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState<SessionData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [selectedCommandIndex, setSelectedCommandIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);
  const lastMessageIdRef = useRef<string | null>(null);
  const waitingForResponseSinceRef = useRef<number | null>(null);

  // Filter commands based on input
  const filteredCommands = useMemo(() => {
    if (!input.startsWith('/')) return [];
    const query = input.slice(1).toLowerCase();
    return SLASH_COMMANDS.filter(cmd =>
      cmd.name.toLowerCase().startsWith(query)
    );
  }, [input]);

  // Show slash menu when typing /
  useEffect(() => {
    if (input.startsWith('/') && !input.includes(' ')) {
      setShowSlashMenu(true);
      setSelectedCommandIndex(0);
    } else {
      setShowSlashMenu(false);
    }
  }, [input]);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const focusInput = () => {
      inputRef.current?.focus();
    };
    focusInput();

    window.addEventListener('focus', focusInput);
    return () => window.removeEventListener('focus', focusInput);
  }, []);

  useEffect(() => {
    async function initSession() {
      try {
        const agentsRes = await fetch(`${ELIZA_URL}/api/agents`);
        if (!agentsRes.ok) throw new Error('Failed to fetch agents');
        const agentsData = await agentsRes.json();

        const agents = agentsData.data?.agents || agentsData.agents;
        if (!agents || agents.length === 0) {
          setError('No agents available. Make sure ElizaOS is running.');
          return;
        }

        const agentId = agents[0].id;
        const userId = getStoredUserId();

        const storedSession = localStorage.getItem(SESSION_KEY);
        if (storedSession) {
          try {
            const parsed = JSON.parse(storedSession);
            if (parsed.agentId === agentId && new Date(parsed.expiresAt) > new Date()) {
              setSession(parsed);
              setIsConnected(true);
              return;
            }
          } catch {
            // Invalid stored session, create new
          }
        }

        const sessionRes = await fetch(`${ELIZA_URL}/api/messaging/sessions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ agentId, userId }),
        });

        if (!sessionRes.ok) {
          const errData = await sessionRes.json();
          throw new Error(errData.error?.message || 'Failed to create session');
        }

        const sessionData = await sessionRes.json();
        const newSession: SessionData = {
          sessionId: sessionData.sessionId,
          channelId: sessionData.channelId,
          agentId: sessionData.agentId,
          userId: sessionData.userId,
          expiresAt: sessionData.expiresAt,
        };

        localStorage.setItem(SESSION_KEY, JSON.stringify(newSession));
        setSession(newSession);
        setIsConnected(true);
        setError(null);
      } catch (err) {
        console.error('Failed to initialize session:', err);
        setError(`Connection failed: ${ELIZA_URL}`);
        setIsConnected(false);
      }
    }

    initSession();
  }, []);

  const fetchMessages = useCallback(async () => {
    if (!session) return;

    try {
      const res = await fetch(`${ELIZA_URL}/api/messaging/sessions/${session.sessionId}/messages`);
      if (!res.ok) return;

      const data = await res.json();
      const newMessages: Message[] = data.messages || [];

      newMessages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

      const latestId = newMessages.length > 0 ? newMessages[newMessages.length - 1].id : null;
      if (latestId !== lastMessageIdRef.current) {
        lastMessageIdRef.current = latestId;
        setMessages(newMessages);

        // Check if we got a new agent response after we started waiting
        if (waitingForResponseSinceRef.current !== null) {
          const latestAgentMessage = [...newMessages].reverse().find(m => m.isAgent);
          if (latestAgentMessage) {
            const agentMessageTime = new Date(latestAgentMessage.createdAt).getTime();
            if (agentMessageTime > waitingForResponseSinceRef.current) {
              setIsLoading(false);
              waitingForResponseSinceRef.current = null;
            }
          }
        }
      }
    } catch (err) {
      console.error('Failed to fetch messages:', err);
    }
  }, [session]);

  useEffect(() => {
    if (!session) return;

    fetchMessages();
    pollingRef.current = setInterval(fetchMessages, 2000);

    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }
    };
  }, [session, fetchMessages]);

  const sendMessage = useCallback(async (text?: string) => {
    const messageText = (text || input).trim();
    if (!messageText || !session || isLoading) return;

    setInput('');
    setIsLoading(true);
    waitingForResponseSinceRef.current = Date.now();

    try {
      const res = await fetch(`${ELIZA_URL}/api/messaging/sessions/${session.sessionId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: messageText }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error?.message || 'Failed to send message');
      }

      await fetchMessages();
    } catch (err) {
      console.error('Failed to send message:', err);
      setError('Failed to send message');
      setIsLoading(false);
      waitingForResponseSinceRef.current = null;
    }
  }, [input, session, isLoading, fetchMessages]);

  const executeCommand = useCallback((command: SlashCommand) => {
    setInput('');
    setShowSlashMenu(false);

    switch (command.name) {
      case 'suggestions':
        setShowSuggestions(true);
        setSelectedSuggestionIndex(0);
        break;
      case 'help':
        // Show help as a system message
        setMessages(prev => [...prev, {
          id: generateUUID(),
          content: `Available commands:\n${SLASH_COMMANDS.map(c => `  /${c.name} - ${c.description}`).join('\n')}`,
          authorId: 'system',
          isAgent: true,
          createdAt: new Date().toISOString(),
        }]);
        break;
      case 'about':
        setMessages(prev => [...prev, {
          id: generateUUID(),
          content: "I am the Moonspeaker, a bridge between the wolves of Primordia and the human world. I carry the memories of six tribes, the echoes of four seasons of lore, and the mystery of Nogard's fate. Ask me anything about the pack.",
          authorId: 'system',
          isAgent: true,
          createdAt: new Date().toISOString(),
        }]);
        break;
      case 'clear':
        setMessages([]);
        lastMessageIdRef.current = null;
        break;
      case 'new':
        localStorage.removeItem(SESSION_KEY);
        setSession(null);
        setMessages([]);
        lastMessageIdRef.current = null;
        setIsConnected(false);
        // Re-init will happen via useEffect
        window.location.reload();
        break;
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (showSlashMenu && filteredCommands.length > 0) {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedCommandIndex(prev =>
          prev > 0 ? prev - 1 : filteredCommands.length - 1
        );
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedCommandIndex(prev =>
          prev < filteredCommands.length - 1 ? prev + 1 : 0
        );
        return;
      }
      if (e.key === 'Enter' || e.key === 'Tab') {
        e.preventDefault();
        executeCommand(filteredCommands[selectedCommandIndex]);
        return;
      }
      if (e.key === 'Escape') {
        setShowSlashMenu(false);
        setInput('');
        return;
      }
    }

    if (showSuggestions) {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedSuggestionIndex(prev =>
          prev > 0 ? prev - 1 : PROMPT_SUGGESTIONS.length - 1
        );
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedSuggestionIndex(prev =>
          prev < PROMPT_SUGGESTIONS.length - 1 ? prev + 1 : 0
        );
        return;
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        setShowSuggestions(false);
        sendMessage(PROMPT_SUGGESTIONS[selectedSuggestionIndex]);
        return;
      }
      if (e.key === 'Escape') {
        setShowSuggestions(false);
        return;
      }
    }

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

  return (
    <div className="h-screen w-screen flex flex-col font-mono text-sm md:text-base">
      {/* Status bar - top right */}
      <div className="absolute top-0 right-0 z-10 p-3 md:p-4">
        <div className="flex items-center gap-3 px-3 py-1.5 bg-black/70 backdrop-blur-sm border border-gray-800/50 rounded text-xs">
          <div className="flex items-center gap-1.5">
            <div
              className={`w-1.5 h-1.5 rounded-full ${
                isConnected ? 'bg-green-500 shadow-[0_0_4px_rgba(34,197,94,0.5)]' : 'bg-red-500'
              }`}
            />
            <span className="text-gray-400">
              {isConnected ? 'connected' : 'disconnected'}
            </span>
          </div>
          <span className="text-gray-700">|</span>
          <span className="text-purple-400">moonspeaker</span>
        </div>
      </div>

      {/* Messages area */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto flex flex-col"
      >
        <div className="flex-1" />

        <div className="p-4 md:p-6 space-y-3">
          {error && (
            <div className="text-red-500">
              <span className="text-red-700">[error]</span> {error}
            </div>
          )}

          {messages.map((msg) => (
            <div key={msg.id}>
              {msg.isAgent ? (
                <div className="leading-relaxed">
                  <span className="text-gray-600">[{formatTime(msg.createdAt)}]</span>{' '}
                  <span className="text-purple-400">moonspeaker</span>
                  <span className="text-gray-600">:</span>
                  <div className="ml-6 mt-1 prose prose-invert prose-sm max-w-none
                                prose-headings:text-purple-300 prose-headings:font-bold prose-headings:my-2
                                prose-p:text-gray-200 prose-p:my-1 prose-p:leading-relaxed
                                prose-strong:text-gray-100 prose-em:text-gray-300
                                prose-code:text-green-400 prose-code:bg-black/50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
                                prose-pre:bg-black/50 prose-pre:border prose-pre:border-gray-800 prose-pre:rounded prose-pre:my-2
                                prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline
                                prose-ul:my-1 prose-ol:my-1 prose-li:my-0.5 prose-li:text-gray-200
                                prose-blockquote:border-purple-500 prose-blockquote:text-gray-400">
                    <ReactMarkdown>
                      {msg.content.replace(/\\n/g, '\n')}
                    </ReactMarkdown>
                  </div>
                </div>
              ) : (
                <div className="leading-relaxed">
                  <span className="text-gray-600">[{formatTime(msg.createdAt)}]</span>{' '}
                  <span className="text-cyan-400">you</span>
                  <span className="text-gray-600">:</span>{' '}
                  <span className="text-gray-300">{msg.content}</span>
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="leading-relaxed">
              <span className="text-gray-600">[--:--:--]</span>{' '}
              <span className="text-purple-400">moonspeaker</span>
              <span className="text-gray-600">:</span>{' '}
              <span className="text-gray-500 animate-pulse">thinking...</span>
            </div>
          )}
        </div>

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions panel */}
      {showSuggestions && (
        <div className="shrink-0 bg-black/90 backdrop-blur-sm border-t border-purple-500/30 p-4 md:p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-purple-400 text-xs uppercase tracking-wider">Suggestions</span>
            <span className="text-gray-600 text-xs">
              ↑↓ navigate · ↵ select · esc close
            </span>
          </div>
          <div className="space-y-2">
            {PROMPT_SUGGESTIONS.map((suggestion, i) => (
              <button
                key={i}
                onClick={() => {
                  setShowSuggestions(false);
                  sendMessage(suggestion);
                }}
                className={`w-full text-left px-3 py-2 rounded transition-all text-sm flex items-center justify-between
                          ${i === selectedSuggestionIndex
                            ? 'bg-purple-500/20 border border-purple-500/40 text-gray-100'
                            : 'bg-purple-500/10 border border-purple-500/20 text-gray-300 hover:bg-purple-500/20 hover:border-purple-500/40 hover:text-gray-100'
                          }`}
              >
                <span>{suggestion}</span>
                {i === selectedSuggestionIndex && (
                  <span className="text-xs text-gray-500">↵</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input area */}
      <div className="shrink-0 bg-black/80 backdrop-blur-sm border-t border-gray-800/50 p-4 md:p-6 relative">
        {/* Slash command menu */}
        {showSlashMenu && filteredCommands.length > 0 && (
          <div className="absolute bottom-full left-4 right-4 mb-2 bg-black/95 backdrop-blur-sm
                        border border-gray-800 rounded-lg overflow-hidden shadow-xl">
            {filteredCommands.map((cmd, i) => (
              <button
                key={cmd.name}
                onClick={() => executeCommand(cmd)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors
                          ${i === selectedCommandIndex
                            ? 'bg-purple-500/20 text-gray-100'
                            : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                          }`}
              >
                <span className="text-lg w-6 text-center">{cmd.icon}</span>
                <div className="flex-1">
                  <div className="text-sm">
                    <span className="text-purple-400">/</span>{cmd.name}
                  </div>
                  <div className="text-xs text-gray-600">{cmd.description}</div>
                </div>
                {i === selectedCommandIndex && (
                  <span className="text-xs text-gray-600">↵</span>
                )}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center gap-3">
          <span className="text-green-400 shrink-0">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="chat with the moonspeaker"
            disabled={!isConnected || isLoading}
            autoFocus
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            className="flex-1 bg-transparent text-gray-100 placeholder-gray-500
                     focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              caretColor: '#4ade80',
            }}
          />
          {isLoading && (
            <span className="text-gray-600 animate-pulse shrink-0">...</span>
          )}
        </div>
        <div className="text-gray-600 text-xs mt-2 pl-6">
          type <span className="text-purple-400/70">/</span> for commands
        </div>
      </div>
    </div>
  );
}
