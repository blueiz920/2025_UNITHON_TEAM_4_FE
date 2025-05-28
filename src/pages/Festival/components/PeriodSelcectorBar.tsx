// src/pages/Festival/components/PeriodSelectorBar.tsx
"use client";

import { useState } from "react";
import { Search, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "../components/button";
import { Popover, PopoverContent, PopoverTrigger } from "../components/Popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/Select";
import { Calendar as CalendarComponent } from "../components/Calendar";
import { addMonths, format } from "date-fns";
import { ko } from "date-fns/locale";

interface PeriodSelectorBarProps {
  isCompact: boolean;
  isExpanded: boolean;
  selectedStartDate: Date | null;
  selectedEndDate: Date | null;
  selectedRegion: string;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
  onRegionChange: (region: string) => void;
  onExpandClick: () => void;
  onCollapseClick: () => void;
  onSearch: () => void;
}

const regions = [
  { value: "all", label: "전체 지역" },
  { value: "서울", label: "서울" },
  { value: "부산", label: "부산" },
  { value: "경기", label: "경기도" },
  { value: "강원", label: "강원도" },
  { value: "충청", label: "충청도" },
  { value: "전라", label: "전라도" },
  { value: "경상", label: "경상도" },
  { value: "제주", label: "제주도" },
];

export function PeriodSelectorBar({
  isCompact,
  isExpanded,
  selectedStartDate,
  selectedEndDate,
  selectedRegion,
  onStartDateChange,
  onEndDateChange,
  onRegionChange,
  onExpandClick,
  onCollapseClick,
  onSearch,
}: PeriodSelectorBarProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isSelectingEndDate, setIsSelectingEndDate] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    if (!selectedStartDate || isSelectingEndDate) {
      if (!selectedStartDate) {
        onStartDateChange(date);
        setIsSelectingEndDate(true);
      } else {
        if (date < selectedStartDate) {
          onEndDateChange(selectedStartDate);
          onStartDateChange(date);
        } else {
          onEndDateChange(date);
        }
        setIsCalendarOpen(false);
        setIsSelectingEndDate(false);
      }
    } else {
      onStartDateChange(date);
      onEndDateChange(null);
      setIsSelectingEndDate(true);
    }
  };

  const resetDates = () => {
    onStartDateChange(null);
    onEndDateChange(null);
    setIsSelectingEndDate(false);
  };

  const formatDateRange = () => {
    if (!selectedStartDate) return "날짜를 선택하세요";
    if (!selectedEndDate) return format(selectedStartDate, "M월 d일", { locale: ko });
    return `${format(selectedStartDate, "M월 d일", { locale: ko })} ~ ${format(selectedEndDate, "M월 d일", { locale: ko })}`;
  };

  const CustomCalendar = ({ month, onMonthChange }: { month: Date; onMonthChange: (month: Date) => void }) => (
    <CalendarComponent
      mode="single"
      selected={isSelectingEndDate ? selectedEndDate : selectedStartDate}
      onSelect={handleDateSelect}
      month={month}
      onMonthChange={onMonthChange}
      initialFocus
    />
  );

  if (isCompact && !isExpanded) {
    return (
      <div className="flex justify-center py-4 transition-all duration-700 ease-out">
        <div
          className="flex items-center bg-white rounded-full shadow-lg border border-gray-200 overflow-hidden cursor-pointer transform transition-all duration-700 ease-out hover:shadow-xl hover:scale-105"
          style={{ width: "380px", height: "44px" }}
          onClick={onExpandClick}
        >
          <div className="flex-1 h-full px-4 text-sm font-medium text-gray-700 flex items-center justify-center">
            {selectedRegion === "all" ? "어디서?" : regions.find((r) => r.value === selectedRegion)?.label}
          </div>
          <div className="w-px h-5 bg-gray-200" />
          <div className="flex-1 h-full px-4 text-sm font-medium text-gray-700 flex items-center justify-center">
            언제?
          </div>
          <div className="w-px h-5 bg-gray-200" />
          <div className="flex-1 h-full text-sm font-medium text-white bg-rose-500 flex items-center justify-center">
            <Search className="h-4 w-4" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-6 transition-all duration-700 ease-out">
      <div className="mx-auto max-w-4xl">
        <div className="bg-white rounded-full shadow-lg border border-gray-200 p-2">
          <div className="flex items-center" style={{ height: "60px" }}>
            <div className="flex-1 px-6 py-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-900 uppercase tracking-wide">어디서</label>
                <Select value={selectedRegion} onValueChange={onRegionChange}>
                  <SelectTrigger className="border-0 shadow-none p-0 h-auto focus:ring-0">
                    <SelectValue placeholder="지역을 선택하세요" className="text-sm text-gray-600" />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map((region) => (
                      <SelectItem key={region.value} value={region.value}>
                        {region.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="w-px h-12 bg-gray-200" />
            <div className="flex-1 px-6 py-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-900 uppercase tracking-wide">언제</label>
                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                  <PopoverTrigger asChild>
                    <button className="text-left w-full">
                      <div className={`text-sm ${selectedStartDate ? "text-gray-900" : "text-gray-500"}`}>{formatDateRange()}</div>
                      {isSelectingEndDate && selectedStartDate && !selectedEndDate && (
                        <div className="text-xs text-rose-500 mt-1">종료일을 선택하세요</div>
                      )}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="center">
                    <div className="flex">
                      <div className="p-3">
                        <div className="flex items-center justify-between mb-2">
                          <Button variant="ghost" size="icon" onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}>
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          <h3 className="font-semibold">{format(currentMonth, "yyyy년 M월", { locale: ko })}</h3>
                          <div className="w-8" />
                        </div>
                        <CustomCalendar month={currentMonth} onMonthChange={setCurrentMonth} />
                      </div>
                      <div className="border-l">
                        <div className="p-3">
                          <div className="flex items-center justify-between mb-2">
                            <div className="w-8" />
                            <h3 className="font-semibold">{format(addMonths(currentMonth, 1), "yyyy년 M월", { locale: ko })}</h3>
                            <Button variant="ghost" size="icon" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                          <CustomCalendar month={addMonths(currentMonth, 1)} onMonthChange={(month) => setCurrentMonth(addMonths(month, -1))} />
                        </div>
                      </div>
                    </div>
                    {(selectedStartDate || selectedEndDate) && (
                      <div className="border-t p-3">
                        <div className="text-sm text-gray-600 mb-2">
                          {selectedEndDate ? (
                            <span>선택된 기간: {format(selectedStartDate!, "M월 d일", { locale: ko })} ~ {format(selectedEndDate, "M월 d일", { locale: ko })}</span>
                          ) : selectedStartDate ? (
                            <span>시작일: {format(selectedStartDate, "M월 d일", { locale: ko })} (종료일을 선택하세요)</span>
                          ) : null}
                        </div>
                        <Button variant="outline" size="sm" onClick={resetDates} className="w-full">
                          날짜 초기화
                        </Button>
                      </div>
                    )}
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="w-px h-12 bg-gray-200" />
            <div className="flex-1 px-6 py-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-900 uppercase tracking-wide">검색</label>
                <div className="flex items-center gap-2 text-gray-600">
                  <Search className="h-4 w-4" />
                  <span className="text-sm">축제를 즐기세요!</span>
                </div>
              </div>
            </div>
            <Button className="bg-rose-500 hover:bg-rose-600 rounded-full h-12 w-12 p-0 ml-2" onClick={onSearch}>
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
