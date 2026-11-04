"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { agents } from "@/lib/data/agents";
import { siteConfig } from "@/lib/site";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Quiero vender mi propiedad",
    message: "",
  });

  if (sent) {
    return (
      <div className="rounded-lg border border-line bg-white p-10 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gold-200 text-gold-600">
          <Icon name="check" size={24} />
        </span>
        <h3 className="mt-5 font-display text-2xl text-navy-900">
          Mensaje enviado
        </h3>
        <p className="mt-2 text-sm text-muted">
          Te respondemos dentro de las próximas horas hábiles. Si es urgente,
          escríbenos por WhatsApp.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 text-sm text-navy-700 underline underline-offset-4"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="rounded-lg border border-line bg-white p-6 sm:p-8"
    >
      <h2 className="font-display text-2xl text-navy-900">Escríbenos</h2>
      <p className="mt-1 text-sm text-muted">
        Cuéntanos qué necesitas y te respondemos con un siguiente paso claro.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs uppercase tracking-[0.1em] text-muted">
            Nombre
          </span>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="mt-1.5 h-12 w-full rounded-md border border-line px-3 text-sm outline-none transition focus:border-navy-300"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-[0.1em] text-muted">
            Correo
          </span>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mt-1.5 h-12 w-full rounded-md border border-line px-3 text-sm outline-none transition focus:border-navy-300"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-[0.1em] text-muted">
            Teléfono
          </span>
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="mt-1.5 h-12 w-full rounded-md border border-line px-3 text-sm outline-none transition focus:border-navy-300"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-[0.1em] text-muted">
            Motivo
          </span>
          <select
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className="mt-1.5 h-12 w-full rounded-md border border-line bg-white px-3 text-sm outline-none transition focus:border-navy-300"
          >
            <option>Quiero vender mi propiedad</option>
            <option>Quiero arrendar mi propiedad</option>
            <option>Estoy buscando una propiedad</option>
            <option>Quiero una tasación</option>
            <option>Quiero administrar una propiedad</option>
            <option>Otro tema</option>
          </select>
        </label>
        <label className="block sm:col-span-2">
          <span className="text-xs uppercase tracking-[0.1em] text-muted">
            Mensaje
          </span>
          <textarea
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Ubicación, tipo de propiedad, comuna, plazos…"
            className="mt-1.5 w-full rounded-md border border-line p-3 text-sm outline-none transition focus:border-navy-300"
          />
        </label>
      </div>

      <button
        type="submit"
        className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-navy-700 px-7 text-sm font-medium text-white transition hover:bg-navy-800"
      >
        Enviar mensaje
        <Icon name="arrowRight" size={16} />
      </button>
    </form>
  );
}

export function ContactSidebar() {
  return (
    <aside className="space-y-5">
      <div className="rounded-lg border border-line bg-white p-6">
        <p className="eyebrow text-gold-600">Oficina</p>
        <ul className="mt-5 space-y-4 text-sm text-navy-800">
          <li className="flex gap-3">
            <Icon name="pin" size={16} className="mt-0.5 shrink-0 text-navy-300" />
            {siteConfig.address}
          </li>
          <li className="flex gap-3">
            <Icon name="phone" size={16} className="mt-0.5 shrink-0 text-navy-300" />
            <a href={`tel:${siteConfig.phoneHref}`} className="hover:text-navy-600">
              {siteConfig.phone}
            </a>
          </li>
          <li className="flex gap-3">
            <Icon name="mail" size={16} className="mt-0.5 shrink-0 text-navy-300" />
            <a href={`mailto:${siteConfig.email}`} className="hover:text-navy-600">
              {siteConfig.email}
            </a>
          </li>
          <li className="flex gap-3">
            <Icon name="calendar" size={16} className="mt-0.5 shrink-0 text-navy-300" />
            {siteConfig.hours}
          </li>
        </ul>
        <a
          href={`https://wa.me/${siteConfig.whatsapp}`}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--whatsapp)] text-sm font-medium text-white transition hover:brightness-95"
        >
          <Icon name="whatsapp" size={18} />
          Escribir por WhatsApp
        </a>
      </div>

      <div className="rounded-lg border border-line bg-white p-6">
        <p className="eyebrow text-gold-600">Corredores</p>
        <ul className="mt-5 space-y-5">
          {agents.map((agent) => (
            <li key={agent.id}>
              <p className="font-display text-lg text-navy-900">{agent.name}</p>
              <p className="text-xs uppercase tracking-[0.1em] text-muted">
                {agent.role}
              </p>
              <a
                href={`tel:${agent.phone.replace(/\s/g, "")}`}
                className="mt-1.5 inline-flex items-center gap-2 text-sm text-navy-700 transition hover:text-navy-500"
              >
                <Icon name="phone" size={13} />
                {agent.phone}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
