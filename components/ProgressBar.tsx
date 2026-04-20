interface ProgressBarProps {
  step: number;
  total: number;
}

export function ProgressBar({ step, total }: ProgressBarProps) {
  const percent = Math.round((step / total) * 100);
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between text-sm text-slate-600">
        <span>Step {step} of {total}</span>
        <span>{percent}%</span>
      </div>
      <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-200">
        <div className="h-3 rounded-full bg-brand-600 transition-all" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
