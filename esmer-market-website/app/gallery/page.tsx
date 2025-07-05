"use client";

import Image from "next/image";
import marketImg from "../images/market.png";
import teamImg from "../images/team.jpg";
import img06 from "../images/IMG-20250703-WA0006.jpg";
import img07 from "../images/IMG-20250703-WA0007.jpg";
import img08 from "../images/IMG-20250703-WA0008.jpg";
import img09 from "../images/IMG-20250703-WA0009.jpg";
import img10 from "../images/IMG-20250703-WA0010.jpg";
import img11 from "../images/IMG-20250703-WA0011.jpg";
import img12 from "../images/IMG-20250703-WA0012.jpg";
import img13 from "../images/IMG-20250703-WA0013.jpg";
import img14 from "../images/IMG-20250703-WA0014.jpg";
import img15 from "../images/IMG-20250703-WA0015.jpg";
import img16 from "../images/IMG-20250703-WA0016.jpg";
import img17 from "../images/IMG-20250703-WA0017.jpg";
import img18 from "../images/IMG-20250703-WA0018.jpg";
import img19 from "../images/IMG-20250703-WA0019.jpg";
import img20 from "../images/IMG-20250703-WA0020.jpg";
import img21 from "../images/IMG-20250703-WA0021.jpg";
import img22 from "../images/IMG-20250703-WA0022.jpg";
import img23 from "../images/IMG-20250703-WA0023.jpg";
import img24 from "../images/IMG-20250703-WA0024.jpg";
import img25 from "../images/IMG-20250703-WA0025.jpg";
import img26 from "../images/IMG-20250703-WA0026.jpg";
import img27 from "../images/IMG-20250703-WA0027.jpg";
import img28 from "../images/IMG-20250703-WA0028.jpg";
import img29 from "../images/IMG-20250703-WA0029.jpg";
import img30 from "../images/IMG-20250703-WA0030.jpg";
import img32 from "../images/IMG-20250703-WA0032.jpg";
import img33 from "../images/IMG-20250703-WA0033.jpg";
import img35 from "../images/IMG-20250703-WA0035.jpg";

export default function GalleryPage() {
  // All gallery images from app/images folder
  const galleryImages = [
    { image: marketImg, alt: "Esmer Market Exterior" },
    { image: teamImg, alt: "Our Team" },
    { image: img06, alt: "Market Image" },
    { image: img07, alt: "Market Image" },
    { image: img08, alt: "Market Image" },
    { image: img09, alt: "Market Image" },
    { image: img10, alt: "Market Image" },
    { image: img11, alt: "Market Image" },
    { image: img12, alt: "Market Image" },
    { image: img13, alt: "Market Image" },
    { image: img14, alt: "Market Image" },
    { image: img15, alt: "Market Image" },
    { image: img16, alt: "Market Image" },
    { image: img17, alt: "Market Image" },
    { image: img18, alt: "Market Image" },
    { image: img19, alt: "Market Image" },
    { image: img20, alt: "Market Image" },
    { image: img21, alt: "Market Image" },
    { image: img22, alt: "Market Image" },
    { image: img23, alt: "Market Image" },
    { image: img24, alt: "Market Image" },
    { image: img25, alt: "Market Image" },
    { image: img26, alt: "Market Image" },
    { image: img27, alt: "Market Image" },
    { image: img28, alt: "Market Image" },
    { image: img29, alt: "Market Image" },
    { image: img30, alt: "Market Image" },
    { image: img32, alt: "Market Image" },
    { image: img33, alt: "Market Image" },
    { image: img35, alt: "Market Image" }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Galeri
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {galleryImages.map((item, index) => (
          <div 
            key={index} 
            className="overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300"
          >
            <div className="aspect-square relative">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                priority={index < 8}
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          Bizi Ziyaret Edin
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/location"
            className="inline-flex h-12 items-center justify-center rounded-md bg-green-600 px-8 text-base font-medium text-white shadow-sm transition-colors hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
          >
            Yol Tarifi
          </a>
          <a
            href="/contact"
            className="inline-flex h-12 items-center justify-center rounded-md border border-gray-300 bg-white px-8 text-base font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
          >
            İletişim
          </a>
        </div>
      </div>
    </div>
  );
} 