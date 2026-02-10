import { Section } from "@/components/section";
import { Card } from "@/components/ui/card";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { getCmsContent } from "@/lib/cms";

export default async function ContactPage() {
  const contact = (await getCmsContent()).contact;

  return (
    <Section title={contact.heading}>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <p className="text-lg">📱 Mobile: {contact.mobile}</p>
          <p className="mt-2 text-lg">📧 Email: {contact.email}</p>
          <p className="mt-5 text-slate-700">{contact.closingLine}</p>
        </Card>
        <Card>
          <h2 className="text-xl font-semibold">Send a message</h2>
          <form className="mt-4 space-y-3">
            <input className="w-full rounded border border-slate-300 p-2" placeholder="Name" />
            <input className="w-full rounded border border-slate-300 p-2" placeholder="Email" type="email" />
            <textarea className="w-full rounded border border-slate-300 p-2" placeholder="Message" rows={5} />
            <button className="rounded bg-brand-500 px-4 py-2 text-white">Submit</button>
          </form>
        </Card>
      </div>
      <WhatsAppFloat />
    </Section>
  );
}
