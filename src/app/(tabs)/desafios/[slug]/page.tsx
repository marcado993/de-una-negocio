"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { use } from "react";

import { Button } from "@/components/deuna";

type DesafioSlug = "uno" | "dos" | "tres";

type DesafioContent = {
  title: string;
  intro: string;
  /** Headline above the validity / "Finaliza" date. */
  deadlineLabel: "Vigencia:" | "Finaliza:";
  deadline: string;
  /** Section heading right above the steps list. */
  stepsLabel: string;
  steps: readonly string[];
};

const DESAFIOS: Record<DesafioSlug, DesafioContent> = {
  uno: {
    title: "Gana increíbles premios",
    intro: "Realiza varias ventas, acumula ingresos y gana premios",
    deadlineLabel: "Vigencia:",
    deadline: "Del 1 al 31 de mayo de 2026.",
    stepsLabel: "Cómo acceder a la promoción:",
    steps: [
      "Realiza ventas durante un mes",
      "Acumula $500 en ventas",
      "Tu progreso se actualizará.",
      "Si logras la meta, reclama tu Raspa y Gana.",
    ],
  },
  dos: {
    title: "Gana un viaje a Tonsupa",
    intro: "Mantente en el top #1, y gana un viaje a la playa.",
    deadlineLabel: "Finaliza:",
    deadline: "El 1 de Julio de 2026.",
    stepsLabel: "Cómo acceder al premio:",
    steps: [
      "Realiza ventas durante el tiempo de vigencia",
      "Conviértete en el top 1 de la ciudad",
      "Si al finalizar el tiempo, quedas primero, ganas el viaje.",
    ],
  },
  tres: {
    title: "Compra Más de Dos Veces",
    intro: "Realiza compras separadas en el mismo comercio participante.",
    deadlineLabel: "Vigencia:",
    deadline: "Del 1 al 31 de mayo de 2026.",
    stepsLabel: "Cómo acceder a la promoción:",
    steps: [
      "Realiza una compra en tu tienda favorita participante.",
      "Repite la compra dos veces más en la misma tienda.",
      "Tu recompensa se emitirá automáticamente.",
    ],
  },
};

function isDesafioSlug(value: string): value is DesafioSlug {
  return value === "uno" || value === "dos" || value === "tres";
}

/**
 * Desafío detail — full-bleed dark hero with the "Compra en tu barrio"
 * tienda mascot scene, an X to close, a white card with the challenge
 * description and steps, and a sticky "Volver" CTA at the bottom.
 *
 * The (tabs) layout suppresses the bottom nav for any path under
 * `/desafios/`, so the CTA sits flush against the device chrome.
 */
export default function DesafioDetailScreen({
  params,
}: {
  // Next.js 15 App Router exposes params as a Promise that needs to
  // be unwrapped with `use()` in client components.
  params: Promise<{ slug: string }>;
}) {
  const router = useRouter();
  const { slug } = use(params);

  if (!isDesafioSlug(slug)) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
        <p className="text-title-md text-primary">Desafío no encontrado</p>
        <Button
          label="Volver a Desafíos"
          size="md"
          onClick={() => router.push("/desafios")}
        />
      </div>
    );
  }

  const data = DESAFIOS[slug];

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Hero — dark purple bleed with the tienda illustration. */}
      <section className="relative h-[341px] w-full overflow-hidden bg-[#34155b] pt-[max(env(safe-area-inset-top),0.5rem)]">
        <Image
          src="/assets/desafios/tienda-hero.png"
          alt="Mascota Deuna en su tienda con un trofeo"
          fill
          sizes="(max-width: 480px) 100vw, 480px"
          className="object-cover object-top"
          priority
        />

        <button
          type="button"
          aria-label="Cerrar"
          onClick={() => router.push("/desafios")}
          className="absolute right-4 top-[max(env(safe-area-inset-top),1rem)] z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[20px] font-semibold text-text-primary shadow-card active:opacity-80"
        >
          ✕
        </button>
      </section>

      {/* White content card slides over the hero's bottom edge. */}
      <article className="flex flex-1 flex-col gap-3 bg-white px-6 pt-6">
        <h1 className="text-[18px] font-extrabold leading-tight text-text-primary">
          {data.title}
        </h1>

        <p className="text-[12px] leading-snug text-text-primary">
          {data.intro}
        </p>

        <div className="flex flex-col gap-1 pt-2">
          <p className="text-[12px] font-bold text-text-primary">
            {data.deadlineLabel}
          </p>
          <p className="text-[12px] leading-snug text-text-primary">
            {data.deadline}
          </p>
        </div>

        <div className="flex flex-col gap-2 pt-2">
          <p className="text-[12px] font-bold text-text-primary">
            {data.stepsLabel}
          </p>
          <ol className="flex flex-col gap-2 pl-3">
            {data.steps.map((step, i) => (
              <li
                key={`${step}-${i}`}
                className="text-[12px] leading-snug text-text-primary"
              >
                {i + 1}. {step}
              </li>
            ))}
          </ol>
        </div>
      </article>

      {/* Sticky CTA — replaces the bottom tab bar (suppressed by layout). */}
      <div className="sticky bottom-0 border-t border-divider bg-white px-4 py-3 pb-[max(env(safe-area-inset-bottom),0.75rem)]">
        <Button
          label="Volver"
          size="lg"
          onClick={() => router.push("/desafios")}
        />
      </div>
    </div>
  );
}
