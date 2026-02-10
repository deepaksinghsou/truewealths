"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Section } from "@/components/section";
import { Card } from "@/components/ui/card";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.get("email"),
        password: form.get("password")
      })
    });

    if (!res.ok) {
      setError("Invalid email or password");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <Section title="Admin Login">
      <Card>
        <form className="max-w-md space-y-3" onSubmit={onSubmit}>
          <input name="email" placeholder="Email" type="email" className="w-full rounded border p-2" required />
          <input name="password" placeholder="Password" type="password" className="w-full rounded border p-2" required />
          <button className="rounded bg-brand-500 px-4 py-2 text-white">Sign In</button>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </form>
      </Card>
    </Section>
  );
}
