import { Section } from "@/components/section";
import { Card } from "@/components/ui/card";
import { getCmsContent } from "@/lib/cms";

export default async function ServicesPage() {
  const services = (await getCmsContent()).services;

  return (
    <Section title={services.heading}>
      <div className="grid gap-4 md:grid-cols-3">
        {services.items.map((item) => (
          <Card key={item.title}>
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="mt-2 text-slate-600">{item.description}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
