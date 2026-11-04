import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de privacidad",
};

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <p className="eyebrow text-gold-600">Legal</p>
      <h1 className="mt-3 font-display text-4xl text-navy-900">
        Política de privacidad
      </h1>
      <div className="mt-8 space-y-6 text-[0.9375rem] leading-relaxed text-muted">
        <p>
          Axion Vanguard SpA, con domicilio en Av. Libertad 1355, Of. 802,
          Viña del Mar, Región de Valparaíso, es responsable del tratamiento
          de los datos personales que collects a través de este sitio web, de
          conformidad con la Ley 19.628 sobre Protección de la Vida Privada.
        </p>
        <h2 className="font-display text-2xl text-navy-900">Qué recolectamos</h2>
        <p>
          Cuando utilizas el simulador de tasación, el formulario de contacto o
          el asistente de publicación, podemos solicitamos tu nombre, correo
          electrónico, teléfono, dirección de la propiedad y características de
          la misma. También podemos registrar datos de navegación mediante
          cookies analíticas.
        </p>
        <h2 className="font-display text-2xl text-navy-900">Para qué los usamos</h2>
        <p>
          Para responder tus consultas, elaborar valorizaciones de propiedades,
          gestionar el proceso de corretaje y, cuando lo autorizas, enviarte
          información sobre propiedades y servicios que puedan interesarte.
        </p>
        <h2 className="font-display text-2xl text-navy-900">
          Información publicada
        </h2>
        <p>
          En las fichas publishedublishedyh publicamos el sector, la comuna y
          una ubicación aproximada del inmueble. La dirección exacta se
          comparte únicamente con personas que han confirmado una visita, por
          razones de seguridad.
        </p>
        <h2 className="font-display text-2xl text-navy-900">Tus derechos</h2>
        <p>
          Puedes solicitar acceso, rectificación, supresión u oposición al
          tratamiento de tus datos escribiendo a{" "}
          <a href="mailto:hola@axionvanguard.cl" className="text-navy-700">
            hola@axionvanguard.cl
          </a>
          . Responderemos dentro de los plazos que fija la ley.
        </p>
        <p className="text-xs text-muted">
          Última actualización: noviembre de 2026.
        </p>
        <Link
          href="/"
          className="inline-flex pt-4 text-sm text-navy-700 underline underline-offset-4"
        >
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
