import { Section } from "@/components/section";
import { Card } from "@/components/ui/card";
import { getCmsContent } from "@/lib/cms";

export default async function AboutPage() {
  const about = (await getCmsContent()).about;

  return (
    <Section title={about.heading}>
      <Card>
        <h2 className="text-xl font-semibold">{about.founderName}</h2>
        <p className="text-slate-600">{about.founderRole}</p>
        <p className="mt-4 text-slate-700">{about.philosophy}</p>
        <h3 className="mt-6 text-lg font-semibold">Credentials</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">
          {about.credentials.map((cred) => (
            <li key={cred}>{cred}</li>
          ))}
        </ul>
      </Card>
    </Section>
  );
}
