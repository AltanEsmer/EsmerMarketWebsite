import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Metadata } from "next"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateMetadata({
  title,
  description,
  keywords = "",
  path = "",
  image = "/images/market.png",
  imageAlt = "Esmer Market Logo ve Mağaza Görünümü",
}: {
  title: string;
  description: string;
  keywords?: string;
  path?: string;
  image?: string;
  imageAlt?: string;
}): Metadata {
  const url = `https://esmermarket.com${path}`;
  
  return {
    title,
    description,
    keywords: `Esmer Market, ${keywords}`,
    openGraph: {
      title,
      description,
      url,
      siteName: "Esmer Market",
      locale: "tr_TR",
      type: "website",
      images: [
        {
          url: `https://esmermarket.com${image}`,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`https://esmermarket.com${image}`],
    },
    alternates: {
      canonical: url,
      languages: {
        "tr-TR": `${url}/tr`,
        "en-US": `${url}/en`,
      },
    },
  };
}
