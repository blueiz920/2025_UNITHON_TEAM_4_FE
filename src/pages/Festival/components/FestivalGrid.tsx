// src/pages/Festival/components/FestivalGrid.tsx
"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, MapPin, Calendar } from "lucide-react";

import { Button } from "../components/button";
import { Badge } from "../components/Badge";

export type Festival = {
  id: string;
  name: string;
  location: string;
  period: string;
  image: string;
  keywords: string[];
  description: string;
  featured?: boolean;
};

export function FestivalGrid({ festivals }: { festivals: Festival[] }) {
  const [likedFestivals, setLikedFestivals] = useState<Record<string, boolean>>({});

  const toggleLike = (id: string) => {
    setLikedFestivals((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {festivals.map((festival) => (
        <div
          key={festival.id}
          className={`group relative overflow-hidden rounded-xl bg-[#fffefb] transition-all hover:shadow-lg ${
            festival.featured ? "ring-[1.7px] ring-[#ff651b] ring-offset-2" : ""
          }`}
        >
          <Link to={`/festivals/${festival.id}`} className="block">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <img
                src={festival.image || "/placeholder.svg"}
                alt={festival.name}
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://placehold.co/500x500/e2e8f0/64748b?text=Festival+Image";
                }}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              />
              {festival.featured && (
                <div className="absolute left-3 top-3 z-10">
                  <Badge className="bg-[#ff651b] text-white">추천 축제</Badge>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 transition-opacity group-hover:opacity-80" />
            </div>

            <div className="relative p-5">
              <h3 className="mb-2 text-xl font-bold text-gray-900">{festival.name}</h3>

              <div className="mb-3 flex flex-col space-y-1">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="mr-1 h-4 w-4 text-[#ff651b]" />
                  {festival.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="mr-1 h-4 w-4 text-[#ff651b]" />
                  {festival.period}
                </div>
              </div>

              <p className="mb-4 line-clamp-2 text-sm text-gray-600">{festival.description}</p>

              <div className="flex flex-wrap gap-1">
                {festival.keywords.slice(0, 3).map((keyword) => (
                  <Badge key={keyword} variant="outline" className="text-xs">
                    {keyword}
                  </Badge>
                ))}
                {festival.keywords.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{festival.keywords.length - 3}
                  </Badge>
                )}
              </div>
            </div>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className={`absolute right-3 top-3 z-10 rounded-full bg-white/80 opacity-80 transition-opacity hover:bg-white group-hover:opacity-100 ${
              likedFestivals[festival.id] ? "text-rose-500" : "text-gray-700"
            }`}
            onClick={(e) => {
              e.preventDefault();
              toggleLike(festival.id);
            }}
          >
            <Heart className={`h-4 w-4 ${likedFestivals[festival.id] ? "fill-current" : ""}`} />
            <span className="sr-only">좋아요</span>
          </Button>
        </div>
      ))}
    </div>
  );
}
