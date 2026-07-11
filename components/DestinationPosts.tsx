import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { getPostsForDestination } from "@/lib/posts";

export async function DestinationPosts({ destinationSlug }: { destinationSlug: string }) {
  const posts = await getPostsForDestination(destinationSlug);
  if (posts.length === 0) return null;

  const fmt = (d: string) => new Date(d).toLocaleDateString("sk-SK", { day: "numeric", month: "long", year: "numeric" });

  return (
    <section className="container-page border-t border-line py-14">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-display text-2xl font-bold text-ink">Súvisiace články a novinky</h2>
        <p className="mt-1 text-ink-soft">Čo je nové a čo sa oplatí vedieť k tejto destinácii.</p>
        <div className="mt-6 space-y-3">
          {posts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group flex items-center gap-4 rounded-xl border border-line bg-surface p-4 shadow-card transition-all hover:-translate-y-0.5 hover:border-brass/40">
              {p.image && <img src={p.image} alt="" className="hidden h-16 w-24 shrink-0 rounded-lg object-cover sm:block" />}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 text-[0.68rem]">
                  <span className={`rounded-md px-1.5 py-0.5 font-bold ${p.kind === "blog" ? "bg-teal/12 text-teal" : "bg-brass/12 text-brass"}`}>{p.kind === "blog" ? "Sprievodca" : "Novinka"}</span>
                  <span className="text-ink-soft/70">{fmt(p.date)}</span>
                  {p.readMins ? <span className="inline-flex items-center gap-1 text-ink-soft/70"><Clock size={10} /> {p.readMins} min</span> : null}
                </div>
                <h3 className="mt-1 truncate font-display text-base font-bold text-ink transition-colors group-hover:text-brass">{p.title}</h3>
                <p className="truncate text-sm text-ink-soft">{p.excerpt}</p>
              </div>
              <ArrowRight size={16} className="shrink-0 text-brass transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
