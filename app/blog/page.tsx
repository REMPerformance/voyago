import type { Metadata } from "next";
import { BlogList } from "@/components/blog/BlogList";
import { getAllPosts } from "@/lib/posts";
import { site } from "@/config/site";

export const revalidate = 120;

export const metadata: Metadata = {
  title: "Blog — sprievodcovia a novinky o vízach | Voyago",
  description: "Praktické sprievodcovia k ESTA, ETA, e-Visa a ETIAS aj aktuálne zmeny vo vízach podľa krajín. Zrozumiteľne a na jednom mieste.",
  keywords: ["blog víza", "sprievodca ESTA", "novinky víza", "cestovné povolenia", "ETA sprievodca", "e-vízum"],
  alternates: {
    canonical: `${site.url}/blog`,
    languages: { "sk-SK": `${site.url}/blog`, "en-GB": `${site.url}/blog`, "uk-UA": `${site.url}/blog`, "de-DE": `${site.url}/blog`, "x-default": `${site.url}/blog` },
  },
  openGraph: { title: "Blog | Voyago", description: "Sprievodcovia a novinky o vízach a cestovných povoleniach.", url: `${site.url}/blog`, type: "website" },
};

export default async function Page() {
  const posts = await getAllPosts();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Voyago Blog",
    url: `${site.url}/blog`,
    publisher: { "@id": `${site.url}/#organization` },
    blogPost: posts.slice(0, 20).map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      datePublished: p.date,
      url: `${site.url}/blog/${p.slug}`,
    })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogList posts={posts} />
    </>
  );
}
