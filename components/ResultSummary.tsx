import { PreparednessResult, FoodStorageResult } from "@/lib/types";

interface ResultSummaryProps {
  title: string;
  result: PreparednessResult | FoodStorageResult;
  actionTitle: string;
}

export function ResultSummary({ title, result, actionTitle }: ResultSummaryProps) {
  return (
    <section className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">{title} score</p>
            <p className="mt-3 text-5xl font-semibold text-brand-700">{result.score}</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">{result.level}</p>
          </div>
          <div className="rounded-3xl bg-white p-5 text-slate-700 shadow-sm">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Strengths</p>
            <ul className="mt-4 space-y-2 text-slate-700">
              {result.strengths.map((item, index) => (
                <li key={index} className="list-disc pl-4">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Areas to strengthen</h2>
          <ul className="mt-4 space-y-3 text-slate-700">
            {result.gaps.map((item, index) => (
              <li key={index} className="list-disc pl-4">{item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">{actionTitle}</h2>
          <div className="mt-4 space-y-4 text-slate-700">
            <div>
              <h3 className="font-semibold text-slate-900">Top priorities</h3>
              <ul className="mt-3 space-y-2 list-disc pl-6">
                {result.actionPlan.topPriorities.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <h4 className="font-semibold text-slate-900">Next 30 days</h4>
                <ul className="mt-3 list-disc space-y-2 pl-6">
                  {result.actionPlan.next30Days.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900">Next 3 months</h4>
                <ul className="mt-3 list-disc space-y-2 pl-6">
                  {result.actionPlan.next3Months.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900">Longer term</h4>
                <ul className="mt-3 list-disc space-y-2 pl-6">
                  {result.actionPlan.longerTerm.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
