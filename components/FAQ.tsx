"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function FAQ({ items }: { items: { q: string; a?: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((it, i) => (
        <div key={it.q}>
          <button className="flex w-full items-center justify-between gap-4 py-4 text-left text-sm sm:text-base" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
            <span>{it.q}</span>{open === i ? <Minus size={16} className="text-accent shrink-0" /> : <Plus size={16} className="text-accent shrink-0" />}
          </button>
          {open === i && (
            <div className="pb-5 text-sm text-mute">
              {it.a ?? <span className="italic">Answer to be supplied by MADDspace. In the meantime, WhatsApp us at 8829 0800 and we'll answer right away.</span>}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
