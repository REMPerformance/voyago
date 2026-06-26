import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticle } from "@/components/blog/BlogArticle";
import { getPost, POSTS } from "@/config/blog";
import { site } from "@/config/site";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug);
  if (!post) return { title: "Článok | Voyago" };
  const url = `${site.url}/blog/${post.slug}`;
  return {
    title: post.seoTitle.sk,
    description: post.metaDescription.sk,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: post.seoTitle.sk,
      description: post.metaDescription.sk,
      url,
      type: "article",
      images: [{ url: post.image }],
      publishedTime: post.date,
      modifiedTime: post.updated || post.date,
    },
    twitter: { card: "summary_large_image", title: post.seoTitle.sk, description: post.metaDescription.sk, images: [post.image] },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();
  const url = `${site.url}/blog/${post.slug}`;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title.sk,
    description: post.metaDescription.sk,
    image: post.image,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    author: { "@type": "Organization", name: site.brand },
    publisher: { "@type": "Organization", name: site.brand },
    mainEntityOfPage: url,
  };
  const faqLd = post.faq && post.faq.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faq.map((f) => ({ "@type": "Question", name: f.q.sk, acceptedAnswer: { "@type": "Answer", text: f.a.sk } })),
      }
    : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}
      <BlogArticle slug={post.slug} />
    </>
  );
}
