"use client";

import React, { useState } from "react";

import { getTranslations, SupportedLocale } from "@/lib/i18n";

export default function ContactForm({ lang }: { lang: string }) {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const t = getTranslations(lang as SupportedLocale);

  const encode = (data: Record<string, string>) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": "contact",
        email,
        subject,
        message,
      }),
    })
      .then(() => {
        setStatus("success");
        setEmail("");
        setSubject("");
        setMessage("");
      })
      .catch(() => {
        setStatus("error");
      });
  };

  return (
    <div className="p-6 bg-surface-elevated rounded-2xl border border-border/50 space-y-4">
      <h2 className="text-base font-bold text-ink uppercase tracking-wider mb-2">
        {t.contactFormTitle}
      </h2>

      {status === "success" ? (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 rounded-xl text-xs space-y-2">
          <p className="font-bold">{t.contactFormSuccess}</p>
          <p className="text-[10px] opacity-90">{t.contactFormSuccessDesc}</p>
          <button
            onClick={() => setStatus("idle")}
            className="text-[10px] underline hover:opacity-80 pt-1 block cursor-pointer"
          >
            {t.contactFormSendAnother}
          </button>
        </div>
      ) : (
        <form
          name="contact"
          method="POST"
          data-netlify="true"
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* Hidden input for Netlify forms submission parser */}
          <input type="hidden" name="form-name" value="contact" />

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-secondary mb-1">
              {t.contactFormEmailLabel}
            </label>
            <input
              type="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.contactFormEmailPlaceholder}
              className="w-full bg-surface border border-border/60 rounded-xl px-4 py-2.5 text-xs text-ink focus:outline-none focus:border-accent"
              disabled={status === "submitting"}
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-secondary mb-1">
              {t.contactFormSubjectLabel}
            </label>
            <input
              type="text"
              name="subject"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder={t.contactFormSubjectPlaceholder}
              className="w-full bg-surface border border-border/60 rounded-xl px-4 py-2.5 text-xs text-ink focus:outline-none focus:border-accent"
              disabled={status === "submitting"}
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-secondary mb-1">
              {t.contactFormMessageLabel}
            </label>
            <textarea
              name="message"
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t.contactFormMessagePlaceholder}
              className="w-full bg-surface border border-border/60 rounded-xl px-4 py-2.5 text-xs text-ink focus:outline-none focus:border-accent resize-none"
              disabled={status === "submitting"}
            />
          </div>

          {status === "error" && (
            <p className="text-[10px] text-rose-500 font-semibold">
              {t.contactFormError}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full py-2.5 bg-accent text-white dark:text-black font-bold text-xs uppercase tracking-wider rounded-xl hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
          >
            {status === "submitting" ? t.contactFormSubmitting : t.contactFormSubmit}
          </button>
        </form>
      )}
    </div>
  );
}
