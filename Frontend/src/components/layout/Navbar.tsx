"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronRight, Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const NAV_LINKS = [
    { href: "/#features", label: t("সেবাসমূহ", "Services") },
    { href: "/#how-it-works", label: t("কিভাবে কাজ করে", "How it works") },
    { href: "/doctors", label: t("ডাক্তার", "Doctors") },
    { href: "/medicines", label: t("ওষুধের তথ্য", "Medicines") },
    { href: "/#faq", label: t("প্রশ্নোত্তর", "FAQ") },
  ];

  const toggleLang = () => setLang(lang === "bn" ? "en" : "bn");

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] border-b border-slate-100"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between">
        {/* ── Left Side (Logo + Nav) ── */}
        <div className="flex items-center gap-8 lg:gap-12">
          {/* ── Logo ── */}
          <Link href="/" className="shrink-0 flex items-center">
            <Image
              src="/images/shustota ai logo.png"
              alt="Shustota AI"
              width={240}
              height={80}
              className="h-10 sm:h-12 lg:h-[3.5rem] w-auto object-contain"
              priority
            />
          </Link>

          {/* ── Desktop Nav ── */}
          <div className="hidden lg:flex items-center gap-1.5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-[14px] font-semibold text-slate-600 rounded-lg hover:text-primary hover:bg-primary/5 transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* ── Desktop Actions ── */}
        <div className="hidden lg:flex items-center gap-2.5">
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200/80"
            aria-label="Toggle Language"
          >
            <Globe size={14} className="text-primary" />
            {lang === "bn" ? "EN" : "বাংলা"}
          </button>

          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-primary transition-colors"
          >
            {t("লগ ইন", "Log In")}
          </Link>
          <Link
            href="/register"
            className="group inline-flex items-center gap-1.5 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/25 hover:bg-[#002d75] transition-all duration-300"
          >
            {t("শুরু করুন", "Get Started")}
            <ChevronRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* ── Mobile Actions ── */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={toggleLang}
            className="flex items-center justify-center w-9 h-9 rounded-lg text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-200/80"
            aria-label="Toggle Language"
          >
            {lang === "bn" ? "EN" : "বাং"}
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="w-10 h-10 flex items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* ── Mobile Menu ── */}
      {/* Overlay */}
      <div
        className={`lg:hidden fixed inset-0 top-[72px] bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />
      <div
        className={`lg:hidden absolute top-[72px] left-0 right-0 bg-white border-b border-slate-100 shadow-xl transition-all duration-300 ease-out ${
          open ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-5 py-4 flex flex-col gap-0.5 max-h-[calc(100vh-72px)] overflow-y-auto">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{ animationDelay: open ? `${i * 50}ms` : "0ms" }}
              className="px-4 py-3 rounded-xl text-sm font-medium text-slate-700 hover:bg-primary/5 hover:text-primary transition-all"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-3 mt-3 pt-4 border-t border-slate-100">
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="flex-1 text-center px-4 py-3 text-sm font-semibold text-slate-700 border border-slate-200 rounded-xl hover:border-primary/30 transition-colors"
            >
              {t("লগ ইন", "Log In")}
            </Link>
            <Link
              href="/register"
              onClick={() => setOpen(false)}
              className="flex-1 text-center px-4 py-3 bg-primary text-white text-sm font-semibold rounded-xl shadow-md shadow-primary/20"
            >
              {t("শুরু করুন", "Get Started")}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
