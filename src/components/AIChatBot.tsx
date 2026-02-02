import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReactMarkdown from "react-markdown";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

const AIChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const streamChat = async (userMessages: Message[]) => {
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages: userMessages }),
    });

    if (!resp.ok || !resp.body) {
      if (resp.status === 429) {
        throw new Error("محدودیت درخواست. لطفاً کمی صبر کنید.");
      }
      if (resp.status === 402) {
        throw new Error("سرویس موقتاً در دسترس نیست.");
      }
      throw new Error("خطا در اتصال به سرور");
    }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";
    let assistantSoFar = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") break;

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) {
            assistantSoFar += content;
            setMessages((prev) => {
              const last = prev[prev.length - 1];
              if (last?.role === "assistant") {
                return prev.map((m, i) =>
                  i === prev.length - 1 ? { ...m, content: assistantSoFar } : m
                );
              }
              return [...prev, { role: "assistant", content: assistantSoFar }];
            });
          }
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      await streamChat(newMessages);
    } catch (e) {
      console.error(e);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: e instanceof Error ? e.message : "خطایی رخ داد. لطفاً دوباره تلاش کنید.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-4 left-4 z-50 w-14 h-14 bg-gradient-to-br from-accent to-cta rounded-[20px] flex items-center justify-center shadow-fluent-16 text-white hover:shadow-fluent-24 transition-shadow"
            style={{
              marginBottom: "env(safe-area-inset-bottom, 0px)",
              marginLeft: "env(safe-area-inset-left, 0px)",
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="باز کردن چت‌بات"
          >
            <Sparkles className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="fixed bottom-4 left-4 z-50 w-[340px] sm:w-[380px] h-[500px] glass-card rounded-[20px] shadow-fluent-24 flex flex-col overflow-hidden"
            style={{
              marginBottom: "env(safe-area-inset-bottom, 0px)",
              marginLeft: "env(safe-area-inset-left, 0px)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-accent/10 to-cta/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-accent to-cta rounded-[16px] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-azarmehr-bold text-sm text-foreground">دستیار صنایع مدرن</h3>
                  <p className="text-xs text-muted-foreground">پاسخگوی ۲۴ ساعته</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="rounded-[12px] hover:bg-destructive/10 hover:text-destructive"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-cta/20 rounded-[20px] flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-accent" />
                  </div>
                  <h4 className="font-azarmehr-bold text-foreground mb-2">سلام! 👋</h4>
                  <p className="text-sm text-muted-foreground">
                    چطور می‌تونم کمکتون کنم؟
                    <br />
                    درباره محصولات، سفارش سفارشی یا هر سوالی بپرسید.
                  </p>
                </motion.div>
              )}

              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`w-8 h-8 rounded-[12px] flex items-center justify-center flex-shrink-0 ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-gradient-to-br from-accent to-cta text-white"
                    }`}
                  >
                    {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div
                    className={`max-w-[80%] p-3 rounded-[16px] ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-[4px]"
                        : "bg-muted rounded-tl-[4px]"
                    }`}
                  >
                    <div className="text-sm prose prose-sm dark:prose-invert max-w-none">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  </div>
                </motion.div>
              ))}

              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2"
                >
                  <div className="w-8 h-8 rounded-[12px] flex items-center justify-center bg-gradient-to-br from-accent to-cta text-white">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-muted p-3 rounded-[16px] rounded-tl-[4px]">
                    <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border bg-background/50">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="پیام خود را بنویسید..."
                  className="flex-1 rounded-[16px] font-azarmehr text-sm"
                  disabled={isLoading}
                  dir="rtl"
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="rounded-[16px] bg-gradient-to-r from-accent to-cta hover:opacity-90"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatBot;
