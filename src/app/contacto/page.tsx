import type { Metadata } from "next";
import { ContactForm, ContactSidebar } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contacta a Axion Vanguard: oficina en el centro de Viña del Mar, WhatsApp, teléfono y correo. Respuesta en menos de dos horas hábiles.",
};

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 sm:py-16">
          <div className="max-w-2xl">
            <p className="eyebrow text-gold-600">Contacto</p>
            <h1 className="mt-4 font-display text-4xl leading-tight text-navy-900 sm:text-5xl">
              Hablemos de tu propiedad
            </h1>
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted">
              Escríbenos por el canal que prefieras. Respondemos en menos de
              dos horas hábiles y siempre con una persona al otro lado.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <ContactForm />
          <ContactSidebar />
        </div>
      </section>
    </>
  );
}
