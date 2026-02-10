import { ReactNode } from "react";

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-4 text-3xl font-semibold text-slate-900">{title}</h1>
      {children}
    </section>
  );
}
