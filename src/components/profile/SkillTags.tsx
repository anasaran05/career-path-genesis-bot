
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

interface Props {
  value: string[];
  onChange: (tags: string[]) => void;
}

const suggestions = [
  "Pharmacovigilance",
  "Clinical Research",
  "Regulatory Affairs",
  "Clinical Data",
  "ICU Pharmacy",
  "Biostatistics",
  "SAS",
  "Medical Writing",
  "Teamwork",
  "Communication"
];

const SkillTags: React.FC<Props> = ({ value, onChange }) => {
  const [input, setInput] = useState("");
  const [focus, setFocus] = useState(false);

  const addTag = (tag: string) => {
    if (!tag.trim() || value.includes(tag)) return;
    onChange([...value, tag]);
    setInput("");
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  const filteredSuggestions = suggestions.filter(s =>
    s.toLowerCase().includes(input.toLowerCase()) && !value.includes(s)
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map(tag => (
          <span key={tag} className="bg-autumn-100 text-autumn-700 rounded-xl px-3 py-1 flex items-center gap-1">
            {tag}
            <button type="button" aria-label="Remove tag" onClick={() => removeTag(tag)} className="ml-1">
              <X size={14} />
            </button>
          </span>
        ))}
      </div>
      <Input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => {
          if ((e.key === "Enter" || e.key === ",") && !!input.trim()) {
            addTag(input.trim());
            e.preventDefault();
          }
        }}
        onFocus={() => setFocus(true)}
        onBlur={() => setTimeout(() => setFocus(false), 80)}
        placeholder="Add skill (type & press Enter)..."
        className="rounded-lg bg-slate-50 border-slate-200"
      />
      {focus && filteredSuggestions.length > 0 && (
        <div className="mt-1 bg-white rounded shadow absolute z-10 w-60 border border-slate-200">
          {filteredSuggestions.map(s => (
            <div
              key={s}
              className="px-3 py-2 hover:bg-autumn-100 cursor-pointer"
              onMouseDown={() => addTag(s)}
            >
              {s}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillTags;
