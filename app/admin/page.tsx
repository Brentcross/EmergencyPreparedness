import Link from "next/link";

export default function AdminPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10 lg:px-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">About this tool</h1>
        <p className="mt-4 text-slate-700">
          This emergency preparedness evaluation tool helps families and households assess their readiness for local hazards and food storage needs.
        </p>
        <div className="mt-6 space-y-4 rounded-2xl bg-slate-50 p-6">
          <p className="text-slate-700"><strong>Privacy-first design:</strong> All assessments are completed in your browser. Your information stays with you.</p>
          <p className="text-slate-700"><strong>Complete in minutes:</strong> Answer questions about your household's preparedness and food storage.</p>
          <p className="text-slate-700"><strong>Actionable results:</strong> Receive a personalized readiness score and action items to improve your family's emergency preparedness.</p>
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/" className="inline-flex items-center rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700">
            Return to home
          </Link>
        </div>
      </div>
    </main>
  );
}
