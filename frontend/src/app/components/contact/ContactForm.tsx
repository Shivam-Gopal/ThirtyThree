"use client";
import { useRef, useState } from "react";
import { Button } from "@/app/components/ui/Button";
import { Tilt } from "@/app/components/ui/Tilt";

const field = "w-full rounded-xl border border-on-ink-30 bg-transparent px-4 py-3 font-sans text-[15px] text-on-ink outline-none transition-colors placeholder:text-on-ink-60 focus:border-beige-dk";
const label = "mb-2 block font-mono text-[11.5px] uppercase tracking-[0.1em] text-on-ink-60";

/** Opens the visitor's mail app with the form filled in (no backend needed). */
export function ContactForm({ email, services, title }: { email: string; services: string[]; title: string }) {
  const [service, setService] = useState("");
  const lastSent = useRef(0); // ignore repeat taps on Send for a moment so the mail app opens once
  return (
    <Tilt max={3} lift={2} className="rounded-3xl border border-on-ink-30 bg-ink-2/80 p-8 backdrop-blur max-sm:p-6">
      <h2 className="mb-6 text-[26px] normal-case text-on-ink">{title}</h2>
      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          if (Date.now() - lastSent.current < 2000) return;
          lastSent.current = Date.now();
          const f = new FormData(e.currentTarget);
          const svc = service === "Others" ? String(f.get("other") || "Others") : service;
          const body = `Name: ${f.get("name")}\nEmail: ${f.get("email")}\nBrand: ${f.get("brand") || "-"}\nService: ${svc || "-"}\n\n${f.get("message") || ""}`;
          window.location.href = `mailto:${email}?subject=${encodeURIComponent(`New project — ${f.get("name")}`)}&body=${encodeURIComponent(body)}`;
        }}
      >
        <div><label className={label} htmlFor="name">Name</label><input id="name" name="name" required maxLength={80} autoComplete="name" enterKeyHint="next" className={field} placeholder="Your name" /></div>
        <div><label className={label} htmlFor="email">Email</label><input id="email" name="email" type="email" required maxLength={254} autoComplete="email" inputMode="email" enterKeyHint="next" className={field} placeholder="you@brand.com" /></div>
        <div><label className={label} htmlFor="brand">Brand</label><input id="brand" name="brand" maxLength={120} autoComplete="organization" enterKeyHint="next" className={field} placeholder="Brand or website" /></div>
        <div>
          <label className={label} htmlFor="service">What do you need?</label>
          <select id="service" value={service} onChange={(e) => setService(e.target.value)} className={field}>
            <option value="" className="text-ink">Select a service</option>
            {services.map((s) => <option key={s} value={s} className="text-ink">{s}</option>)}
          </select>
        </div>
        {service === "Others" && (
          <div className="animate-field-in"><label className={label} htmlFor="other">Tell us more</label><input id="other" name="other" maxLength={120} enterKeyHint="next" className={field} placeholder="What are you looking for?" /></div>
        )}
        <div><label className={label} htmlFor="message">Message</label><textarea id="message" name="message" rows={4} maxLength={2000} className={field} placeholder="Goals, timeline, where it feels stuck…" /></div>
        <Button type="submit" variant="light" arrow>Send message</Button>
      </form>
    </Tilt>
  );
}
