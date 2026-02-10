import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getCmsContent } from "@/lib/cms";

export default async function HomePage() {
  const content = await getCmsContent();
  const home = content.home;

  return (
    <div>
      <section className="mx-auto max-w-6xl px-4 pb-10 pt-16 text-center">
        <h1 className="text-4xl font-bold text-brand-700 md:text-5xl">{home.heading}</h1>
        <p className="mt-3 text-xl text-slate-700">{home.subheading}</p>
        <p className="mx-auto mt-5 max-w-2xl text-slate-600">{home.description}</p>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <Card>
          <h2 className="text-2xl font-semibold">Introduction</h2>
          <p className="mt-3 text-slate-600">{home.intro}</p>
        </Card>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="mb-4 text-2xl font-semibold">How We Work</h2>
        <div className="grid gap-4 md:grid-cols-4">
          {home.steps.map((step, index) => (
            <Card key={step}>
              <p className="text-sm font-semibold text-brand-700">Step {index + 1}</p>
              <p className="mt-2 text-slate-700">{step}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <Card>
          <h2 className="text-2xl font-semibold">Services Preview</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
            {home.servicesPreview.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </Card>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <Card>
          <h2 className="text-2xl font-semibold">{home.ctaText}</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/contact">Contact</Button>
            <Button href="https://wa.me/917461987316" variant="secondary">
              WhatsApp
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
}
