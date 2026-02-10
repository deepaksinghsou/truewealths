import { Section } from "@/components/section";
import { Card } from "@/components/ui/card";
import { getCmsContent } from "@/lib/cms";

export default async function LegalPage() {
  const legal = (await getCmsContent()).legal;

  return (
    <Section title={legal.heading}>
      <div className="space-y-4">
        <Card>
          <h2 className="text-xl font-semibold">Disclaimer</h2>
          <p className="mt-2 text-slate-700">{legal.disclaimer}</p>
        </Card>
        <Card>
          <h2 className="text-xl font-semibold">Privacy Policy</h2>
          <p className="mt-2 text-slate-700">{legal.privacy}</p>
        </Card>
        <Card>
          <h2 className="text-xl font-semibold">Risk Disclosure</h2>
          <p className="mt-2 text-slate-700">{legal.riskDisclosure}</p>
        </Card>
      </div>
    </Section>
  );
}
