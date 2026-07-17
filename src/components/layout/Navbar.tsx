"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { t } = useLanguage();

  const NAV_LINKS = [
    { href: "/#features", id: "features", label: t("Services", "সেবাসমূহ") },
    { href: "/#how-it-works", id: "how-it-works", label: t("How it works", "কিভাবে কাজ করে") },
    { href: "/#doctors", id: "doctors", label: t("Doctors", "ডাক্তার") },
    { href: "/medicines", id: "medicines", label: t("Medicines", "ওষুধের তথ্য") },
    { href: "/#faq", id: "faq", label: t("FAQ", "প্রশ্নোত্তর") },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Intersection Observer for Scroll Spy
  useEffect(() => {
    const ids = ["features", "how-it-works", "doctors", "medicines", "faq"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "bg-white/60 backdrop-blur-2xl shadow-sm border-b border-white/20"
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
              width={280}
              height={95}
              className="h-12 sm:h-14 lg:h-[4.5rem] w-auto object-contain transition-all duration-300 scale-[1.15] sm:scale-125 lg:scale-[1.35] origin-left"
              priority
            />
          </Link>

          {/* ── Desktop Nav ── */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              const activeClass = "text-primary bg-primary/10 font-bold shadow-sm ring-1 ring-primary/20";
              const inactiveClass = "text-slate-600 hover:text-primary hover:bg-primary/5";
                
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-[14px] font-semibold rounded-lg transition-all duration-300 emil-button ${
                    isActive ? activeClass : inactiveClass
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* ── Desktop Actions ── */}
        <div className="hidden lg:flex items-center gap-2.5">
          <Link
            href="/login"
            className="px-5 py-2.5 text-sm font-semibold rounded-xl border border-primary/20 text-primary hover:bg-primary/5 transition-colors emil-button"
          >
            Log In
          </Link>
          <Link
            href="/register"
            className="group inline-flex items-center gap-1.5 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:bg-[#002d75] emil-button"
          >
            Get Started
            <ChevronRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* ── Mobile Actions ── */}
        <div className="lg:hidden flex items-center gap-2">
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
          {NAV_LINKS.map((link, i) => {
            const isActive = activeSection === link.id;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                style={{ animationDelay: open ? `${i * 50}ms` : "0ms" }}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive ? "text-primary bg-primary/5" : "text-slate-700 hover:bg-primary/5 hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="flex items-center gap-3 mt-3 pt-4 border-t border-slate-100">
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="flex-1 text-center px-4 py-3 text-sm font-semibold text-slate-700 border border-slate-200 rounded-xl hover:border-primary/30 transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/register"
              onClick={() => setOpen(false)}
              className="flex-1 text-center px-4 py-3 bg-primary text-white text-sm font-semibold rounded-xl shadow-md shadow-primary/20"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
