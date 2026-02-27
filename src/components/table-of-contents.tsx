"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll("h2[id], h3[id]")
    ) as HTMLElement[];

    const items: TocItem[] = elements.map((el) => ({
      id: el.id,
      text: el.textContent?.replace(/^#\s*/, "") || "",
      level: el.tagName === "H2" ? 2 : 3,
    }));

    setHeadings(items);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto">
      <p className="mb-3 text-xs font-semibold tracking-widest text-zinc-500 uppercase">
        On this page
      </p>
      <ul className="space-y-1.5 border-l border-zinc-800">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={`block border-l-2 text-xs leading-relaxed transition ${
                h.level === 3 ? "pl-6" : "pl-3"
              } ${
                activeId === h.id
                  ? "border-indigo-400 text-indigo-400"
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
