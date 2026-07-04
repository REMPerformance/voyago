"use client";

import type { ReactNode } from "react";
import { LanguageProvider } from "@/lib/i18n";
import { CartProvider } from "@/lib/cart";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieBar } from "@/components/CookieBar";
import { Announcements } from "@/components/Announcements";
import { DiscountsProvider } from "@/lib/discounts";
import { StatsProvider } from "@/lib/stats";
import { Tracker } from "@/components/Tracker";
import { EmailPopup } from "@/components/EmailPopup";
import { ChatWidget } from "@/components/ChatWidget";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <CartProvider>
        <DiscountsProvider>
          <StatsProvider>
          <Tracker />
          <EmailPopup />
        <Announcements />
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <CookieBar />
        <ChatWidget />
          </StatsProvider>
              </DiscountsProvider>
      </CartProvider>
    </LanguageProvider>
  );
}
