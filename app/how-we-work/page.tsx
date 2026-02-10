import { Section } from "@/components/section";
import { Card } from "@/components/ui/card";
import { getCmsContent } from "@/lib/cms";

export default async function HowWeWorkPage() {
  const data = (await getCmsContent()).howWeWork;

  return (
    <Section title={data.heading}>
      <div className="grid gap-4 md:grid-cols-2">
        {data.steps.map((step, index) => (
          <Card key={step}>
            <p className="text-sm font-semibold text-brand-700">{index + 1}</p>
            <p className="mt-2 text-slate-700">{step}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
