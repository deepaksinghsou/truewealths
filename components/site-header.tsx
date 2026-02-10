import Link from "next/link";

const links = [
  ["Home", "/"],
  ["About", "/about"],
  ["Services", "/services"],
  ["How We Work", "/how-we-work"],
  ["Contact", "/contact"],
  ["Legal", "/legal"]
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4">
        <Link href="/" className="text-lg font-semibold text-brand-700">
          True Wealths
        </Link>
        <nav className="flex flex-wrap items-center gap-4 text-sm text-slate-700">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="hover:text-brand-700">
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
