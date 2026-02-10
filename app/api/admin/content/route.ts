import { NextResponse } from "next/server";
import { getCmsContent, saveCmsContent } from "@/lib/cms";
import { isAdminAuthenticated } from "@/lib/auth";
import { CmsContent } from "@/types/cms";

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isCmsContent(content: unknown): content is CmsContent {
  if (!content || typeof content !== "object") return false;
  const c = content as CmsContent;

  return (
    typeof c.home?.heading === "string" &&
    typeof c.home?.subheading === "string" &&
    typeof c.home?.description === "string" &&
    typeof c.home?.intro === "string" &&
    isStringArray(c.home?.steps) &&
    isStringArray(c.home?.servicesPreview) &&
    typeof c.home?.ctaText === "string" &&
    typeof c.about?.heading === "string" &&
    typeof c.about?.founderName === "string" &&
    typeof c.about?.founderRole === "string" &&
    typeof c.about?.philosophy === "string" &&
    isStringArray(c.about?.credentials) &&
    typeof c.services?.heading === "string" &&
    Array.isArray(c.services?.items) &&
    c.services.items.every((item) => typeof item.title === "string" && typeof item.description === "string") &&
    typeof c.howWeWork?.heading === "string" &&
    isStringArray(c.howWeWork?.steps) &&
    typeof c.contact?.heading === "string" &&
    typeof c.contact?.mobile === "string" &&
    typeof c.contact?.email === "string" &&
    typeof c.contact?.closingLine === "string" &&
    typeof c.legal?.heading === "string" &&
    typeof c.legal?.disclaimer === "string" &&
    typeof c.legal?.privacy === "string" &&
    typeof c.legal?.riskDisclosure === "string"
  );
}

export async function GET() {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  return NextResponse.json({ ok: true, content: await getCmsContent() });
}

export async function PUT(req: Request) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const { content } = await req.json();
  if (!isCmsContent(content)) {
    return NextResponse.json({ ok: false, message: "Invalid content shape" }, { status: 400 });
  }

  await saveCmsContent(content);

  return NextResponse.json({ ok: true });
}
