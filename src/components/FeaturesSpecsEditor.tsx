"use client";

interface FeaturesSpecsEditorProps {
  features: string[];
  specs: Record<string, string>;
  onFeaturesChange: (features: string[]) => void;
  onSpecsChange: (specs: Record<string, string>) => void;
}

export default function FeaturesSpecsEditor({
  features, specs, onFeaturesChange, onSpecsChange,
}: FeaturesSpecsEditorProps) {

  const updateFeature = (idx: number, val: string) => {
    const arr = [...features];
    arr[idx] = val;
    onFeaturesChange(arr);
  };

  const addFeature = () => onFeaturesChange([...features, ""]);

  const removeFeature = (idx: number) => onFeaturesChange(features.filter((_, i) => i !== idx));

  const updateSpecKey = (idx: number, val: string) => {
    const entries = Object.entries(specs);
    entries[idx] = [val, entries[idx][1]];
    onSpecsChange(Object.fromEntries(entries));
  };

  const updateSpecValue = (idx: number, val: string) => {
    const entries = Object.entries(specs);
    entries[idx] = [entries[idx][0], val];
    onSpecsChange(Object.fromEntries(entries));
  };

  const addSpec = () => {
    const entries = Object.entries(specs);
    onSpecsChange(Object.fromEntries([...entries, ["", ""]]));
  };

  const removeSpec = (idx: number) => {
    const entries = Object.entries(specs).filter((_, i) => i !== idx);
    onSpecsChange(Object.fromEntries(entries));
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Caractéristiques</label>
        <div className="space-y-2">
          {features.map((f, idx) => (
            <div key={idx} className="flex gap-2">
              <input
                type="text"
                value={f}
                onChange={(e) => updateFeature(idx, e.target.value)}
                placeholder="Ex: 24 cœurs / 32 threads"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button type="button" onClick={() => removeFeature(idx)} className="px-2 text-red-500 hover:text-red-700 text-sm">✕</button>
            </div>
          ))}
          <button type="button" onClick={addFeature} className="text-sm text-primary-600 hover:text-primary-700 font-medium">
            + Ajouter une caractéristique
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Spécifications techniques</label>
        <div className="space-y-2">
          {Object.entries(specs).map(([key, val], idx) => (
            <div key={idx} className="flex gap-2">
              <input
                type="text"
                value={key}
                onChange={(e) => updateSpecKey(idx, e.target.value)}
                placeholder="Ex: Cœurs"
                className="w-2/5 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <input
                type="text"
                value={val}
                onChange={(e) => updateSpecValue(idx, e.target.value)}
                placeholder="Ex: 16"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button type="button" onClick={() => removeSpec(idx)} className="px-2 text-red-500 hover:text-red-700 text-sm">✕</button>
            </div>
          ))}
          <button type="button" onClick={addSpec} className="text-sm text-primary-600 hover:text-primary-700 font-medium">
            + Ajouter une spécification
          </button>
        </div>
      </div>
    </div>
  );
}
