// src/pages/Festival/festivals.tsx
"use client";

import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/index";
import { Tabs, TabsList, TabsTrigger } from "./components/Tabs";
import { Button } from "./components/button";
import { FestivalGrid } from "./components/FestivalGrid";
import { FilterBar } from "./components/FilterBar";
import { AppliedFilters } from "./components/AppliedFilters";
import { sampleFestivals } from "./constants";
import { FeaturedFestivalSlider } from "./components/FeaturedFestivalSlider";

export default function FestivalPage() {
  const [filteredFestivals, setFilteredFestivals] = useState(sampleFestivals);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedSeason, setSelectedSeason] = useState("all");
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  useEffect(() => {
    let filtered = sampleFestivals;

    if (searchQuery) {
      filtered = filtered.filter(
        (festival) =>
          festival.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          festival.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          festival.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedRegion !== "all") {
      filtered = filtered.filter((festival) =>
        festival.location.toLowerCase().includes(selectedRegion)
      );
    }

    if (selectedSeason !== "all") {
      const seasonKeywords = {
        spring: ["봄"],
        summer: ["여름"],
        autumn: ["가을"],
        winter: ["겨울"],
      };
      filtered = filtered.filter((festival) =>
        festival.keywords.some((keyword) =>
          seasonKeywords[selectedSeason as keyof typeof seasonKeywords].includes(keyword)
        )
      );
    }

    if (selectedKeywords.length > 0) {
      filtered = filtered.filter((festival) =>
        selectedKeywords.some((keyword) => festival.keywords.includes(keyword))
      );
    }

    setFilteredFestivals(filtered);
  }, [searchQuery, selectedRegion, selectedSeason, selectedKeywords]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedRegion("all");
    setSelectedSeason("all");
    setSelectedKeywords([]);
    setFilteredFestivals(sampleFestivals);
  };

  return (
    <div className="min-h-screen bg-[#fffefb]">
      <Navbar />

      <main className="max-w-screen-xl mx-auto px-4 pt-28 pb-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold md:text-4xl text-[#1f2328]">전국 축제</h1>
          <p className="text-[#1f2328]/70">
            한국의 다양한 지역에서 열리는 특색 있는 축제들을 만나보세요
          </p>
        </div>
        <FeaturedFestivalSlider festivals={sampleFestivals.filter((f) => f.featured)} />
        <div className="relative mb-6">
          <FilterBar
            searchQuery={searchQuery}
            onSearch={setSearchQuery}
            selectedRegion={selectedRegion}
            onRegionChange={setSelectedRegion}
            selectedSeason={selectedSeason}
            onSeasonChange={setSelectedSeason}
            selectedKeywords={selectedKeywords}
            onToggleKeyword={(k) =>
              setSelectedKeywords((prev) =>
                prev.includes(k) ? prev.filter((i) => i !== k) : [...prev, k]
              )
            }
            onReset={resetFilters}
          />
        </div>

        <AppliedFilters
          selectedRegion={selectedRegion}
          selectedSeason={selectedSeason}
          selectedKeywords={selectedKeywords}
          onReset={resetFilters}
        />

        <Tabs>
          <TabsList>
            <TabsTrigger value="all">전체 축제</TabsTrigger>
            <TabsTrigger value="featured">추천 축제</TabsTrigger>
            <TabsTrigger value="upcoming">다가오는 축제</TabsTrigger>
            <TabsTrigger value="ongoing">진행 중인 축제</TabsTrigger>
          </TabsList>
        </Tabs>

        {filteredFestivals.length > 0 ? (
          <FestivalGrid festivals={filteredFestivals} />
        ) : (
          <div className="flex h-60 flex-col items-center justify-center border rounded-lg text-center">
            <p className="mb-4 text-gray-500">검색 결과가 없습니다</p>
            <Button variant="outline" onClick={resetFilters}>
              모든 필터 초기화
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
