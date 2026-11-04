"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { formatCLP, formatUF } from "@/lib/format";
import { marketConfig } from "@/lib/site";

export function MortgageCalculator({ priceCLP }: { priceCLP: number }) {
  const [downPayment, setDownPayment] = useState(20);
  const [years, setYears] = useState(20);
  const [rate, setRate] = useState<number>(marketConfig.mortgageRate);

  const result = useMemo(() => {
    const principal = priceCLP * (1 - downPayment / 100);
    const monthlyRate = rate / 100 / 12;
    const n = years * 12;
    const cuota =
      monthlyRate === 0
        ? principal / n
        : (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
    const total = cuota * n;
    return { cuota, total, interest: total - principal };
  }, [priceCLP, downPayment, years, rate]);

  const ufValue = result.cuota / marketConfig.ufCLP;

  return (
    <div className="rounded-lg border border-line bg-white p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-navy-100 text-navy-700">
          <Icon name="calculator" size={18} />
        </span>
        <div>
          <h3 className="font-display text-2xl text-navy-900">
            Calculadora de crédito hipotecario
          </h3>
          <p className="text-xs text-muted">
            Simulación referencial, no constituye una oferta de crédito.
          </p>
        </div>
      </div>

      <div className="mt-7 grid gap-6 sm:grid-cols-3">
        <label className="block">
          <span className="text-xs uppercase tracking-[0.1em] text-muted">
            Cuota inicial ({downPayment}%)
          </span>
          <input
            type="range"
            min={10}
            max={60}
            step={5}
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            className="mt-3 w-full accent-navy-700"
          />
          <span className="mt-1 block text-xs text-muted">
            {formatCLP((priceCLP * downPayment) / 100)}
          </span>
        </label>

        <label className="block">
          <span className="text-xs uppercase tracking-[0.1em] text-muted">
            Plazo ({years} años)
          </span>
          <input
            type="range"
            min={5}
            max={30}
            step={1}
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="mt-3 w-full accent-navy-700"
          />
          <span className="mt-1 block text-xs text-muted">
            {years * 12} cuotas mensuales
          </span>
        </label>

        <label className="block">
          <span className="text-xs uppercase tracking-[0.1em] text-muted">
            Tasa anual ({rate}%)
          </span>
          <input
            type="range"
            min={3}
            max={9}
            step={0.1}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="mt-3 w-full accent-navy-700"
          />
          <span className="mt-1 block text-xs text-muted">
            Tasa fija referencial
          </span>
        </label>
      </div>

      <div className="mt-8 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
        <div className="bg-navy-800 p-6 text-white">
          <p className="eyebrow text-gold-400">Cuota mensual estimada</p>
          <p className="mt-2 font-display text-3xl">
            {formatCLP(result.cuota)}
          </p>
          <p className="mt-1 text-xs text-white/60">
            Equivale a {formatUF(ufValue)} por mes
          </p>
        </div>
        <div className="bg-white p-6">
          <p className="eyebrow text-muted">Monto del crédito</p>
          <p className="mt-2 font-display text-2xl text-navy-900">
            {formatCLP(priceCLP * (1 - downPayment / 100))}
          </p>
        </div>
        <div className="bg-white p-6">
          <p className="eyebrow text-muted">Intereses totales</p>
          <p className="mt-2 font-display text-2xl text-navy-900">
            {formatCLP(result.interest)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MortgageCalculator;
