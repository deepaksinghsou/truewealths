"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Section } from "@/components/section";
import { Card } from "@/components/ui/card";
import { CmsContent } from "@/types/cms";

type FieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
};

type ListFieldProps = {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
};

function Field({ label, value, onChange, multiline = false }: FieldProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      {multiline ? (
        <textarea
          rows={4}
          className="w-full rounded-md border border-slate-300 p-2 text-sm"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          className="w-full rounded-md border border-slate-300 p-2 text-sm"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}

function ListField({ label, values, onChange }: ListFieldProps) {
  function setAt(index: number, value: string) {
    const next = [...values];
    next[index] = value;
    onChange(next);
  }

  function addItem() {
    onChange([...values, ""]);
  }

  function removeItem(index: number) {
    onChange(values.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      <div className="space-y-2">
        {values.map((item, index) => (
          <div className="flex gap-2" key={`${label}-${index}`}>
            <input
              className="w-full rounded-md border border-slate-300 p-2 text-sm"
              value={item}
              onChange={(e) => setAt(index, e.target.value)}
            />
            <button
              type="button"
              className="rounded border border-slate-300 px-3 text-sm"
              onClick={() => removeItem(index)}
              disabled={values.length <= 1}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <button type="button" className="rounded border border-slate-300 px-3 py-1 text-sm" onClick={addItem}>
        Add item
      </button>
    </div>
  );
}

export default function AdminPage() {
  const [content, setContent] = useState<CmsContent | null>(null);
  const [status, setStatus] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/admin/content")
      .then(async (res) => {
        if (!res.ok) {
          router.push("/admin/login");
          return null;
        }
        return res.json();
      })
      .then((data) => setContent(data?.content ?? null));
  }, [router]);

  if (!content) {
    return <Section title="Admin CMS">Loading...</Section>;
  }

  async function save() {
    setIsSaving(true);
    setStatus("");

    const res = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content })
    });

    setIsSaving(false);
    setStatus(res.ok ? "Saved successfully" : "Failed to save");
  }

  return (
    <Section title="Admin CMS">
      <p className="mb-4 text-sm text-slate-600">
        Edit website content below. All sections on Home, About, Services, How We Work, Contact, and Legal can be updated.
      </p>

      <div className="space-y-4">
        <Card>
          <h2 className="mb-3 text-lg font-semibold">Home</h2>
          <div className="space-y-3">
            <Field
              label="Heading"
              value={content.home.heading}
              onChange={(value) => setContent({ ...content, home: { ...content.home, heading: value } })}
            />
            <Field
              label="Subheading"
              value={content.home.subheading}
              onChange={(value) => setContent({ ...content, home: { ...content.home, subheading: value } })}
            />
            <Field
              label="Description"
              multiline
              value={content.home.description}
              onChange={(value) => setContent({ ...content, home: { ...content.home, description: value } })}
            />
            <Field
              label="Introduction"
              multiline
              value={content.home.intro}
              onChange={(value) => setContent({ ...content, home: { ...content.home, intro: value } })}
            />
            <ListField
              label="How We Work Steps (Home)"
              values={content.home.steps}
              onChange={(values) => setContent({ ...content, home: { ...content.home, steps: values } })}
            />
            <ListField
              label="Services Preview"
              values={content.home.servicesPreview}
              onChange={(values) => setContent({ ...content, home: { ...content.home, servicesPreview: values } })}
            />
            <Field
              label="CTA Text"
              value={content.home.ctaText}
              onChange={(value) => setContent({ ...content, home: { ...content.home, ctaText: value } })}
            />
          </div>
        </Card>

        <Card>
          <h2 className="mb-3 text-lg font-semibold">About</h2>
          <div className="space-y-3">
            <Field
              label="Heading"
              value={content.about.heading}
              onChange={(value) => setContent({ ...content, about: { ...content.about, heading: value } })}
            />
            <Field
              label="Founder Name"
              value={content.about.founderName}
              onChange={(value) => setContent({ ...content, about: { ...content.about, founderName: value } })}
            />
            <Field
              label="Founder Role"
              value={content.about.founderRole}
              onChange={(value) => setContent({ ...content, about: { ...content.about, founderRole: value } })}
            />
            <Field
              label="Philosophy"
              multiline
              value={content.about.philosophy}
              onChange={(value) => setContent({ ...content, about: { ...content.about, philosophy: value } })}
            />
            <ListField
              label="Credentials"
              values={content.about.credentials}
              onChange={(values) => setContent({ ...content, about: { ...content.about, credentials: values } })}
            />
          </div>
        </Card>

        <Card>
          <h2 className="mb-3 text-lg font-semibold">Services</h2>
          <div className="space-y-3">
            <Field
              label="Services Section Heading"
              value={content.services.heading}
              onChange={(value) => setContent({ ...content, services: { ...content.services, heading: value } })}
            />
            {content.services.items.map((item, index) => (
              <div className="space-y-2 rounded border border-slate-200 p-3" key={`${item.title}-${index}`}>
                <Field
                  label={`Service ${index + 1} Title`}
                  value={item.title}
                  onChange={(value) => {
                    const items = [...content.services.items];
                    items[index] = { ...items[index], title: value };
                    setContent({ ...content, services: { ...content.services, items } });
                  }}
                />
                <Field
                  label={`Service ${index + 1} Description`}
                  multiline
                  value={item.description}
                  onChange={(value) => {
                    const items = [...content.services.items];
                    items[index] = { ...items[index], description: value };
                    setContent({ ...content, services: { ...content.services, items } });
                  }}
                />
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="mb-3 text-lg font-semibold">How We Work</h2>
          <div className="space-y-3">
            <Field
              label="Section Heading"
              value={content.howWeWork.heading}
              onChange={(value) => setContent({ ...content, howWeWork: { ...content.howWeWork, heading: value } })}
            />
            <ListField
              label="Steps"
              values={content.howWeWork.steps}
              onChange={(values) => setContent({ ...content, howWeWork: { ...content.howWeWork, steps: values } })}
            />
          </div>
        </Card>

        <Card>
          <h2 className="mb-3 text-lg font-semibold">Contact</h2>
          <div className="space-y-3">
            <Field
              label="Heading"
              value={content.contact.heading}
              onChange={(value) => setContent({ ...content, contact: { ...content.contact, heading: value } })}
            />
            <Field
              label="Mobile"
              value={content.contact.mobile}
              onChange={(value) => setContent({ ...content, contact: { ...content.contact, mobile: value } })}
            />
            <Field
              label="Email"
              value={content.contact.email}
              onChange={(value) => setContent({ ...content, contact: { ...content.contact, email: value } })}
            />
            <Field
              label="Closing Line"
              multiline
              value={content.contact.closingLine}
              onChange={(value) => setContent({ ...content, contact: { ...content.contact, closingLine: value } })}
            />
          </div>
        </Card>

        <Card>
          <h2 className="mb-3 text-lg font-semibold">Legal</h2>
          <div className="space-y-3">
            <Field
              label="Heading"
              value={content.legal.heading}
              onChange={(value) => setContent({ ...content, legal: { ...content.legal, heading: value } })}
            />
            <Field
              label="Disclaimer"
              multiline
              value={content.legal.disclaimer}
              onChange={(value) => setContent({ ...content, legal: { ...content.legal, disclaimer: value } })}
            />
            <Field
              label="Privacy Policy"
              multiline
              value={content.legal.privacy}
              onChange={(value) => setContent({ ...content, legal: { ...content.legal, privacy: value } })}
            />
            <Field
              label="Risk Disclosure"
              multiline
              value={content.legal.riskDisclosure}
              onChange={(value) => setContent({ ...content, legal: { ...content.legal, riskDisclosure: value } })}
            />
          </div>
        </Card>

        <div className="flex flex-wrap gap-3">
          <button className="rounded bg-brand-500 px-4 py-2 text-white disabled:opacity-60" onClick={save} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
          <button
            className="rounded border border-slate-300 px-4 py-2"
            onClick={async () => {
              await fetch("/api/admin/logout", { method: "POST" });
              router.push("/admin/login");
            }}
          >
            Logout
          </button>
        </div>

        {status && <p className="text-sm text-slate-600">{status}</p>}
      </div>
    </Section>
  );
}
