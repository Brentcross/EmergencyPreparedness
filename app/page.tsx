import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Family preparedness, grounded in faith</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Ward emergency preparedness self-evaluation
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-700">
            A practical, family-centered tool for Nampa and Canyon County households to review general preparedness and food storage in a calm, encouraging way.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <article className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">General Emergency Preparedness</h2>
              <p className="mt-3 text-slate-600">
                Review plans for water, shelter, evacuation, communication, home safety, local hazards, and household support.
              </p>
              <Link href="/preparedness" className="mt-6 inline-flex rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700">
                Start assessment
              </Link>
            </article>
            <article className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Food Storage Assessment</h2>
              <p className="mt-3 text-slate-600">
                Check your short-term food supply, water storage, rotation habits, and longer-term staples for family resilience.
              </p>
              <Link href="/food-storage" className="mt-6 inline-flex rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700">
                Start assessment
              </Link>
            </article>
          </div>
          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6">
            <h2 className="text-xl font-semibold text-slate-900">How this tool works</h2>
            <ul className="mt-4 space-y-3 text-slate-700">
              <li>• Complete both assessments right in your browser—no downloads or registration required.</li>
              <li>• Get personalized readiness scores and action items for your household.</li>
              <li>• Your information stays with you; all data is stored locally on your device.</li>
              <li>• Find local risk guidance for wildfire, flood, winter weather, earthquakes, heat, and hazardous material incidents.</li>
            </ul>
            <p className="mt-6 text-sm leading-6 text-slate-500">
              Disclaimer: This is an educational planning tool and not professional emergency, medical, or insurance advice.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
