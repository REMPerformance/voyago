import { NextRequest, NextResponse } from "next/server";
import { sendEmail, orderConfirmationHtml, statusUpdateHtml } from "@/lib/email";

// POST /api/notify
// body: { type:"order"|"status", email, name?, orderId, destination, total?, status? }
export async function POST(req: NextRequest) {
  try {
    const b = await req.json();
    if (!b?.email || !b?.orderId || !b?.destination) {
      return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
    }
    const html =
      b.type === "status"
        ? statusUpdateHtml({ name: b.name, orderId: b.orderId, destination: b.destination, status: b.status ?? "—" })
        : orderConfirmationHtml({ name: b.name, orderId: b.orderId, destination: b.destination, total: b.total ?? "" });
    const subject = b.type === "status" ? `Stav žiadosti · ${b.orderId}` : `Potvrdenie objednávky · ${b.orderId}`;
    const r = await sendEmail({ to: b.email, subject, html });
    return NextResponse.json(r, { status: r.ok ? 200 : 500 });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
