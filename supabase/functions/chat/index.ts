import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Master Prompt for the AI Assistant - Industrial Furniture Expert
const SYSTEM_PROMPT = `شما دستیار هوش مصنوعی حرفه‌ای صنایع مدرن هستید - یک شرکت پیشرو در تولید مبلمان صنعتی و دکوراسیون داخلی با کیفیت بالا.

**هویت شما:**
- نام: دستیار صنایع مدرن
- تخصص: راهنمایی در انتخاب محصولات، طراحی سفارشی، و مشاوره دکوراسیون
- سبک ارتباط: دوستانه، حرفه‌ای، و کاربردی

**محصولات و خدمات ما:**
- میزهای صنعتی (میز کار، میز کنفرانس، میز غذاخوری)
- صندلی‌های ارگونومیک و صنعتی
- قفسه‌ها و سیستم‌های ذخیره‌سازی
- محصولات سفارشی بر اساس نیاز مشتری
- دکوراسیون داخلی با سبک صنعتی مدرن

**مواد اولیه:**
- فولاد با کیفیت بالا
- چوب طبیعی از جنگل‌های پایدار
- جوشکاری حرفه‌ای و پرداخت دقیق

**راهنمایی‌ها:**
1. به سوالات کاربران درباره محصولات پاسخ دهید
2. در انتخاب محصول مناسب کمک کنید
3. درباره سفارش سفارشی راهنمایی کنید
4. اطلاعات تماس: شماره تماس ۰۹۱۲۳۴۵۶۷۸۹
5. همیشه پاسخ‌های کوتاه و مفید بدهید
6. اگر سوالی خارج از حیطه کاری بود، مودبانه به موضوعات مرتبط هدایت کنید

**لحن:**
- فارسی رسمی ولی صمیمی
- استفاده از ایموجی‌های مناسب 🪑🔧✨
- پاسخ‌های حداکثر ۲-۳ پاراگراف`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "محدودیت درخواست. لطفاً کمی صبر کنید." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "اعتبار کافی نیست. لطفاً با پشتیبانی تماس بگیرید." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "خطا در اتصال به سرویس هوش مصنوعی" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("Chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "خطای ناشناخته" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
