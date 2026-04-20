"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PreparednessResult, FoodStorageResult } from "@/lib/types";

interface PrintPageProps {
  params: { assessment: string };
}

export default function PrintPage({ params }: PrintPageProps) {
  const [data, setData] = useState<PreparednessResult | FoodStorageResult | null>(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const key = params.assessment === "preparedness" ? "latestPreparednessResult" : "latestFoodStorageResult";
    const stored = window.localStorage.getItem(key);
    if (stored) {
      try {
        setData(JSON.parse(stored));
      } catch {
        setLoadError(true);
      }
    } else {
      setLoadError(true);
    }
  }, [params.assessment]);

  useEffect(() => {
    if (data) {
      window.print();
    }
  }, [data]);

  if (loadError) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-10 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">Print report</h1>
          <p className="mt-4 text-slate-700">Unable to load a saved result for printing. Please complete an assessment first and try again.</p>
          <Link href="/" className="mt-6 inline-flex rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700">
            Return home
          </Link>
        </div>
      </main>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <main className="print-container mx-auto max-w-6xl px-6 py-10 lg:px-8">
      <article className="report-card rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <header className="mb-8">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Printable readiness report</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">{params.assessment === "preparedness" ? "General Emergency Preparedness" : "Food Storage"}</h1>
          <p className="mt-4 text-slate-700">Use this summary to review your household strengths and the top recommendations for your family.</p>
        </header>

        <section className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Score</p>
                <p className="mt-2 text-5xl font-semibold text-brand-700">{data.score}</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Readiness level</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{data.level}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-900">Top priorities</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
              {data.actionPlan.topPriorities.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="font-semibold text-slate-900">Next 30 days</h3>
              <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
                {data.actionPlan.next30Days.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="font-semibold text-slate-900">Next 3 months</h3>
              <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
                {data.actionPlan.next3Months.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="font-semibold text-slate-900">Longer term</h3>
              <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
                {data.actionPlan.longerTerm.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
