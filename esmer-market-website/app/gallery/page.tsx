"use client";

import { useTranslation } from "react-i18next";
import Image from "next/image";

export default function GalleryPage() {
  const { t } = useTranslation();
  
  // Gallery images with their descriptions
  const galleryImages = [
    {
      src: "/images/market.png",
      alt: "Esmer Market Exterior",
      title: "Our Market",
      description: "The exterior of our market located in Yeni Boğaziçi"
    },
    {
      src: "/images/freshProduce.jpg",
      alt: "Fresh Produce Section",
      title: "Fresh Produce",
      description: "Our selection of fresh fruits and vegetables"
    },
    {
      src: "/images/dairy&cheese.jpg",
      alt: "Dairy and Cheese Section",
      title: "Dairy & Cheese",
      description: "Quality dairy products and artisanal cheeses"
    },
    {
      src: "/images/bakery.jpg",
      alt: "Bakery Section",
      title: "Bakery",
      description: "Freshly baked goods made daily"
    },
    {
      src: "/images/fruits.jpg",
      alt: "Fruit Selection",
      title: "Fresh Fruits",
      description: "Seasonal and imported fruits"
    },
    {
      src: "/images/vegetables.jpg",
      alt: "Vegetable Selection",
      title: "Fresh Vegetables",
      description: "Local and organic vegetables"
    },
    {
      src: "/images/special.jpg",
      alt: "Specialty Items",
      title: "Specialty Items",
      description: "Unique and specialty products"
    },
    {
      src: "/images/team.jpg",
      alt: "Our Team",
      title: "Our Team",
      description: "Meet the friendly faces behind Esmer Market"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {t("gallery.title") || "Our Market Gallery"}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {t("gallery.description") || "Take a visual tour of our market, products, and team. See what makes Esmer Market special."}
        </p>
        
        {/* Virtual Tour Button */}
        <div className="mt-6">
          <a 
            href="/gallery/virtual-tour" 
            className="inline-flex h-12 items-center justify-center rounded-md bg-green-600 px-8 text-base font-medium text-white shadow-sm transition-colors hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
          >
            {t("gallery.virtualTour") || "Experience Virtual Tour"}
            <span className="ml-2">🔍</span>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryImages.map((image, index) => (
          <div 
            key={index} 
            className="overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300"
          >
            <div className="aspect-square relative">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-900">{image.title}</h3>
              <p className="text-gray-600 mt-1">{image.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          {t("gallery.visit_us") || "Visit Us In Person"}
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          {t("gallery.visit_description") || "We'd love to welcome you to our market. Come visit us to experience our products and friendly service in person."}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/location"
            className="inline-flex h-12 items-center justify-center rounded-md bg-green-600 px-8 text-base font-medium text-white shadow-sm transition-colors hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
          >
            {t("gallery.get_directions") || "Get Directions"}
          </a>
          <a
            href="/contact"
            className="inline-flex h-12 items-center justify-center rounded-md border border-gray-300 bg-white px-8 text-base font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
          >
            {t("gallery.contact_us") || "Contact Us"}
          </a>
        </div>
      </div>
    </div>
  );
} 