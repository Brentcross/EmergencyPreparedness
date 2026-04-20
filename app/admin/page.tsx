import Link from "next/link";

export default function AdminPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10 lg:px-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Ward reporting & export</h1>
        <p className="mt-4 text-slate-700">
          This tool is designed to keep privacy first. No personal names or sensitive health details are collected unless a family chooses to add them.
        </p>
        <div className="mt-6 space-y-4 rounded-2xl bg-slate-50 p-6">
          <p className="text-slate-700">Use the export buttons on each results page to save anonymized household readiness results for local ward review.</p>
          <p className="text-slate-700">Future ward dashboards can be built around these summary data exports while respecting family privacy and self-reliance.</p>
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/preparedness" className="inline-flex items-center rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700">
            Return to preparedness survey
          </Link>
          <Link href="/food-storage" className="inline-flex items-center rounded-full bg-slate-200 px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-300">
            Return to food storage survey
          </Link>
        </div>
      </div>
    </main>
  );
}
