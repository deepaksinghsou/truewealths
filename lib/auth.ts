import crypto from "crypto";
import { cookies } from "next/headers";
import { verifyAdmin } from "@/lib/insforge";

const COOKIE_NAME = "tw_admin_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

function sign(payload: string): string {
  const secret = process.env.ADMIN_SESSION_SECRET || "local-dev-secret";
  return crypto.createHmac("sha256", secret).update(payload).digest("hex");
}

function buildToken(email: string) {
  const issuedAt = Date.now().toString();
  const payload = `${email}.${issuedAt}`;
  return `${payload}.${sign(payload)}`;
}

function verifyToken(token: string): boolean {
  const [email, issuedAt, sig] = token.split(".");
  if (!email || !issuedAt || !sig) return false;

  const payload = `${email}.${issuedAt}`;
  const age = Date.now() - Number(issuedAt);
  if (Number.isNaN(age) || age > SESSION_MAX_AGE_SECONDS * 1000) return false;

  const expected = sign(payload);
  const sigBuffer = Buffer.from(sig);
  const expectedBuffer = Buffer.from(expected);
  if (sigBuffer.length != expectedBuffer.length) return false;

  return crypto.timingSafeEqual(sigBuffer, expectedBuffer);
}

function verifyLocalAdmin(email: string, password: string): boolean {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    return false;
  }

  return email === adminEmail && password === adminPassword;
}

export async function loginAdmin(email: string, password: string): Promise<boolean> {
  let isValid = false;

  try {
    isValid = await verifyAdmin(email, password);
  } catch {
    isValid = false;
  }

  if (!isValid) {
    isValid = verifyLocalAdmin(email, password);
  }

  if (!isValid) return false;

  cookies().set(COOKIE_NAME, buildToken(email), {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS
  });

  return true;
}

export function logoutAdmin() {
  cookies().delete(COOKIE_NAME);
}

export function isAdminAuthenticated(): boolean {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifyToken(token);
}
