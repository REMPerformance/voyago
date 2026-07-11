import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/config/products";
import { POSTS } from "@/config/blog";
import { site } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const now = new Date();
  const staticPaths = ["", "/destinations", "/wizard", "/green-card", "/blog", "/foto-poziadavky", "/stav", "/kontakt", "/o-nas", "/pre-firmy", "/partnersky-program", "/ochrana-kupujuceho", "/obchodne-podmienky", "/reklamacie", "/ochrana-osobnych-udajov", "/cookies"];
  return [
    ...staticPaths.map((p) => ({ url: `${base}${p}`, lastModified: now, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7 })),
    ...PRODUCTS.map((p) => ({ url: `${base}/apply/${p.slug}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 })),
    ...POSTS.map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: new Date(p.date), changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
