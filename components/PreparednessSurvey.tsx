"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { preparednessQuestionGroups, defaultPreparednessInput } from "@/lib/questions";
import { computePreparednessScore } from "@/lib/scoring";
import { ProgressBar } from "@/components/ProgressBar";
import { ResultSummary } from "@/components/ResultSummary";
import { ExportButtons } from "@/components/ExportButtons";
import { GeneralPreparednessInput, PreparednessResult } from "@/lib/types";

const radios = {
  yes: "Yes",
  partial: "Partial",
  no: "No",
};

export default function PreparednessSurvey() {
  const [input, setInput] = useState<GeneralPreparednessInput>(defaultPreparednessInput);
  const [step, setStep] = useState(1);
  const [result, setResult] = useState<PreparednessResult | null>(null);

  const totalSteps = preparednessQuestionGroups.length + 1;

  const currentGroup = preparednessQuestionGroups[step - 1];

  const handleChange = (id: string, value: string | number) => {
    setInput((current) => ({ ...current, [id]: value } as GeneralPreparednessInput));
  };

  const stepReady = useMemo(() => {
    if (!currentGroup) return true;
    return currentGroup.items.every((item) => {
      const value = (input as unknown as Record<string, unknown>)[item.id];
      return value !== undefined && value !== "";
    });
  }, [currentGroup, input]);

  const handleNext = () => {
    if (step < preparednessQuestionGroups.length) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const computed = computePreparednessScore(input);
      setResult(computed);
      window.localStorage.setItem("latestPreparednessResult", JSON.stringify(computed));
      window.localStorage.setItem("latestPreparednessInput", JSON.stringify(input));
    }
  };

  const handlePrevious = () => setStep(Math.max(1, step - 1));

  if (result) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">General assessment complete</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">Preparedness results</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-200">
              Home
            </Link>
            <Link href="/admin" className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
              Ward export info
            </Link>
          </div>
        </div>
        <ResultSummary title="General preparedness" result={result} actionTitle="Action plan" />
        <ExportButtons
          filename="preparedness-results"
          jsonData={{ assessment: "preparedness", result, timestamp: new Date().toISOString() }}
          printPath="/print/preparedness"
        />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">General Emergency Preparedness Assessment</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">Family readiness for local hazards</h1>
          </div>
          <Link href="/" className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-200">
            Back to home
          </Link>
        </div>

        <p className="mt-6 max-w-3xl text-slate-700">
          Answer the questions with your household in mind. The tool focuses on water, communication, medical needs, evacuation planning, and the most relevant risks for Nampa and Canyon County.
        </p>

        <ProgressBar step={step} total={totalSteps} />

        <div className="mt-8 space-y-8">
          {currentGroup && (
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-2xl font-semibold text-slate-900">{currentGroup.title}</h2>
              <div className="mt-6 space-y-6">
                {currentGroup.items.map((item) => {
                  const value = (input as unknown as Record<string, unknown>)[item.id] ?? "";
                  return (
                    <div key={item.id} className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                      <label className="block text-sm font-medium text-slate-900">{item.label}</label>
                      {item.type === "number" ? (
                        <input
                          type="number"
                          min={item.min}
                          max={item.max}
                          value={Number(value)}
                          onChange={(event) => handleChange(item.id, Number(event.target.value))}
                          className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                        />
                      ) : item.type === "select" ? (
                        <select
                          value={String(value)}
                          onChange={(event) => handleChange(item.id, event.target.value)}
                          className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                        >
                          <option value="">Choose</option>
                          {item.options?.map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      ) : (
                        <div className="grid gap-3 sm:grid-cols-3">
                          {item.options?.map((option) => {
                            const label = item.labels?.[option as string] ?? radios[option as keyof typeof radios] ?? option;
                            return (
                              <label key={option} className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 hover:border-brand-400">
                                <input
                                  type="radio"
                                  name={item.id}
                                  value={option}
                                  checked={value === option}
                                  onChange={() => handleChange(item.id, option)}
                                  className="h-4 w-4 text-brand-600"
                                />
                                <span className="text-sm text-slate-800">{label}</span>
                              </label>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {step > 1 && (
            <button onClick={handlePrevious} className="inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100">
              Previous
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!stepReady}
            className="inline-flex items-center rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {step === preparednessQuestionGroups.length ? "Review results" : "Next"}
          </button>
          <span className="text-sm text-slate-600">Your answers are stored locally in your browser.</span>
        </div>
      </section>
    </main>
  );
}
