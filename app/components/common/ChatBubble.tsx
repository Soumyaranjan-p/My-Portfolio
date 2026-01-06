'use client';
import { motion } from "motion/react"
import ChatBubbleIcon from '@/app/components/svgs/ChatBubbleIcon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  ExpandableChat,
  ExpandableChatBody,
  ExpandableChatFooter,
  ExpandableChatHeader,
} from '@/components/ui/expandable-chat';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { chatSuggestions } from '@/app/config/ChatPrompt';
import { heroConfig } from '@/app/config/Hero';
import { useHapticFeedback } from '@/app/hooks/use-haptic-feedback';
import { cn } from '@/app/lib/utils';
import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import SendIcon from '../svgs/SendIcon';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
  isStreaming?: boolean;
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Hello! I'm Soumya's  Assistant. How can I help you?",
    sender: 'bot',
    timestamp: new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }),
  },
];

const ChatBubble: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { triggerHaptic, isMobile } = useHapticFeedback();

  // Auto-scroll on update
  useEffect(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector(
        '[data-radix-scroll-area-viewport]'
      );
      if (viewport) viewport.scrollTop = viewport.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || isLoading) return;

    if (isMobile()) triggerHaptic('light');

    const text = newMessage.trim();
    const userMsg: Message = {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setNewMessage('');
    setIsLoading(true);

    const botId = Date.now() + 1;

    const botMsg: Message = {
      id: botId,
      text: '',
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      isStreaming: true,
    };

    setMessages((prev) => [...prev, botMsg]);
    await sendMessage(text, botId);
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (isMobile()) triggerHaptic('selection');

    const userMsg: Message = {
      id: Date.now(),
      text: suggestion,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    const botId = Date.now() + 1;

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    const botMsg: Message = {
      id: botId,
      text: '',
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      isStreaming: true,
    };

    setMessages((prev) => [...prev, botMsg]);
    sendMessage(suggestion, botId);
  };

  // -------------------------
  // ⭐ STREAMING FIXED HERE ⭐
  // -------------------------

  const sendMessage = async (messageText: string, botMessageId: number) => {
    try {
      const history = messages.slice(-10).map((msg) => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }],
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageText, history }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      let accumulatedText = "";

      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (!line.startsWith("data:")) continue;

          const json = line.replace("data: ", "").trim();
          if (!json) continue;

          if (json === '{"done": true}') {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === botMessageId
                  ? { ...m, text: accumulatedText.trim(), isStreaming: false }
                  : m
              )
            );
            return;
          }

          try {
            const parsed = JSON.parse(json);
            let delta: string = parsed.text || "";

            // Clean broken chunks
           // Minimal cleaning to avoid spacing issues
delta = delta.replace(/\r?\n\r?\n/g, "\n"); // Remove double newlines
delta = delta.replace(/\r?\n/g, " ");       // Convert newlines to space


            if (!delta) continue;

            accumulatedText += delta;

            setMessages((prev) =>
              prev.map((m) =>
                m.id === botMessageId
                  ? { ...m, text: accumulatedText, isStreaming: true }
                  : m
              )
            );
          } catch (err) {
            console.error("JSON parse error:", err);
          }
        }
      }

      setMessages((prev) =>
        prev.map((m) =>
          m.id === botMessageId
            ? { ...m, text: accumulatedText.trim(), isStreaming: false }
            : m
        )
      );
    } catch (err) {
      console.error("Chat error:", err);

      setMessages((prev) =>
        prev.map((m) =>
          m.id === botMessageId
            ? {
                ...m,
                text: "Sorry, something went wrong. Please try again!",
                isStreaming: false,
              }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ExpandableChat
      className="hover:cursor-pointer max-w-[calc(100vw-2rem)] sm:max-w-[calc(100vw-4rem)] md:max-w-xl max-h-[95vh] mt-4 ml-4"
      position="bottom-right"
      size="lg"
      icon={ <motion.div
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.92 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 18,
      }}
      className="inline-flex"
    >
      <ChatBubbleIcon className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
    </motion.div>}
    >
      <ExpandableChatHeader>
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8 border-2 border-primary bg-blue-300 dark:bg-yellow-300">
            <AvatarImage src="/assets/logo.png" alt="Assistant" />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-sm">
              {heroConfig.name}&apos;s Portfolio Assistant
            </h3>
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Online
            </div>
          </div>
        </div>
      </ExpandableChatHeader>

      <ExpandableChatBody>
        <ScrollArea ref={scrollAreaRef} className="h-full p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex w-max max-w-xs flex-col gap-2 rounded-lg px-3 py-2 text-sm',
                  message.sender === 'user'
                    ? 'ml-auto text-secondary bg-muted'
                    : 'bg-muted'
                )}
              >
                <div className="flex items-start space-x-2">
                  {message.sender === 'bot' && (
                    <Avatar className="h-6 w-6 border-2 border-primary bg-blue-300 dark:bg-yellow-300">
                      <AvatarImage src="/assets/logo.png" alt="Assistant" />
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                  )}

                  <div className="flex-1 md:max-w-sm max-w-xs">
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      {message.text ? (
                        <ReactMarkdown>{message.text}</ReactMarkdown>
                      ) : (
                        message.isStreaming && (
                          <span className="text-muted-foreground">
                            Thinking...
                          </span>
                        )
                      )}
                    </div>

                    <p
                      className={cn(
                        'text-xs mt-1',
                        message.sender === 'user'
                          ? 'text-secondary'
                          : 'text-muted-foreground'
                      )}
                      suppressHydrationWarning
                    >
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {messages.length === 1 && !isLoading && (
              <div className="space-y-2 px-3">
                <p className="text-xs text-muted-foreground">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {chatSuggestions.map((s, i) => (
                    <Button
                      key={i}
                      size="sm"
                      variant="outline"
                      onClick={() => handleSuggestionClick(s)}
                      className="text-xs h-8 px-3 bg-background hover:bg-muted border-muted-foreground/20"
                    >
                      {s}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </ExpandableChatBody>

      <ExpandableChatFooter>
        <div className="flex space-x-2">
          <Input
            placeholder="Ask me about my work and experience..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) =>
              e.key === 'Enter' && !e.shiftKey && handleSendMessage()
            }
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            size="sm"
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || isLoading}
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <SendIcon className="h-4 w-4" />
            )}
          </Button>
        </div>
      </ExpandableChatFooter>
    </ExpandableChat>
  );
};

export default ChatBubble;
