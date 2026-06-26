import type { Metadata } from "next";
import { BlogList } from "@/components/blog/BlogList";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Blog — sprievodcovia k vízam a cestovným povoleniam | Voyago",
  description: "Praktické sprievodcovia k ESTA, ETA, e-Visa a ETIAS. Zrozumiteľne a podľa krajiny — pripravené tímom Voyago.",
  alternates: { canonical: `${site.url}/blog` },
  openGraph: {
    title: "Blog | Voyago",
    description: "Praktické sprievodcovia k vízam a cestovným povoleniam.",
    url: `${site.url}/blog`,
    type: "website",
  },
};

export default function Page() {
  return <BlogList />;
}
