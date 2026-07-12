"use client";

import React from "react";

export default function ContactForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you! Your message has been sent successfully.");
  };

  return (
    <div className="p-6 bg-surface-elevated rounded-2xl border border-border/50 space-y-4">
      <h2 className="text-base font-bold text-ink uppercase tracking-wider mb-2">
        Send a Message
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-secondary mb-1">
            Your Email
          </label>
          <input
            type="email"
            required
            placeholder="developer@example.com"
            className="w-full bg-surface border border-border/60 rounded-xl px-4 py-2.5 text-xs text-ink focus:outline-none focus:border-accent"
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-secondary mb-1">
            Subject
          </label>
          <input
            type="text"
            required
            placeholder="Bug Report / Tool Request"
            className="w-full bg-surface border border-border/60 rounded-xl px-4 py-2.5 text-xs text-ink focus:outline-none focus:border-accent"
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-ink-secondary mb-1">
            Message
          </label>
          <textarea
            required
            rows={4}
            placeholder="Describe your issue or suggestion in detail..."
            className="w-full bg-surface border border-border/60 rounded-xl px-4 py-2.5 text-xs text-ink focus:outline-none focus:border-accent resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2.5 bg-accent text-white dark:text-black font-bold text-xs uppercase tracking-wider rounded-xl hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
