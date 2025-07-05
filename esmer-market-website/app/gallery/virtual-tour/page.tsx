"use client";

import { useTranslation } from "react-i18next";
import { useState, useRef } from "react";
import { Pannellum } from "pannellum-react";
import Image from "next/image";

interface HotspotProps {
  type: string;
  pitch: number;
  yaw: number;
  text: string;
  targetScene?: string;
}

interface TourLocation {
  id: string;
  title: string;
  image: string;
  description: string;
  hotspots: HotspotProps[];
}

// Define tour locations with their images and hotspots
const tourLocations: TourLocation[] = [
  {
    id: "entrance",
    title: "Market Entrance Area",
    image: "/images/panoramas/pano1.jpg",
    description: "The welcoming entrance area of Esmer Market",
    hotspots: [
      {
        type: "custom",
        pitch: 0,
        yaw: -35,
        targetScene: "produce",
        text: "Go to Main Shopping Area"
      },
      {
        type: "info",
        pitch: -5,
        yaw: 35,
        text: "Welcome to Esmer Market"
      }
    ]
  },
  {
    id: "produce",
    title: "Main Shopping Area",
    image: "/images/panoramas/pano2.jpg",
    description: "Browse our wide selection of fresh products and groceries",
    hotspots: [
      {
        type: "custom",
        pitch: 0,
        yaw: 150,
        targetScene: "entrance",
        text: "Back to Entrance Area"
      },
      {
        type: "custom",
        pitch: 0,
        yaw: -60,
        targetScene: "bakery",
        text: "Go to Specialty Section"
      }
    ]
  },
  {
    id: "bakery",
    title: "Specialty Products Section",
    image: "/images/panoramas/pano3.jpg",
    description: "Discover our specialty products and local delicacies",
    hotspots: [
      {
        type: "custom",
        pitch: 0,
        yaw: 120,
        targetScene: "produce",
        text: "Back to Main Shopping Area"
      },
      {
        type: "info",
        pitch: -10,
        yaw: 0,
        text: "Featuring local and imported specialties"
      }
    ]
  }
];

export default function VirtualTourPage() {
  const { t } = useTranslation();
  const [currentScene, setCurrentScene] = useState("entrance");
  const [isLoading, setIsLoading] = useState(true);
  const pannellumRef = useRef(null);

  // Find the current location data
  const currentLocation = tourLocations.find(location => location.id === currentScene);

  // Custom hotspot icon
  const customHotspotIcon = (hotSpotDiv: HTMLElement, args: { text: string }) => {
    hotSpotDiv.classList.add("custom-hotspot");
    const span = document.createElement("span");
    span.innerHTML = "🚶";
    hotSpotDiv.appendChild(span);
    
    const tooltip = document.createElement("div");
    tooltip.classList.add("hotspot-tooltip");
    tooltip.innerHTML = args.text;
    hotSpotDiv.appendChild(tooltip);
  };

  // Handle scene change
  const handleSceneChange = (sceneId: string) => {
    setIsLoading(true);
    setCurrentScene(sceneId);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {t("virtualTour.title") || "Virtual Store Tour"}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
          {t("virtualTour.description") || "Experience our market in 360° - navigate through different sections using the hotspots."}
        </p>
        
        {/* Location selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {tourLocations.map((location) => (
            <button
              key={location.id}
              onClick={() => handleSceneChange(location.id)}
              className={`px-4 py-2 rounded-md transition-colors ${
                currentScene === location.id
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {location.title}
            </button>
          ))}
        </div>
      </div>

      {/* Current location info */}
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          {currentLocation?.title}
        </h2>
        <p className="text-gray-600">{currentLocation?.description}</p>
      </div>

      {/* 360 panorama viewer */}
      <div className="relative w-full h-[70vh] rounded-lg overflow-hidden shadow-lg">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-t-transparent"></div>
              <p className="mt-4 text-gray-700">{t("virtualTour.loading") || "Loading panorama..."}</p>
            </div>
          </div>
        )}
        
        {currentLocation && (
          <Pannellum
            ref={pannellumRef}
            width="100%"
            height="100%"
            image={currentLocation.image}
            pitch={0}
            yaw={0}
            hfov={110}
            autoLoad
            showZoomCtrl={true}
            showFullscreenCtrl={true}
            compass={true}
            onLoad={() => setIsLoading(false)}
            hotspotDebug={false}
          >
            {currentLocation.hotspots.map((hotspot, index) => (
              hotspot.type === "info" ? (
                <Pannellum.Hotspot
                  key={`${currentScene}-info-${index}`}
                  type="info"
                  pitch={hotspot.pitch}
                  yaw={hotspot.yaw}
                  text={hotspot.text}
                />
              ) : (
                <Pannellum.Hotspot
                  key={`${currentScene}-custom-${index}`}
                  type="custom"
                  pitch={hotspot.pitch}
                  yaw={hotspot.yaw}
                  tooltip={customHotspotIcon}
                  tooltipArg={{ text: hotspot.text }}
                  handleClick={() => hotspot.targetScene && handleSceneChange(hotspot.targetScene)}
                />
              )
            ))}
          </Pannellum>
        )}
      </div>

      {/* Instructions */}
      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          {t("virtualTour.instructions") || "How to Navigate"}
        </h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-600">
          <li>{t("virtualTour.dragInstruction") || "Click and drag to look around"}</li>
          <li>{t("virtualTour.zoomInstruction") || "Use mouse wheel or pinch to zoom in/out"}</li>
          <li>{t("virtualTour.hotspotInstruction") || "Click on hotspots (🚶) to move to different areas"}</li>
          <li>{t("virtualTour.fullscreenInstruction") || "Click the fullscreen button for an immersive experience"}</li>
        </ul>
      </div>

      {/* Back to gallery link */}
      <div className="mt-8 text-center">
        <a
          href="/gallery"
          className="inline-flex h-12 items-center justify-center rounded-md bg-white border border-gray-300 px-8 text-base font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
        >
          {t("virtualTour.backToGallery") || "Back to Gallery"}
        </a>
      </div>

      <style jsx global>{`
        .custom-hotspot {
          width: 30px;
          height: 30px;
          background-color: rgba(0, 128, 0, 0.7);
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          position: relative;
        }
        
        .custom-hotspot span {
          font-size: 20px;
        }
        
        .hotspot-tooltip {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          background-color: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 5px 10px;
          border-radius: 5px;
          font-size: 14px;
          white-space: nowrap;
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
        }
        
        .custom-hotspot:hover .hotspot-tooltip {
          opacity: 1;
        }
      `}</style>
    </div>
  );
} 