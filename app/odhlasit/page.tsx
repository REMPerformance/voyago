import type { Metadata } from "next";
import { site } from "@/config/site";

export const metadata: Metadata = { title: "Odhlásenie z odberu | Voyago", robots: { index: false } };

export default function Page({ searchParams }: { searchParams: { email?: string } }) {
  const email = searchParams?.email || "";
  return (
    <section className="container-page py-20 text-center">
      <h1 className="font-display text-3xl font-bold">Odhlásenie z odberu</h1>
      <p className="mx-auto mt-3 max-w-md text-ink-soft">
        {email ? `Adresa ${email} bude odhlásená z ďalších e-mailov.` : "Napíšte nám a odhlásime vás z odberu."}
        {" "}Ak si to rozmyslíte, kedykoľvek sa môžete prihlásiť znova cez okno na stránke.
      </p>
      <p className="mt-6 text-sm text-ink-soft">
        Pre okamžité odhlásenie napíšte na <a href={`mailto:${site.email}?subject=Odhlásenie z odberu&body=${encodeURIComponent("Odhláste ma z odberu: " + email)}`} className="font-semibold text-brass">{site.email}</a>.
      </p>
    </section>
  );
}
