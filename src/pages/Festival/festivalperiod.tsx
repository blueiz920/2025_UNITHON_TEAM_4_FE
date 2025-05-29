// src/pages/Festival/festivalperiod.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { PeriodSelectorBar } from "./components/PeriodSelcectorBar";
import { FestivalGrid } from "./components/FestivalGrid";
import { sampleFestivals } from "./constants";
import Navbar from "../../components/Navbar";

export default function FestivalPeriodPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [filteredFestivals, setFilteredFestivals] = useState(sampleFestivals);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [selectedRegion, setSelectedRegion] = useState("all");

  const headerRef = useRef<HTMLDivElement>(null);

  // 스크롤 이벤트 처리
  useEffect(() => {
    const handleScroll = () => {
      const threshold = 1;
      const shouldScroll = window.scrollY > threshold;
      setIsScrolled(shouldScroll);

      if (!shouldScroll) {
        setIsExpanded(false); // 맨 위로 오면 자동 축소
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = () => {
    let filtered = sampleFestivals;

    if (selectedStartDate && selectedEndDate) {
      filtered = filtered.filter((festival) => {
        const start = new Date(festival.startDate);
        const end = new Date(festival.endDate);
        return start <= selectedEndDate && end >= selectedStartDate;
      });
    }

    if (selectedRegion !== "all") {
      filtered = filtered.filter((festival) => festival.location.includes(selectedRegion));
    }

    setFilteredFestivals(filtered);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsExpanded(false);
  };

  return (
    <div className="min-h-screen bg-white ">
      <Navbar />
      <div className="max-w-screen-xl mx-auto px-4 pt-28 pb-12">
        {/* 상단 인트로 텍스트 */}
        <div
          ref={headerRef}
          className={`transition-all duration-700 ease-out overflow-hidden  ${
            isScrolled && !isExpanded
              ? "opacity-0 -translate-y-full max-h-0 py-0"
              : "opacity-100 translate-y-0 max-h-96 py-12"
          }`}
        >
          <div className="text-center container">
            <h1 className="text-3xl font-bold text-gray-900 md:text-4xl mb-4">
              언제 떠나고 싶으신가요?
            </h1>
            <p className="text-lg text-gray-600">
              원하는 기간을 선택하고 그 시기에 열리는 특별한 축제들을 발견해보세요
            </p>
          </div>
        </div>

        {/* 기간선택 바 */}
        <div
          className={`sticky top-16 z-40 transition-all duration-700 ease-out ${
            isScrolled && !isExpanded
              ? "bg-white/95 backdrop-blur-md shadow-lg transform -translate-y-2"
              : "bg-transparent transform translate-y-0"
          }`}
        >
          <PeriodSelectorBar
            isCompact={isScrolled && !isExpanded}
            isExpanded={isExpanded}
            selectedStartDate={selectedStartDate}
            selectedEndDate={selectedEndDate}
            selectedRegion={selectedRegion}
            onStartDateChange={setSelectedStartDate}
            onEndDateChange={setSelectedEndDate}
            onRegionChange={setSelectedRegion}
            onExpandClick={() => setIsExpanded(true)}
            onCollapseClick={() => setIsExpanded(false)}
            onSearch={handleSearch}
          />
        </div>

        {/* 확장된 상태일 때 배경 오버레이 */}
        {isScrolled && isExpanded && (
          <div className="fixed inset-0 bg-black/30 z-30" onClick={() => setIsExpanded(false)} />
        )}

        {/* 결과 표시 및 그리드 */}
        <main className="container py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {filteredFestivals.length > 0 ? (
              <>
                <span className="text-rose-500">{filteredFestivals.length}개</span>의 축제를
                찾았습니다
              </>
            ) : (
              "조건에 맞는 축제가 없습니다"
            )}
          </h2>

          {filteredFestivals.length > 0 ? (
            <FestivalGrid festivals={filteredFestivals} />
          ) : (
            <div className="flex h-60 flex-col items-center justify-center rounded-lg border border-dashed text-center">
              <div className="mb-4 text-6xl">🎭</div>
              <p className="mb-2 text-lg font-medium text-gray-900">검색 결과 없음</p>
              <p className="text-gray-600">다른 조건으로 다시 검색해보세요.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
