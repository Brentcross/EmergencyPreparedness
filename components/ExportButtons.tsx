interface ExportButtonsProps {
  filename: string;
  jsonData: unknown;
  printPath: string;
}

const downloadFile = (filename: string, content: string, type: string) => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export function ExportButtons({ filename, jsonData, printPath }: ExportButtonsProps) {
  const saveJson = () => {
    downloadFile(`${filename}.json`, JSON.stringify(jsonData, null, 2), "application/json");
  };

  const saveCsv = () => {
    const flat = Array.isArray(jsonData) ? jsonData : [jsonData];
    const keys = Array.from(flat.reduce((set, item) => {
      Object.keys(item as Record<string, unknown>).forEach((key) => set.add(key));
      return set;
    }, new Set<string>()));
    const rows = flat.map((item) => {
      const row = item as Record<string, any>;
      return keys.map((key) => JSON.stringify(row[key] ?? "")).join(",");
    });
    downloadFile(`${filename}.csv`, [keys.join(","), ...rows].join("\n"), "text/csv");
  };

  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <button type="button" onClick={saveJson} className="inline-flex items-center rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
        Export JSON
      </button>
      <button type="button" onClick={saveCsv} className="inline-flex items-center rounded-full bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-300">
        Export CSV
      </button>
      <a className="inline-flex items-center rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-200" href={printPath}>
        Open print view
      </a>
    </div>
  );
}
